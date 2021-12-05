import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box, Button, Card, CardContent, IconButton } from '@mui/material'
import {
  Comment as CommentIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material'
import { doc, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import getAppFirestore from '../util/getAppFirestore'
import firebaseApp from '../firebaseApp'
import { PostData } from '../types/post'
import { FC } from 'react'

const auth = getAuth(firebaseApp)
const db = getAppFirestore()

type PostProps = {
  post: PostData
  onDelete?: (id: string) => void
}

const Post: FC<PostProps> = ({ post, onDelete }) => {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const postUserDoc = doc(db, 'users', post.uid)
  const [postUser] = useDocumentData(postUserDoc)
  const postDoc = doc(db, 'posts', post.id)
  const uid = user?.uid
  const likes = post.likes || {}
  const isLiked = likes[uid]
  const likesCount = Object.keys(likes).length

  const handleLikeClick = () => {
    if (!uid) {
      router.push('/auth/login')
      return
    }

    if (isLiked) {
      delete likes[uid]
    } else {
      likes[uid] = true
    }
    updateDoc(postDoc, { likes })
  }

  const a = likes + 'sss'

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
        <Box sx={{ mb: 2 }}>
          <Link href={`/posts/${post.id}`} passHref>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <img src={post.imageUrl} alt="" style={{ maxHeight: 300 }} />
            </a>
          </Link>
        </Box>
        <div>
          <Button
            sx={{ mr: 2 }}
            onClick={handleLikeClick}
            color={isLiked ? 'primary' : undefined}
            startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          >
            {likesCount > 0 ? likesCount : ''}
          </Button>

          <Link href={`/posts/${post.id}`}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="">
              <Button variant="outlined" startIcon={<CommentIcon />}>
                {post.commentsCount || 0} комментариев
              </Button>
            </a>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default Post
