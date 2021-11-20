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
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import PaperBox from '../../components/PaperBox'
import firebaseApp from '../../firebaseApp'

const auth = getAuth(firebaseApp)

const RegisterPage = () => {
  const { register, handleSubmit } = useForm()
  const [user, loading] = useAuthState(auth)
  const isLoggedin = !loading && user

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
  }

  const handleSignOut = () => {
    signOut(auth)
  }

  return (
    <>
      <Head>
        <title>Вход</title>
      </Head>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ mt: 2 }}>
              <PaperBox>
                <Typography component="h1" variant="h4">
                  Вход
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
                        Войти
                      </Button>
                    </Box>
                  </form>
                )}
              </PaperBox>
              {!isLoggedin && (
                <Box sx={{ mt: 2 }}>
                  <PaperBox>
                    Еще нет аккаунта?{' '}
                    <Link href="/auth/register" passHref>
                      <Button>Зарегистрироваться</Button>
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
