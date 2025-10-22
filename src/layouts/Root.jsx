import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { CartProvider } from "../store/CartContext";
import { Toaster } from "react-hot-toast";

function Root() {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <ScrollToTop />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <Toaster position="top-center" reverseOrder='false'/>
      </div>
    </CartProvider>
  );
}

export default Root;
