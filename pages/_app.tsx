import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <div className="container mx-auto md:px-2 lg:px-28 font-sans">
        <NextNProgress color="cyan" />
        <Navbar/>
        
        <main className="pb-32 mb-16">
            <Component {...pageProps} />
        </main>
        <Footer />
    </div>
</>
  );
}
export default MyApp;