import Head from 'next/head'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Input,
  TextField,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useState } from 'react'
import firebaseApp from '../../firebaseApp'

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const storage = getStorage(firebaseApp)

const CreatePost = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [user] = useAuthState(auth)
  const postCollection = collection(db, 'posts')
  const { register, handleSubmit } = useForm()

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    const storageRef = ref(storage, `images/${file.name}`)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    setImageUrl(url)
  }

  const onSubmit = (data) => {
    addDoc(postCollection, {
      uid: user.uid,
      createdAt: serverTimestamp(),
      text: data.text,
      imageUrl,
    })
  }

  return (
    <>
      <Head>
        <title>Создание поста</title>
      </Head>
      <Container sx={{ pt: 3 }}>
        <h1>Создание поста</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardContent>
              <Input type="file" onChange={handleImageUpload} />
              <img src={imageUrl} alt="" />
              <TextField
                multiline
                fullWidth
                rows={3}
                placeholder="Текст поста"
                {...register('text')}
              />
            </CardContent>
            <CardActions>
              <Button type="submit">Добавить пост</Button>
            </CardActions>
          </Card>
        </form>
      </Container>
    </>
  )
}

export default CreatePost
