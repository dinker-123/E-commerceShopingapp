import PlusIcon from "../../Icons/square-plus.png";
import MinusIcon from "../../Icons/square-minus.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Cart.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/reducers/userReducer";
import {
  removeItemThunk,
  updateQuantityThunk,
} from "../../store/reducers/cartReducer";

function CartCard(props) {
  const { cartItem } = props;
  const [itemRemoving, setItemRemoving] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  const quantityChange = async (amount) => {
    const itemId = cartItem.id;

    try {
      if (amount > 0) {
        dispatch(updateQuantityThunk({ user, itemId, number: 1 }));
      } else {
        const newQuantity = cartItem.quantity - 1;
        if (newQuantity === 0) {
          removeCartItem();
        } else {
          dispatch(updateQuantityThunk({ user, itemId, number: -1 }));
        }
      }
    } catch (error) {
      toast.error("Error updating quantity!");
    }
  };

  const removeCartItem = async () => {
    setItemRemoving(true);
    const itemId = cartItem.id;

    try {
      dispatch(removeItemThunk({ user, itemId })).then(() =>
        toast.success("Item removed!")
      );
    } catch (error) {
      toast.error("Error removing item!");
    } finally {
      setItemRemoving(false);
    }
  };

  return (
    <div className={styles.CartCard}>
      <div className={styles.cartImage}>
        <img src={cartItem.image} alt="product" />
      </div>
      <div className={styles.cartDetails}>
        <p className={styles.titleText}>{cartItem.title}</p>
        <div className={styles.quantityContainer}>
          <p className={styles.productPrice}>$ {cartItem.price}</p>
          <div className={styles.quantityButtons}>
            <img
              onClick={() => quantityChange(-1)}
              src={MinusIcon}
              alt="minus icon"
            />
            <span>{cartItem.quantity}</span>
            <img
              onClick={() => quantityChange(1)}
              src={PlusIcon}
              alt="plus icon"
            />
          </div>
        </div>
        <button onClick={removeCartItem} className={styles.removeBtn}>
          {itemRemoving ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
}

export default CartCard;
