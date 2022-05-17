import Album from '@components/Album'
import config from '@environment/config'
import ArrowBack from '@images/arrow-back.svg'
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
      'BQDrLDMI7g25y2uh80YPlnTPHpwWudzK33UT9x21Exk2uCBWXxcdor_51HA4zEYONaQBR41IUpsSJ48yxRy2Gfi-EsuJpC4CId0matS00WGZ8pkdiQ4VaB2vluEHXphdj4w2CdzIYKIHjJYcMJyRH_fUZCCjhwjiDKKbxcEha8Zr7RBxPw9aH1MIM8GDmStiWYXwIFuMRDIkdHHUE9NV7nr8QNlr3cvLmIkuRC2TEvo_KX3LDwpzZvGRWCdEnbL_fU3Xe6_hruENn9MfWqFssA'

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
