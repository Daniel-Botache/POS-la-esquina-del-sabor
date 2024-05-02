import SignUpForm from "./SignUpForm";
import InfoSoft from "./InfoSoft";
import styles from "../styles/ViewAuth.module.css";

export default function ViewAuth() {
  return (
    <div className={styles.principalContainer}>
      <div className={styles.colorBackContainer}></div>
      <div className={styles.componentsContainer}>
        <InfoSoft />
        <SignUpForm />
      </div>
    </div>
  );
}
