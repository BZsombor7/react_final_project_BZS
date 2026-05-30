import Swal from 'sweetalert2'
import { useAuth } from '../context/loginContext'

const WebItem = ({ item }) => {
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
    }
  }

  return (
    <div style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
      <h3>{item.choose}</h3>
      <p>{item.notes}</p>

      {isLogged && (
        <button onClick={handleDelete}>
          Törlés
        </button>
      )}
    </div>
  )
}

export default WebItem