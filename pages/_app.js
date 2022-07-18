import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-black h-screen">
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  );
}

export default MyApp;
