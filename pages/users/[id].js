import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

function UserPage() {
  const router = useRouter()

  return (
    <main>
      <Head>
        <title>User</title>
      </Head>

      <h1>User ID: {router.query.id}</h1>
      <p>Lorem ipsum</p>
      <Link href="/">Home page</Link>
    </main>
  )
}

export default UserPage
