import '@/src/styles/globals.css';
import type { AppProps } from 'next/app';
import { NavBar } from '@/src/components/NavBar';
import { Footer } from '@/src/components/Footer';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<NavBar>
			<Component {...pageProps} />
			<Footer />
		</NavBar>
	);
}
