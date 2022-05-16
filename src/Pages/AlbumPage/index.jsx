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
      'BQBDioDVRliLn03L9BYHsvTmh6O-HS9b6iG8ECumstn_yjwn2nPcNzekWAUEUnObwYGP81Ij1EmtbXdRkqKxDnQMmeMs_E_x2Io8tjytFtV_9s6i-QEIbf-agvTBik2_4iQAHI3AzkgvMKsERW7bKzXFmpROuvg2ufX0J8HX-Tn1FTENRcUdKFbfjYV1CfJ4pjb9Cdxj_qenPjLXGKoKzUP6E17ol9l8wnhnzK6y-6kaWTcFIbiHvbwA0nPit_mmYKf-rJBQeyfSg4otlaa8zA'

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
