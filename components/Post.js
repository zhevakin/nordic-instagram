import { Card, CardContent } from '@mui/material'
import PropTypes from 'prop-types'
import { doc } from 'firebase/firestore'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import getAppFirestore from '../util/getAppFirestore'

const db = getAppFirestore()

const Post = ({ post }) => {
  const postUserDoc = doc(db, 'users', post.uid)
  const [postUser] = useDocumentData(postUserDoc)

  return (
    <Card>
      <CardContent>
        <p>{post.text}</p>
        {postUser && <p>{postUser.username}</p>}
        <img src={post.imageUrl} alt="" />
        {post.createdAt && (
          <small>
            {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
          </small>
        )}
      </CardContent>
    </Card>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    imageUrl: PropTypes.string,
    text: PropTypes.string,
    uid: PropTypes.string,
    createdAt: PropTypes.shape({ seconds: PropTypes.number }),
  }).isRequired,
}

export default Post
