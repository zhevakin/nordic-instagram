import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AuthProvider, FirebaseAppProvider, useFirebaseApp } from 'reactfire'
import { getAuth } from 'firebase/auth'
import '../styles/globals.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00B8A9',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F8F3D4',
    },
  },
})

const firebaseConfig = {
  apiKey: 'AIzaSyD8Aa9ChqYesc-L9-4AwYZ_Xh0NwCoa-es',
  authDomain: 'nordic-instagram.firebaseapp.com',
  projectId: 'nordic-instagram',
  storageBucket: 'nordic-instagram.appspot.com',
  messagingSenderId: '411382882833',
  appId: '1:411382882833:web:49cfcf5248c4238f6587b0',
}

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </App>
    </FirebaseAppProvider>
  )
}

// eslint-disable-next-line react/prop-types
const App = ({ children }) => {
  const authInstance = getAuth(useFirebaseApp())
  return <AuthProvider sdk={authInstance}>{children}</AuthProvider>
}

export default MyApp
