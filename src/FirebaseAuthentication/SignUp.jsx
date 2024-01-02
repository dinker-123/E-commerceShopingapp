import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpThunk,
  userActions,
  userSelector,
} from "../store/reducers/userReducer";
import { useEffect, useState } from "react";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const dispatch = useDispatch();
  const { isSigningUp, signUpSuccess } = useSelector(userSelector);

  const clear = () => {
    setName("");
    setEmail("");
    setPass("");
  };

  useEffect(() => {
    if (signUpSuccess) {
      navigate("/buybusy");
      dispatch(userActions.setSignUpSuccess(false));
    }
  }, [signUpSuccess, dispatch, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(signUpThunk({ email, pass }))
      .then((actionCreator) => {
        console.log("sign up actionCreator: ", actionCreator);
        const output = actionCreator.payload;

        if (!output.includes("auth")) {
          const uid = output;
          localStorage.setItem("uid", uid);
          dispatch(userActions.setUser(uid));
          clear();
          toast.success("Sign up successful!");
        } else {
          toast.error(output.toUpperCase());
        }
      })
      .catch((error) => {
        toast.error(error.code.toUpperCase());
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleSignUp(e)}>
        <h2 className={styles.formHeading}>Sign Up</h2>
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          required
        />
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          required
        />
        <input
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
          type="password"
          required
        />
        <button className={styles.formBtn}>
          {isSigningUp ? "..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
