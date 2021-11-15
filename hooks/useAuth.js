import { getAuth } from 'firebase/auth'
import { useMemo } from 'react'
import firebaseApp from '../firebaseApp'

const useAuth = () => {
  const auth = useMemo(() => getAuth(firebaseApp), [])
  return auth
}

export default useAuth
