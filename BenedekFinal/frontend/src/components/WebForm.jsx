import { useRef, useState } from "react";
import Card from "../wrappers/Card";
import Swal from "sweetalert2";
import styles from "./WebForm.module.css";

const WebForm = ({ sendDataToApp }) => {
  const chooseRef = useRef();
  const drinkRef = useRef();
  const pickupDateRef = useRef();
  const notesRef = useRef();


  const handleSubmit = (event) => {
    event.preventDefault();
    summarizeWebForm();
  };

  const summarizeWebForm = () => {
    const choose = chooseRef.current.value;
    const drink = drinkRef.current.value;
    const pickupDate = pickupDateRef.current.value;
    const notes = notesRef.current.value;

    if (!choose || !drink || !pickupDate) {
      Swal.fire({
        icon: "error",
        title: "Hiba",
        text: "Kérem töltse ki a kötelező mezőket!",
      });
      return;
    }

    const saveWebDataToDatabase = async () => {
      try {
        const response = await fetch("http://localhost:3000/travels", { 

          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            choose,
            drink: drink,
            pickupDate: pickupDate,
            notes,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          sendDataToApp(data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Hiba",
            text: "Az utazás mentése nem sikerült!",
          });
        }
      } catch (error) {
        console.error("Hiba:", error);
      }
    };

    saveWebDataToDatabase();
  };

  return (
    <Card>
      <div className={styles.container}>
        <h2 className={styles.title}>Kebab rendelés</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="choose">
              Kebab fajtája
            </label>
            <input
              className={styles.input}
              type="text"
              id="choose"
              ref={destinationRef}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="pickupDate">
              Kebab felvételének dátuma
            </label>
            <input
              className={styles.input}
              type="date"
              id="pickupDate"
              ref={startDateRef}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="notes">
              Megjegyzések
            </label>
            <textarea
              className={styles.textarea}
              id="notes"
              ref={notesRef}
            ></textarea>
          </div>

          <button className={styles.button} type="submit">
            Küldés
          </button>
        </form>
      </div>
    </Card>
  );
};

export default WebForm