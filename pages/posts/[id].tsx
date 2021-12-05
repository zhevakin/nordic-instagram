import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, CircularProgress, Container } from '@mui/material'
import { doc, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import Post from '../../components/Post'
import Comments from '../../components/Comments'
import getAppFirestore from '../../util/getAppFirestore'
import { PostData } from '../../types/post'
import { useState } from 'react'

const db = getAppFirestore()

const postConverter = {
  toFirestore(post: PostData): DocumentData {
    return post
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): PostData {
    return snapshot.data() as PostData
  },
}

function UserPage() {
  const router = useRouter()
  const postId = String(router.query.id)
  const postDoc = doc(db, 'posts', postId).withConverter(postConverter)
  const [post, postLoading] = useDocumentData(postDoc, {
    idField: 'id',
  })

  const [step, setStep] = useState<'first' | 'second' | 'third'>('first')
  setStep('third')

  return (
    <Container>
      <Head>
        <title>Пост</title>
      </Head>
      {postLoading && <CircularProgress />}
      <Box sx={{ mb: 2, mt: 3 }}>
        {!postLoading && post && <Post post={post} onDelete={(id) => {}} />}
      </Box>
      <Comments postId={postId} />
    </Container>
  )
}

export default UserPage
