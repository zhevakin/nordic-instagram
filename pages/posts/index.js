import { Box, Container } from '@mui/material'
import { collection, query, orderBy } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Post from '../../components/Post'
import getAppFirestore from '../../util/getAppFirestore'

const db = getAppFirestore()

const PostsPage = () => {
  const postCollection = collection(db, 'posts')
  const queryPosts = query(postCollection, orderBy('createdAt', 'desc'))

  const [posts] = useCollectionData(queryPosts, { idField: 'id' })

  return (
    <Container>
      <h1>Посты</h1>
      {posts &&
        posts.map((post) => (
          <Box sx={{ mb: 2 }}>
            <Post key={post.id} post={post} />
          </Box>
        ))}
    </Container>
  )
}

export default PostsPage
