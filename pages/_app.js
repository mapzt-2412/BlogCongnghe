import Header from '../components/Header/Header.tsx';
import Footer from '../components/Footer/Footer';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import '../scss/style.scss'
import 'antd/dist/antd.css';
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

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
