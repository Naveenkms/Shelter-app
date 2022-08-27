import '../styles/globals.css'
import Router from "next/router"
import ProgressBar from "@badrap/bar-of-progress";
import { useEffect } from 'react';




function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const progress = new ProgressBar({
      size: 4,
      color:"#FD5B61",
      className: "bar-of-progress",
      delay: 100,
    });
    function handleStart(url){
      progress.start();
    }
    function handleFinish(url){
      progress.finish();
    }
  Router.events.on('routeChangeStart',handleStart)
  Router.events.on('routeChangeComplete', handleFinish)
  // Router.events.on('routeChangeError', progress.finish());
  },[])

  
  return <Component {...pageProps} />
}

export default MyApp
