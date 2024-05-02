import styles from "../styles/MenuCard.module.css";

type Props = {
  title: string;
  img: string;
};
export default function MenuCard(props: Props) {
  return (
    <div className={styles.principalContainer}>
      <img
        src={props.img}
        alt="icon"
        className={styles.principalContainer__Img}
      />
      <h2 className={styles.principalContainer__h2}>{props.title}</h2>
    </div>
  );
}
