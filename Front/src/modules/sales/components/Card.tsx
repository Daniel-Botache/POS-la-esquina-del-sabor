import style from "../styles/Card.module.css";

export default function Card(props: any) {
  return (
    <div className={style.principalContainer}>
      <h3> Cod: {props.id} </h3>
      <div className={style.imgContainer}>
        <img src={props.img} alt="producto" />
      </div>
      <p>Inv: {props.volume}</p>
      <h2>{props.name}</h2>
      <h2>$ {props.price}</h2>
    </div>
  );
}
