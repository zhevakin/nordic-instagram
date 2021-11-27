import Link from 'next/link'
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
        <div>
          {postUser && (
            <Link href={`/users/${post.uid}`}>{postUser.username}</Link>
          )}
        </div>
        <p>{post.text}</p>
        <div>
          {post.createdAt && (
            <small>
              {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
            </small>
          )}
        </div>
        <Link href={`/posts/${post.id}`} passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <img src={post.imageUrl} alt="" style={{ maxHeight: 300 }} />
          </a>
        </Link>
      </CardContent>
    </Card>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    text: PropTypes.string,
    uid: PropTypes.string,
    createdAt: PropTypes.shape({ seconds: PropTypes.number }),
  }).isRequired,
}

export default Post
