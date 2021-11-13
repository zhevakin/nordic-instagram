import { createTheme, ThemeProvider } from '@mui/material/styles'
import '../styles/globals.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#95E1D3',
    },
    secondary: {
      main: '#EAFFD0',
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
