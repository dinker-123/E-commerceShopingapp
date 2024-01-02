import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  productsAction,
  productsSelector,
} from "../../store/reducers/productsReducer";

function HomeSidebar() {
  const dispatch = useDispatch();
  const { selectedCategories, maxPrice } = useSelector(productsSelector);

  const categories = [
    "Men's Clothing",
    "Women's Clothing",
    "Jewelery",
    "Electronics",
  ];

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      dispatch(
        productsAction.setSelectedCategories(
          selectedCategories.filter((cat) => cat !== category)
        )
      );
    } else {
      dispatch(
        productsAction.setSelectedCategories([...selectedCategories, category])
      );
    }
  };

  return (
    <div className={styles.Sidebar}>
      <h2>Filter</h2>
      <label>
        Max Price: ${maxPrice}
        <input
          type="range"
          min={0}
          max={1000}
          value={maxPrice}
          step={50}
          onChange={(e) => dispatch(productsAction.setMaxPrice(e.target.value))}
        />
      </label>
      <h2>Category</h2>
      <div className={styles.categories}>
        {categories.map((category) => (
          <div key={category}>
            <label>
              <input
                type="checkbox"
                value={category.toLowerCase()}
                checked={selectedCategories.includes(category.toLowerCase())}
                onChange={() => handleCategoryChange(category.toLowerCase())}
              />
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeSidebar;
