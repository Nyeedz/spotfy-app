import Album from '@components/Album'
import Input from '@components/Input'
import config from '@environment/config'
import { setAlbums } from '@redux/albumsSlice'
import { setTracks } from '@redux/tracksSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './albumsPage'

const AlbumsPage = () => {
  const [inputValue, setInputValue] = useState(null)

  const { token } = useSelector((state) => state.token)
  const { albums } = useSelector((state) => state.albums)
  const { tracks } = useSelector((state) => state.tracks)

  const dispatch = useDispatch()

  const getAlbums = () => {
    fetch(`${config.baseUrl}/me/albums`, {
      headers: {
        Authorization: `Bearer ${token}`
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

  const onChange = (e) => {
    if (e.length === 0) {
      clearState()
      getAlbums()
    }

    setInputValue(e)
    fetch(`${config.baseUrl}/search?q=${e}&type=album,track`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(setAlbums(res.albums.items))
        dispatch(setTracks(res.tracks.items))
      })
  }

  const clearState = () => {
    dispatch(setAlbums([]))
    dispatch(setTracks([]))
    setInputValue(null)
  }

  useEffect(() => {
    clearState()
    getAlbums()
  }, [])

  return (
    <>
      <div className="container">
        <Input onChangeValue={onChange} />
        {inputValue && (
          <div className="search">
            <h3 className="search__title">
              Álbums encontrados para {`"${inputValue}"`}
            </h3>
          </div>
        )}
        <div className="container container--grid">
          {albums?.map((album) => {
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
        {tracks?.length > 0 && (
          <div className="search">
            <h3 className="search__title">
              Músicas encontradas para {`"${inputValue}"`}
            </h3>
            <div className="container container--grid">
              {tracks.map((track) => {
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
      </div>
    </>
  )
}

export default AlbumsPage
