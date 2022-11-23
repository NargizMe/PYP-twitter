import type { AppProps } from 'next/app';
import Navbar from '../components/navbar/Navbar';
//css
import '../assets/styles.css'


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{position: 'relative'}}>
      <Navbar/>
      <Component {...pageProps} />
      <footer style = {{padding: '25px 0'}}>
        <p style={{textAlign: 'center', color: 'var(--dark-gray-color)'}}>created by username - Nargiz Raf</p>
      </footer>
    </div>
  )
}