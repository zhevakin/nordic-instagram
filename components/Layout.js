import Link from 'next/link'
import { AppBar, Box, Button, Toolbar } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, signOut } from 'firebase/auth'
import firebaseApp from '../firebaseApp'
import Logo from '../images/logo.svg'

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
          <Box sx={{ mr: 2 }}>
            <Logo width={50} height={50} />
          </Box>
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
