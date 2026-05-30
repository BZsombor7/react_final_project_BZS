import { useRef } from 'react'
import Swal from 'sweetalert2'

const WebForm = ({ refreshData }) => {
  const nameRef = useRef()
  const descriptionRef = useRef()
  const imgRef = useRef()
  const priceRef = useRef()
  const stockRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const name = nameRef.current.value
    const description = descriptionRef.current.value
    const img_url = imgRef.current.value
    const price = priceRef.current.value
    const stock = stockRef.current.value

    if (!name || !price || !stock) {
      Swal.fire('Hiba', 'A név, ár és készlet kötelező!', 'error')
      return
    }

    const res = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')
      },
      body: JSON.stringify({
        name,
        description,
        img_url,
        price,
        stock
      })
    })

    if (res.ok) {
      Swal.fire('OK', 'Termék mentve!', 'success')
      refreshData()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Új kebab felvétele</h2>

      <input ref={nameRef} placeholder="Kebab neve" />
      <textarea ref={descriptionRef} placeholder="Leírás" />
      <input ref={imgRef} placeholder="Kép URL" />
      <input ref={priceRef} type="number" placeholder="Ár" />
      <input ref={stockRef} type="number" placeholder="Készlet" />

      <button>Mentés</button>
    </form>
  )
}

export default WebForm
