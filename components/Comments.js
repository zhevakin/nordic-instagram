import { Button, TextField } from '@mui/material'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebaseApp from '../firebaseApp'

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

const Comments = ({ postId }) => {
  const [user] = useAuthState(auth)
  const { register, handleSubmit } = useForm()

  const commentsCollection = collection(db, 'posts', postId, 'comments')
  const commentsQuery = query(commentsCollection, orderBy('createdAt', 'desc'))
  const [comments] = useCollectionData(commentsQuery, { idField: 'id' })

  const onSubmit = async (data) => {
    const userDoc = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userDoc)
    const userData = userSnap.data()
    const { username } = userData

    addDoc(commentsCollection, {
      uid: user.uid,
      username,
      createdAt: serverTimestamp(),
      text: data.text,
    })
  }

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div>
            <small>
              {comment.username} /{' '}
              {new Date(comment.createdAt.seconds * 1000).toLocaleDateString()}
            </small>
            <p>{comment.text}</p>
          </div>
        ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          multiline
          fullWidth
          rows={3}
          placeholder="Ваш комментарий"
          sx={{ mb: 2 }}
          {...register('text')}
        />
        <Button type="submit" color="primary">
          Отправить
        </Button>
      </form>
    </div>
  )
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
}

export default Comments
