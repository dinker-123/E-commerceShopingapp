import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Cart.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/reducers/userReducer";
import {
  cartActions,
  cartSelector,
  emptyTheCartThunk,
  purchaseThunk,
} from "../../store/reducers/cartReducer";

function CartSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { cart, totalPrice } = useSelector(cartSelector);

  useEffect(() => {
    var newPrice = 0;
    cart.forEach((item) => {
      newPrice += Number(item.price.toFixed(2)) * item.quantity;
    });
    dispatch(cartActions.setTotalPrice(newPrice));
  }, [cart, dispatch]);

  const handlePurchase = async (user) => {
    try {
      dispatch(purchaseThunk({ user }));
      dispatch(emptyTheCartThunk({ user }));
      navigate("/buybusy/myorders");
      toast.success("Items purchased!");
    } catch (error) {
      toast.error("Error purchasing!");
    }
  };

  return (
    <div className={styles.Sidebar}>
      <h2>Total Price</h2>
      <h3>$ {Number(totalPrice.toFixed(2))}</h3>
      <button
        className={styles.purchaseBtn}
        onClick={() => handlePurchase(user)}
      >
        Purchase
      </button>
    </div>
  );
}

export default CartSidebar;
