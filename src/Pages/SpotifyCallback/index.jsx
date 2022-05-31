import { setToken } from '@redux/tokenSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SpotifyCallback = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(`?${window.location.hash.slice(1)}`)
    const token = urlParams.get('access_token')
    const storageToken = localStorage.getItem('token')

    dispatch(setToken(token ? token : storageToken))
    localStorage.setItem('token', token ? token : storageToken)
    navigate('/')
  }, [])
  return <></>
}

export default SpotifyCallback
