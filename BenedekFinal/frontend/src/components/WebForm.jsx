import { useRef } from 'react'
import Swal from 'sweetalert2'
import Card from '../wrappers/Card'
import styles from './WebForm.module.css'

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
    <Card>
      <div className={styles.container}>
        <h2 className={styles.title}>Új kebab felvétele</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          
          <div className={styles.info}>
            <label className={styles.label}>Kebab neve*</label>
            <input className={styles.input} ref={nameRef} />
          </div>

          <div className={styles.info}>
            <label className={styles.label}>Leírás</label>
            <textarea className={styles.textarea} ref={descriptionRef}></textarea>
          </div>

          <div className={styles.info}>
            <label className={styles.label}>Kép URL</label>
            <input className={styles.input} ref={imgRef} />
          </div>

          <div className={styles.info}>
            <label className={styles.label}>Ár (Ft)*</label>
            <input className={styles.input} type="number" ref={priceRef} />
          </div>

          <div className={styles.info}>
            <label className={styles.label}>Készlet (db)*</label>
            <input className={styles.input} type="number" ref={stockRef} />
          </div>

          <button className={styles.button}>Mentés</button>
        </form>
      </div>
    </Card>
  )
}

export default WebForm
