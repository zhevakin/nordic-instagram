import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, CircularProgress, Container } from '@mui/material'
import { doc } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Post from '../../components/Post'
import Comments from '../../components/Comments'

import getAppFirestore from '../../util/getAppFirestore'

const db = getAppFirestore()

function UserPage() {
  const router = useRouter()
  const postId = String(router.query.id)

  const postDoc = doc(db, 'posts', postId)
  const [post, postLoading] = useDocumentData(postDoc, { idField: 'id' })

  return (
    <Container>
      <Head>
        <title>Пост</title>
      </Head>
      {postLoading && <CircularProgress />}
      <Box sx={{ mb: 2 }}>{!postLoading && post && <Post post={post} />}</Box>
      <Comments postId={postId} />
    </Container>
  )
}

export default UserPage
