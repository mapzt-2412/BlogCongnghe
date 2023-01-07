import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "antd/dist/antd.css";
import "../styles/globals.css";
import "../scss/style.scss";
import "antd/dist/antd.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Head from "next/head";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ChatBox from "../components/ChatBox/ChatBox";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import { useState, createContext, useEffect } from "react";
import { spinnerService } from "../services/spiner.service";
// import Router from "next/router";
// import NProgress from "nprogress";

export const UserInfo = createContext();

// NProgress.configure({ showSpinner: spinnerService.requestStarted });

// Router.onRouteChangeStart = () => {
//   // console.log('onRouteChangeStart triggered');
//   spinnerService.requestStarte();
// };

// Router.onRouteChangeComplete = () => {
//   // console.log('onRouteChangeComplete triggered');
//   spinnerService.requestEnded();
// };

// Router.onRouteChangeError = () => {
//   // console.log('onRouteChangeError triggered');
//   spinnerService.requestEnded();
// };

function MyApp({ Component, pageProps }) {
  const [userInfo, setUserInfo] = useState();
  const [chatBox, setChatBox] = useState();
  const [shortVideoIds, setShortVideoIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(
      spinnerService.getData().subscribe((status) => {
        setIsLoading(status === "start");
      })
    );
  }, []);

  return (
    <>
      <UserInfo.Provider
        value={{
          userInfo,
          setUserInfo,
          shortVideoIds,
          setShortVideoIds,
          setChatBox,
          chatBox,
        }}
      >
        <Head>
          <link
            rel="stylesheet"
            href="path/to/assets/content-styles.css"
            type="text/css"
          />
        </Head>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          {isLoading && <LoadingPage />}
          <div className={`wrapper ${isLoading && "hide"}`}>
            <Header />
            <ChatBox />
            <Component {...pageProps} />
            <Footer />
          </div>
        </GoogleOAuthProvider>
      </UserInfo.Provider>
    </>
  );
}

export default MyApp;
