import { getFirestore } from 'firebase/firestore'
import { useMemo } from 'react'
import firebaseApp from '../firebaseApp'

const useFirestore = () => {
  const firestore = useMemo(() => getFirestore(firebaseApp), [])
  return firestore
}

export default useFirestore
