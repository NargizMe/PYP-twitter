"use client"
import '../assets/styles.css'
import Navbar from '../components/navbar/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

  return (
    <html lang="en">
      <head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </head>
      <body>
        <Navbar/>
        {children}
      <footer style = {{padding: '25px 0'}}>
          <p style={{textAlign: 'center', color: 'var(--dark-gray-color)'}}>created by username - Nargiz Raf</p>
      </footer>
      </body>
    </html>
  )
}