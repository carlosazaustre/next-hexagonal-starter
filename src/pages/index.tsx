// import Image from 'next/image'
import { Inter } from 'next/font/google'
import { PostsList } from '@/sections/posts/PostsList'

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  return (
    <main className={inter.className}>
      <PostsList />
    </main>
  )
}
