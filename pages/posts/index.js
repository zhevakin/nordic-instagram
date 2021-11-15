import Head from 'next/head'
import { useCallback } from 'react'
import { Button, Container, Card, CircularProgress } from '@mui/material'
import { addDoc, getFirestore, collection } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import firebaseApp from '../../firebaseApp'

const firestore = getFirestore(firebaseApp)

const PostsPage = () => {
  const postsCollection = collection(firestore, 'posts')
  const [posts, loading] = useCollection(postsCollection)

  const addPost = useCallback(() => {
    const title = global.window.prompt('Введите название')
    addDoc(postsCollection, { title })
  }, [])

  return (
    <Container sx={{ pt: 2 }}>
      <Head>
        <title>Посты</title>
      </Head>
      {loading && (
        <div>
          <CircularProgress />
        </div>
      )}
      {posts && (
        <div>
          {posts.docs.map((doc) => (
            <Card key={doc.id} sx={{ p: 2, mb: 2 }}>
              {doc.data().title} <small>({doc.id})</small>
            </Card>
          ))}
        </div>
      )}
      <Button onClick={addPost}>Добавить пост</Button>
    </Container>
  )
}

export default PostsPage
