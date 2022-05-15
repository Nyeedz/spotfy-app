import SpotifyLogo from 'Images/logo.svg'
import AlbumPage from 'Pages/AlbumPage'
import AlbumsPage from 'Pages/AlbumsPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/app'

const App = () => (
  <BrowserRouter>
    <SpotifyLogo className="logo" />
    <Routes>
      <Route path="/" element={<AlbumsPage />} />
      <Route path="/album/:id" element={<AlbumPage />} />
    </Routes>
  </BrowserRouter>
)

export default App
