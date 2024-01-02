import styles from "./Cart.module.css";
import CartCard from "./CartCard";
import { useSelector } from "react-redux";
import { cartSelector } from "../../store/reducers/cartReducer";

function CartList() {
  const { cart } = useSelector(cartSelector);

  return (
    <div className={styles.List}>
      {cart.map((cartItem) => (
        <CartCard key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
}

export default CartList;
