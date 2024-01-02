import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  productsAction,
  productsSelector,
} from "../../store/reducers/productsReducer";

function HomeForm() {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector(productsSelector);

  return (
    <div className={styles.HomeForm}>
      <input
        onChange={(e) =>
          dispatch(productsAction.setSearchQuery(e.target.value))
        }
        value={searchQuery}
        placeholder="Search..."
      />
    </div>
  );
}

export default HomeForm;
