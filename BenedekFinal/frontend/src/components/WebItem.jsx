import Swal from 'sweetalert2'
import { useAuth } from '../context/loginContext'
import Card from '../wrappers/Card'
import styles from './WebItem.module.css'
import { NavLink } from "react-router-dom";

const WebItem = ({ item, refreshData }) => {
  const { isLogged } = useAuth()

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:3000/products/${item.id}`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('token')
      }
    })

    if (res.ok) {
      Swal.fire('Törölve', '', 'success')
      refreshData()
    }
  }

  return (
    <Card>
      <div className={styles.container}>
        <h3 className={styles.name}>{item.name}</h3>

        {item.img_url && (<img src={item.img_url} alt={item.name} className={styles.image}/>)}

        <p className={styles.description}>{item.description}</p>

        <NavLink to={`/details/${item.id}`}>
          <button className={styles.detaButton}>Részletek</button>
        </NavLink>

        {isLogged && (<button className={styles.delButton} onClick={handleDelete}>Törlés</button>)}
      </div>
    </Card>
  )
}

export default WebItem
