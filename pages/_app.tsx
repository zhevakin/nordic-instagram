import Head from 'next/head'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Layout from '../components/Layout'
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
      <Head>
        <title>Nordic Instagram</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
