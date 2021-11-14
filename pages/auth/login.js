import Head from 'next/head'
import Link from 'next/link'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useAuth, useUser } from 'reactfire'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

const RegisterPage = () => {
  const { register, handleSubmit } = useForm()
  const auth = useAuth()
  const { status, data: user } = useUser()
  const isLoggedin = status === 'success' && user

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
              <Card>
                <CardContent>
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
                          Вход
                        </Button>
                      </Box>
                    </form>
                  )}
                </CardContent>
              </Card>
              {!isLoggedin && (
                <Box sx={{ mt: 2 }}>
                  <Card>
                    <CardContent>
                      Еще нет аккаунта?{' '}
                      <Link href="/auth/register" passHref>
                        <Button>Зарегистрироваться</Button>
                      </Link>
                    </CardContent>
                  </Card>
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
