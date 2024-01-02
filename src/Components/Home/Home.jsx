import styles from "./Home.module.css";
import HomeList from "./HomeList";
import HomeSidebar from "./HomeSidebar";
import Spinner from "react-spinner-material";
import HomeForm from "./HomeForm";
import { useSelector } from "react-redux";
import { productsSelector } from "../../store/reducers/productsReducer";

function Home() {
  console.log("home.js");

  const { products, productsLoading } = useSelector(productsSelector);

  return (
    <div className={styles.Home}>
      {productsLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : products.length === 0 ? (
        <h1 className={styles.productsEmpty}>No products!</h1>
      ) : (
        <>
          <HomeForm />
          <HomeSidebar />
          <HomeList />
        </>
      )}
    </div>
  );
}

export default Home;
