import Album from 'Components/Album'
import Input from 'Components/Input'
import config from 'Environment/config'
import { useEffect, useState } from 'react'
import './albumsPage'

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([])
  const [timeout, setTimeOut] = useState(null)
  const [queryAlbum, setQueryAlbum] = useState(null)
  const [queryTracks, setQueryTracks] = useState(null)

  const token =
    'BQBDioDVRliLn03L9BYHsvTmh6O-HS9b6iG8ECumstn_yjwn2nPcNzekWAUEUnObwYGP81Ij1EmtbXdRkqKxDnQMmeMs_E_x2Io8tjytFtV_9s6i-QEIbf-agvTBik2_4iQAHI3AzkgvMKsERW7bKzXFmpROuvg2ufX0J8HX-Tn1FTENRcUdKFbfjYV1CfJ4pjb9Cdxj_qenPjLXGKoKzUP6E17ol9l8wnhnzK6y-6kaWTcFIbiHvbwA0nPit_mmYKf-rJBQeyfSg4otlaa8zA'

  const onChange = (e) => {
    clearTimeout(timeout)

    if (e.length === 0) {
      setQueryAlbum(null)
      setQueryTracks(null)
    }

    if (e) {
      setTimeOut(
        setTimeout(() => {
          fetch(`${config.baseUrl}/search?q=${e}&type=album,track`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then((res) => res.json())
            .then((res) => {
              setQueryAlbum(res.albums.items)
              setQueryTracks(res.tracks.items)
              console.log(res.tracks.items)
            })
        }, 600)
      )
    }
  }

  useEffect(() => {
    fetch(`${config.baseUrl}/me/albums`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((albums) => {
        const handleAlbums = albums.items.map((item) => item.album)

        setAlbums(handleAlbums)
      })
      .catch(() => {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${config.clientId}&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=${config.urlCallback}`
      })
  }, [])

  return (
    <>
      <div className="container">
        <Input onChangeValue={onChange} />

        {queryAlbum && (
          <div className="search">
            <h3 className="search__title">
              {queryAlbum
                ? 'Álbums buscados recentemente'
                : 'Músicas buscados recentemente'}
            </h3>
            <div className="container container--grid">
              {queryAlbum.map((album) => {
                return (
                  <Album
                    key={album.id}
                    id={album.id}
                    cover={album.images[0].url}
                    artist={album.artists[0].name}
                    title={album.name}
                  />
                )
              })}
            </div>
          </div>
        )}
        {queryAlbum && (
          <div className="search">
            <h3 className="search__title">
              {queryAlbum
                ? 'Álbums buscados recentemente'
                : 'Músicas buscados recentemente'}
            </h3>
            <div className="container container--grid">
              {queryTracks.map((track) => {
                return (
                  <Album
                    key={track.album.id}
                    id={track.album.id}
                    cover={track.album.images[0].url}
                    artist={track.album.artists[0].name}
                    title={track.album.name}
                  />
                )
              })}
            </div>
          </div>
        )}

        {(!queryAlbum || !queryTracks) && (
          <div className="container container--grid">
            {albums.map((album) => {
              return (
                <Album
                  key={album.id}
                  id={album.id}
                  cover={album.images[0].url}
                  artist={album.artists[0].name}
                  title={album.name}
                />
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default AlbumsPage
