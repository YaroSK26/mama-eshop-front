import { CartContextProvider } from "../components/CartContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Component {...pageProps} />
    </CartContextProvider>
  );
}

export default MyApp;
