import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { UsersContextProvider } from '@/sections/users/UsersContext'
import { createApiUserRepository } from '@/modules/users/infra/ApiUserRepository'

export default function App({ Component, pageProps }: AppProps) {
  const repository = createApiUserRepository();

  return (
    <UsersContextProvider repository={repository}>
      <Component {...pageProps} />
    </UsersContextProvider>
  );
}
