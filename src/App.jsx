import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./store/AuthContext";
import { isUserAuthLoader } from "../src/util/auth";
import RequireAuth from "./components/RequireAuth";
import Loading from "./components/Loading";

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
        <Suspense fallback={<Loading />}>
          <Root />
        </Suspense>
      ),
      loader: isUserAuthLoader,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <RequireAuth>
                <Home />
              </RequireAuth>
            </Suspense>
          ),
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<Loading />}>
              <RequireAuth>
                <Products />
              </RequireAuth>
            </Suspense>
          ),
        },
        {
          path: "products/:productId",
          element: (
            <Suspense fallback={<Loading />}>
              <RequireAuth>
                <ProductDetails />
              </RequireAuth>
            </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<Loading />}>
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
        { path: "login", element: <Login /> },
        {
          path: "signup",
          element: (
            <Suspense fallback={<Loading />}>
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
