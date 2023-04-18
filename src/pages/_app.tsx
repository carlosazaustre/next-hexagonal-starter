import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UsersContextProvider } from '@/sections/users/UsersContext'
import { PostsContextProvider } from '@/sections/posts/PostsContext'
import { createApiUserRepository } from '@/modules/users/infra/ApiUserRepository'
import { createApiPostRepository } from '@/modules/posts/infra/ApiPostRepository'

export default function App({ Component, pageProps }: AppProps) {
  const userRepository = createApiUserRepository();
  const postsRepository = createApiPostRepository();

  return (
    <UsersContextProvider repository={userRepository}>
      <PostsContextProvider repository={postsRepository}>
      <Component {...pageProps} />
      </PostsContextProvider>
    </UsersContextProvider>
  );
}
