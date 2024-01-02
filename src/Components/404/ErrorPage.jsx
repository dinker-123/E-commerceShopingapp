import styles from "./ErrorPage.module.css";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Page not found !</h1>
        <Link to="/buybusy">
          <button className={styles.formBtn}>Home</button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
