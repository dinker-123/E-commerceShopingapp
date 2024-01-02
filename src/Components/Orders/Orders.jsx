import { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import styles from "./Orders.module.css";
import { db } from "../../firebaseInit";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Spinner from "react-spinner-material";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/reducers/userReducer";
import { cartActions, cartSelector } from "../../store/reducers/cartReducer";

function Orders() {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { orders } = useSelector(cartSelector);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect of orders listener");
    if (user) {
      const ref = collection(db, "usersOrders", user, "orders");
      const q = query(ref, orderBy("date", "desc"));
      const unsub = onSnapshot(q, (querySnapShot) => {
        const dataFromDB = querySnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(cartActions.setOrders(dataFromDB));
        setLoading(false);
      });

      return () => unsub();
    }
  }, [user, dispatch]);

  return (
    <div className={styles.Orders}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : orders.length === 0 ? (
        <h1 className={styles.ordersEmpty}>No order yet!</h1>
      ) : (
        <>
          <h1>Your Orders</h1>
          {orders.map((order) => (
            <OrderTable key={order.id} order={order} />
          ))}
        </>
      )}
    </div>
  );
}

export default Orders;
