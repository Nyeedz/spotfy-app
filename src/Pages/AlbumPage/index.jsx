import Album from 'Components/Album'
import config from 'Environment/config'
import ArrowBack from 'Images/arrow-back.svg'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './albumPage'

const AlbumPage = () => {
  const [album, setAlbum] = useState(null)

  const { id } = useParams()

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60000)
    const seconds = ((duration % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  useEffect(() => {
    const token =
      'BQDaqb_dWgtGx8d1YEaXmRKVY5wlaeWYdJyhT0EE98PyNHeQx5zrqxsuVZLpCdQwBufhmwqElugQcCNmA3z2plYutA3E1PMyxufKknWzj05pLebMrKlr0IO522ZbXjeJiB8XWCpl5F-Wjj_NhpmqWt8tpJzwDVjhtAOMMXV5cyAomwHNXghjSQKa_LIZLh8Pi6mMlQ50Ps-ol5xG6LNKGzF_I9tAtbPVjTEUwmkzFy5Mp-IgqibXTg6hib9iEPWfD-FJJEIXmulJaVJgiV9Ogg'

    fetch(`${config.baseUrl}/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((album) => setAlbum(album))
  }, [])

  return (
    <div className="container">
      <div className="back">
        <Link to="/" className="back__link">
          <ArrowBack className="back__image" />
          Voltar
        </Link>
      </div>

      <div className="album-content">
        <Album
          cover={album?.images[0].url}
          artist={album?.artists[0].name}
          title={album?.name}
        />
        <ol className="album-list">
          {album?.tracks.items.map((item, i) => {
            return (
              <li className="album-list__item" key={item.id}>
                <span>{i + 1}.</span>
                <span className="album-list__item-name">{item.name}</span>
                <span>{formatDuration(item.duration_ms)}</span>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

export default AlbumPage
