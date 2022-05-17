import Album from '@components/Album'
import Input from '@components/Input'
import config from '@environment/config'
import { setAlbums } from '@redux/albumsSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './albumsPage'

const AlbumsPage = () => {
  const [timeout, setTimeOut] = useState(null)
  const [queryAlbum, setQueryAlbum] = useState(null)
  const [queryTracks, setQueryTracks] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const tokenSelector = useSelector((state) => state.token)
  const albumsSelector = useSelector((state) => state.albums)

  const dispatch = useDispatch()

  const getAlbums = () => {
    fetch(`${config.baseUrl}/me/albums`, {
      headers: {
        Authorization: `Bearer ${tokenSelector?.token}`
      }
    })
      .then((res) => res.json())
      .then((albums) => {
        const handleAlbums = albums.items.map((item) => item.album)

        dispatch(setAlbums(handleAlbums))
      })
      .catch(() => {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${config.clientId}&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=${config.urlCallback}`
      })
  }

  useEffect(() => {
    getAlbums()
  }, [])

  const onChange = (e) => {
    clearTimeout(timeout)

    if (e.length === 0) {
      clearState()
    }

    if (e) {
      setInputValue(e)
      setTimeOut(
        setTimeout(() => {
          fetch(`${config.baseUrl}/search?q=${e}&type=album,track`, {
            headers: {
              Authorization: `Bearer ${tokenSelector?.token}`
            }
          })
            .then((res) => res.json())
            .then((res) => {
              setQueryAlbum(res.albums.items)
              setQueryTracks(res.tracks.items)
            })
        }, 600)
      )
    }
  }

  const clearState = () => {
    setQueryAlbum(null)
    setQueryTracks(null)
    setInputValue('')
  }

  return (
    <>
      <div className="container">
        <Input onChangeValue={onChange} />

        {queryAlbum && (
          <div className="search">
            <h3 className="search__title">
              Álbums encontrados para {`"${inputValue}"`}
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

        {queryTracks && (
          <div className="search">
            <h3 className="search__title">
              Músicas encontradas para {`"${inputValue}"`}
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
            {albumsSelector?.albums.map((album) => {
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
