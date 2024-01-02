import Navbar from "./Components/Navbar/Navbar";
import ErrorPage from "./Components/404/ErrorPage";
import Home from "./Components/Home/Home";
import Orders from "./Components/Orders/Orders";
import Cart from "./Components/Cart/Cart";
import SignIn from "./FirebaseAuthentication/SignIn";
import SignUp from "./FirebaseAuthentication/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseInit";
import { useDispatch, useSelector } from "react-redux";
import { userActions, userSelector } from "./store/reducers/userReducer";
import { productsAction } from "./store/reducers/productsReducer";
import { cartActions } from "./store/reducers/cartReducer";

function App() {
  console.log("in app.js");

  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    console.log(`Local UID is: ${uid}`);
    if (uid) {
      dispatch(userActions.setUser(uid));
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("useEffect to populate Products array!");
    const unsub = onSnapshot(collection(db, "products"), (querySnapShot) => {
      const dataFromDB = querySnapShot.docs.map((doc) => ({ ...doc.data() }));
      dispatch(productsAction.setProducts(dataFromDB));
      dispatch(productsAction.setProductsLoading(false));
    });

    return () => unsub();
  }, [dispatch]);

  useEffect(() => {
    console.log("useEffect to populate Cart array!");
    if (user) {
      const ref = collection(db, "usersCarts", user, "mycart");
      const unsub = onSnapshot(ref, (querySnapShot) => {
        const dataFromDB = querySnapShot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        dispatch(cartActions.setCart(dataFromDB));
        dispatch(cartActions.setCartLoading(false));
      });

      return () => unsub();
    }
  }, [user, dispatch]);

  const router = createBrowserRouter([
    {
      path: "/buybusy",
      element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [
        { path: "", element: <Home /> },
        { path: "myorders", element: <Orders /> },
        { path: "cart", element: <Cart /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
