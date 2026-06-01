import { useParams, useNavigate } from "react-router-dom";
import Card from "../wrappers/Card";
import styles from "./Details.module.css";

function Details({ webData }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = webData.find((item) => item.id === Number(id));

  if (!product) {
    return <h1>Nincs ilyen termék</h1>;
  }

  return (
    <Card>
      <div className={styles.container}>
        <h1 className={styles.title}>{product.name}</h1>

        {product.img_url && (
          <img 
            src={product.img_url} 
            alt={product.name} 
            className={styles.image}
          />
        )}

        <p className={styles.description}>
          <strong>Leírás:</strong> {product.description || "Nincs megadva"}
        </p>

        <p className={styles.info}>
          <strong>Ár:</strong> {product.price} Ft
        </p>

        <p className={styles.info}>
          <strong>Készlet:</strong> {product.stock} db
        </p>

        <button className={styles.button} onClick={() => navigate(-1)}>
          Vissza
        </button>
      </div>
    </Card>
  );
}

export default Details;
