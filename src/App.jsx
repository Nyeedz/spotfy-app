import SpotifyLogo from '@images/logo.svg'
import AlbumPage from '@pages/AlbumPage'
import AlbumsPage from '@pages/AlbumsPage'
import SpotifyCallback from '@pages/SpotifyCallback'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles/app'

const App = () => (
  <Router>
    <SpotifyLogo className="logo" />
    <Routes>
      <Route path="/" element={<AlbumsPage />} />
      <Route path="album/:id" element={<AlbumPage />} />
      <Route path="callback" element={<SpotifyCallback />} />
    </Routes>
  </Router>
)

export default App
