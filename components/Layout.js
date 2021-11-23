import Link from 'next/link'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, signOut } from 'firebase/auth'
import firebaseApp from '../firebaseApp'

const auth = getAuth(firebaseApp)

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const [user] = useAuthState(auth)

  const handleSignOut = () => {
    signOut(auth)
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1" variant="h4" sx={{ mr: 2 }}>
            Nordic Instagram
          </Typography>
          <Link href="/posts">
            <Button variant="text" color="secondary" sx={{ mr: 2 }}>
              Посты
            </Button>
          </Link>
          <Link href="/create/post">
            <Button variant="text" color="secondary" sx={{ mr: 2 }}>
              Создать пост
            </Button>
          </Link>
          <Box sx={{ ml: 'auto' }}>
            {!user && (
              <Link href="/auth/login">
                <Button variant="outlined" color="secondary" sx={{ mr: 2 }}>
                  Войти
                </Button>
              </Link>
            )}
            {user && (
              <>
                <span>{user.email}</span>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleSignOut}
                  sx={{ ml: 1 }}
                >
                  Выйти
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </div>
  )
}

export default Layout
