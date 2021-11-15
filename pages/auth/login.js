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
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import PaperBox from '../../components/PaperBox'
import useAuth from '../../hooks/useAuth'

const RegisterPage = () => {
  const auth = useAuth()
  const { register, handleSubmit } = useForm()
  const [user, loading] = useAuthState(auth)

  const isLoggedin = !loading && user

  const login = useCallback((data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
  }, [])

  const logout = useCallback(() => {
    signOut(auth)
  }, [])

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
                    <Button variant="contained" onClick={logout}>
                      Выйти
                    </Button>
                  </div>
                )}
                {!isLoggedin && (
                  <form onSubmit={handleSubmit(login)}>
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
