import Header from '../components/Header/Header.tsx';
import Footer from '../components/Footer/Footer';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import '../scss/style.scss'
import 'antd/dist/antd.css';
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Head from "next/head";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ChatBox from '../components/ChatBox/ChatBox';
import { useState, createContext } from 'react';

export const UserInfo = createContext();

function MyApp({ Component, pageProps }) {
  const [userInfo, setUserInfo] = useState();
  console.log(userInfo)
  return (
    <>
    <UserInfo.Provider value={{userInfo, setUserInfo}}>
    <Head>
      <link rel="stylesheet" href="path/to/assets/content-styles.css" type="text/css"/>
      </Head>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Header/>
      <ChatBox />
      <Component {...pageProps}/>
      <Footer/>
      </GoogleOAuthProvider>
      </UserInfo.Provider>
    </>
  )
}

export default MyApp
