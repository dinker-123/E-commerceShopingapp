import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/reducers/userReducer";
import {
  addItemThunk,
  cartSelector,
  updateQuantityThunk,
} from "../../store/reducers/cartReducer";
import { useState } from "react";

function ProductCard(props) {
  const { product } = props;
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const { cart } = useSelector(cartSelector);
  const navigate = useNavigate();
  const [itemAdding, setItemAdding] = useState(false);

  const handleAddToCart = (prod) => {
    setItemAdding(true);

    if (user === null) {
      toast.error("Login in to add item!");
      navigate("/buybusy/signin");
      setItemAdding(false);
      return;
    }

    const index = cart.findIndex(
      (cartItem) => cartItem.itemCode === prod.itemCode
    );

    try {
      if (index === -1) {
        dispatch(addItemThunk({ user, product: prod })).then(() =>
          toast.success("Added to cart!")
        );
      } else {
        const itemId = cart[index].id;
        const number = 1;
        dispatch(updateQuantityThunk({ user, itemId, number })).then(() =>
          toast.success("Quantity increased!")
        );
      }
    } catch (error) {
      toast.error("Error adding item to cart!");
    } finally {
      setItemAdding(false);
    }
  };

  return (
    <div className={styles.ProductCard}>
      <div className={styles.productImage}>
        <img src={product.image} alt="product" />
      </div>
      <div className={styles.productDetails}>
        <p className={styles.titleText} title={product.title}>
          {product.title}
        </p>
        <p className={styles.productPrice}>$ {product.price}</p>
        <button
          className={styles.addBtn}
          onClick={() => handleAddToCart(product)}
        >
          {itemAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
