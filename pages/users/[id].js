import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Card, CardContent, CircularProgress, Container } from '@mui/material'
import { collection, doc, query, orderBy, where } from 'firebase/firestore'
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import Post from '../../components/Post'

import getAppFirestore from '../../util/getAppFirestore'

const db = getAppFirestore()

function UserPage() {
  const router = useRouter()
  const uid = String(router.query.id)
  const postCollection = collection(db, 'posts')
  const queryPosts = query(postCollection, where('uid', '==', uid), orderBy('createdAt', 'desc'))
  const [posts, postsLoading] = useCollectionData(queryPosts, { idField: 'id' })

  const userDoc = doc(db, 'users', uid)
  const [user, userLoading] = useDocumentData(userDoc)

  return (
    <Container>
      <Head><title>Пользователь</title></Head>
      {(postsLoading || userLoading) && <CircularProgress/>}
      {user && <h1>Посты пользователя {user.username}</h1>}
      {!userLoading &&<Card sx={{mb: 1}}>
      <CardContent>
        {user && <div>Имя: {user.fullname}</div>}
        </CardContent>
      </Card>}
      {!postsLoading && posts &&
        posts.map((post) => (
          <Box sx={{ mb: 2 }} key={post.id}>
            <Post key={post.id} post={post} />
          </Box>
        ))}
    </Container>
  )
}

export default UserPage
