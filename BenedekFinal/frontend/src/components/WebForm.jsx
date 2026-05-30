import { useRef } from 'react'
import Swal from 'sweetalert2'

const WebForm = ({ refreshData }) => {
  const chooseRef = useRef()
  const dateRef = useRef()
  const notesRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const choose = chooseRef.current.value
    const date = dateRef.current.value
    const notes = notesRef.current.value

    if (!choose || !date) {
      Swal.fire('Hiba', 'Tölts ki mindent', 'error')
      return
    }

    const res = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        choose,
        pickupDate: date,
        notes
      })
    })

    if (res.ok) {
      Swal.fire('OK', 'Mentve', 'success')
      refreshData()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Kebab rendelés</h2>

      <input ref={chooseRef} placeholder="Típus" />
      <input type="date" ref={dateRef} />
      <textarea ref={notesRef} />

      <button>Mentés</button>
    </form>
  )
}

export default WebForm