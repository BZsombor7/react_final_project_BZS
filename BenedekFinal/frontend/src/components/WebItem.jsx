import Swal from 'sweetalert2'
import { useAuth } from '../context/loginContext'

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
    <div style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>

      {item.img_url && (
        <img 
          src={item.img_url} 
          alt={item.name} 
          style={{ width: "200px", borderRadius: "8px" }}
        />
      )}

      <p><strong>Ár:</strong> {item.price} Ft</p>
      <p><strong>Készlet:</strong> {item.stock} db</p>

      {isLogged && (
        <button onClick={handleDelete}>
          Törlés
        </button>
      )}
    </div>
  )
}

export default WebItem
