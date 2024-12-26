import styles from "./style.module.css";
function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}

export default Button;
