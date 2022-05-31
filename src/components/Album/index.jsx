import { string } from 'prop-types'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import './album'

const Album = ({ id, cover, artist, title }) => {
  const AlbumContent = (
    <>
      <img className="album__image" src={cover} alt={title} />
      <span className="album__name">{title}</span>
      <span className="album__artist-name">{artist}</span>
    </>
  )
  return id ? (
    <Link to={'album/' + id} className="album">
      {AlbumContent}
    </Link>
  ) : (
    <div className="album album--big">{AlbumContent}</div>
  )
}

Album.propTypes = {
  id: string,
  cover: string,
  artist: string,
  title: string
}

export default memo(Album)
