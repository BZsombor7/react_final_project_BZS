import { useRef } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/loginContext';
import Swal from 'sweetalert2'

const Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const navigate = useNavigate()

      const handleSubmit = async (e) => {
        e.preventDefault();
    if (usernameRef.current.value !== "") {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: usernameRef.current.value,
            password: passwordRef.current.value
          })
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          login();
          navigate('/form');
        } else {
          Swal.fire('Hiba', 'A megadott adatok nem megfelelőek!', 'error')
        }

      } catch (error) {
        Swal.fire('Hiba', 'A megadott adatok nem megfelelőek!', 'error')
      }
    }
  };



  return (
    <div className={styles.container}>
      <h2>Bejelentkezés</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="Felhasználónév" ref={usernameRef} className={styles.input}/>
        <input type="password" placeholder="Jelszó" className={styles.input} ref={passwordRef}/>
        <button type="submit" className={styles.button}>Belépés</button>
      </form>
    </div>
  );
}
export default Login;

