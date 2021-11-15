import { createTheme, ThemeProvider } from '@mui/material/styles'
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

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
