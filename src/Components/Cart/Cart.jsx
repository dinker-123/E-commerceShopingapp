import CartSidebar from "./CartSidebar";
import CartList from "./CartList";
import styles from "./Cart.module.css";
import Spinner from "react-spinner-material";
import { useSelector } from "react-redux";
import { cartSelector } from "../../store/reducers/cartReducer";

function Cart() {
  const { cartLoading, cart } = useSelector(cartSelector);

  return (
    <div className={styles.Cart}>
      {cartLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : cart.length === 0 ? (
        <h1 className={styles.cartEmpty}>No items in cart!</h1>
      ) : (
        <>
          <CartSidebar />
          <CartList />
        </>
      )}
    </div>
  );
}

export default Cart;
