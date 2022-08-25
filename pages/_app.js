import Header from '../components/Header/Header.tsx';
import Footer from '../components/Footer/Footer';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import '../scss/style.scss'
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </>
  )
}

export default MyApp
