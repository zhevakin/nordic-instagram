import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
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
import firebaseApp from '../../firebaseApp'

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const storage = getStorage(firebaseApp)

const fields = {
  imageUrl: 'imageUrl',
  text: 'text',
}

const CreatePost = () => {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const postCollection = collection(db, 'posts')
  const { register, handleSubmit, formState, setValue } = useForm({
    mode: 'onChange',
  })

  useEffect(() => {
    register(fields.imageUrl, { required: 'Это обязательное поле' })
  }, [])

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    const storageRef = ref(storage, `images/${file.name}`)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    setValue(fields.imageUrl, url)
  }

  const onSubmit = async (data) => {
    const { id } = await addDoc(postCollection, {
      uid: user.uid,
      createdAt: serverTimestamp(),
      text: data[fields.text],
      imageUrl: data[fields.imageUrl],
    })

    router.push(`/posts/${id}`)
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
              {/* <img src={imageUrl} alt="" /> */}
              <TextField
                multiline
                fullWidth
                rows={3}
                placeholder="Текст поста"
                {...register(fields.text, {
                  required: 'Это обязательное поле',
                })}
              />
            </CardContent>
            <CardActions>
              <Button disabled={!formState.isValid} type="submit">
                Добавить пост
              </Button>
            </CardActions>
          </Card>
        </form>
      </Container>
    </>
  )
}

export default CreatePost
