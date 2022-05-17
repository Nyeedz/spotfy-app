import { setToken } from '@redux/tokenSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SpotifyCallback = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(`?${window.location.hash.slice(1)}`)

    console.log(urlParams.get('access_token'))

    dispatch(setToken(urlParams.get('access_token')))
    navigate('/')
  }, [])
  return <></>
}

export default SpotifyCallback
