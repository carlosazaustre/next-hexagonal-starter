// import Image from 'next/image'
import { Inter } from 'next/font/google'
import { UsersList } from '@/sections/users/UsersList'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={inter.className}>
      <UsersList />
    </main>
  )
}
