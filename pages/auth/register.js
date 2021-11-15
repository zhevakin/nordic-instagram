import { useCallback } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import PaperBox from '../../components/PaperBox'
import firebaseApp from '../../firebaseApp'

const auth = getAuth(firebaseApp)

const RegisterPage = () => {
  const { register, handleSubmit } = useForm()
  const [user, loading] = useAuthState(auth)
  const isLoggedin = !loading && user

  const onSubmit = useCallback((data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
  }, [])

  const handleSignOut = useCallback(() => {
    signOut(auth)
  }, [])

  return (
    <>
      <Head>
        <title>Регистрация</title>
      </Head>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ mt: 2 }}>
              <PaperBox>
                <Typography component="h1" variant="h4">
                  Регистрация
                </Typography>
                {isLoggedin && (
                  <div>
                    <p>Вы вошли как {user.email}</p>
                    <Button variant="contained" onClick={handleSignOut}>
                      Выйти
                    </Button>
                  </div>
                )}
                {!isLoggedin && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                      type="email"
                      label="Email"
                      fullWidth
                      margin="normal"
                      {...register('email')}
                      required
                    />
                    <TextField
                      label="Имя и фамилия"
                      fullWidth
                      margin="normal"
                      {...register('fullname')}
                      required
                    />
                    <TextField
                      label="Имя пользователя"
                      fullWidth
                      margin="normal"
                      {...register('username')}
                      required
                    />
                    <TextField
                      type="password"
                      label="Пароль"
                      fullWidth
                      margin="normal"
                      {...register('password')}
                      required
                    />
                    <Box sx={{ mt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                      >
                        Зарегистрироваться
                      </Button>
                    </Box>
                  </form>
                )}
              </PaperBox>

              {!isLoggedin && (
                <Box sx={{ mt: 2 }}>
                  <PaperBox>
                    Уже есть аккаунт?{' '}
                    <Link href="/auth/login" passHref>
                      <Button>Войти</Button>
                    </Link>
                  </PaperBox>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default RegisterPage
