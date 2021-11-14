import Head from 'next/head'
import Link from 'next/link'
import Button from '@mui/material/Button'

function AboutPage() {
  return (
    <main>
      <Head>
        <title>About Company</title>
      </Head>
      <h1>About Company</h1>
      <p>Lorem ipsum</p>
      <Link href="/">Home page</Link>

      <Button block variant="contained" size="large" color="primary">
        CLICK ME
      </Button>
      <Button variant="contained" size="large" color="secondary">
        CLICK ME
      </Button>
    </main>
  )
}

export default AboutPage
