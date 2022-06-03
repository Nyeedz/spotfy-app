import Album from '@components/Album'
import Input from '@components/Input'
import { setAlbums } from '@redux/albumsSlice'
import { setTracks } from '@redux/tracksSlice'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './albumsPage'

const AlbumsPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

  const storageToken = localStorage.getItem('token')
  const { token } = useSelector((state) => state.token)
  const { albums } = useSelector((state) => state.albums)
  const { tracks } = useSelector((state) => state.tracks)

  const dispatch = useDispatch()

  const getAlbums = () => {
    setLoading(true)
    fetch(`${process.env.baseUrl}/me/albums`, {
      headers: {
        Authorization: `Bearer ${storageToken ? storageToken : token}`
      }
    })
      .then((res) => res.json())
      .then((albums) => {
        const handleAlbums = albums.items.map((item) => item.album)

        dispatch(setAlbums(handleAlbums))
      })
      .catch(() => {
        localStorage.removeItem('token')
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${process.env.clientId}&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=${process.env.urlCallback}`
      })
      .finally(() => setLoading(false))
  }

  const getTracks = (event) => {
    setLoading(true)
    fetch(`${process.env.baseUrl}/search?q=${event}&type=album,track`, {
      headers: {
        Authorization: `Bearer ${storageToken ? storageToken : token}`
      }
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(setAlbums(res.albums.items))
        dispatch(setTracks(res.tracks.items))
      })
      .finally(() => setLoading(false))
  }

  const onChange = useCallback((event) => {
    if (event.length === 0) {
      clearState()
      getAlbums()
    } else {
      getTracks(event)
    }

    setInputValue(event)
  })

  const clearState = () => {
    dispatch(setAlbums([]))
    dispatch(setTracks([]))
    setInputValue('')
  }

  useEffect(() => {
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
          {loading && !inputValue && (
            <h1 style={{ color: '#fff' }}>Loading...</h1>
          )}
          {albums?.map((album, index) => {
            return (
              <Album
                key={album.id + album.uri + index}
                id={album.id}
                cover={album.images[0].url}
                artist={album.artists[0].name}
                title={album.name}
              />
            )
          })}
        </div>

        {/* tracks input search */}
        {tracks?.length > 0 && (
          <div className="search">
            <h3 className="search__title">
              {inputValue && `Músicas encontradas para "${inputValue}"`}
            </h3>
            <div className="container container--grid">
              {tracks.map((track, index) => {
                return (
                  <Album
                    key={track.album.id + track.album.uri + index}
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
