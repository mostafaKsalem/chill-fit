import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./store/AuthContext";
import { isUserAuthLoader } from "../src/util/auth";
import RequireAuth from "./components/RequireAuth";
const Root = lazy(() => import("./layouts/Root"));
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <Root />
        </Suspense>
      ),
      loader: isUserAuthLoader,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
              <RequireAuth>
                <Home />
              </RequireAuth>
            </Suspense>
          ),
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
              <RequireAuth>
                <Products />
              </RequireAuth>
            </Suspense>
          ),
        },
        {
          path: "products/:productId",
          element: (
            <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
              <RequireAuth>
                <ProductDetails />
              </RequireAuth>
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
              <RequireAuth>
                <Cart />
              </RequireAuth>
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "signup",
          element: (
            <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
              <Signup />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
