import styles from "./style.module.css";
function Button({ children }) {
  return <button className={styles.button}>{children}</button>;
}

export default Button;
