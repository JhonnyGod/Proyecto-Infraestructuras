import React, { useState } from 'react';
import styles from './ReturnModal.module.css';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import axios from 'axios';

const ReturnModal = ({ rentalId, onClose }) => {  // Se recibe rentalId como prop
    const [goodCondition, setGoodCondition] = useState(null);
    const [earlyReturn, setEarlyReturn] = useState(null);
    const [earlyReturnReason, setEarlyReturnReason] = useState('');
    const [rating, setRating] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendDevolutionPetition();
        console.log("Rental ID: ", rentalId); 

        console.log({
            rentalId: rentalId,
            goodCondition: goodCondition,
            earlyReturn: earlyReturn,
            earlyReturnReason: earlyReturnReason,
            rating: rating,
        })
        setShowConfirmation(true);
    };

    const sendDevolutionPetition = async () => {
        const petition = await axios.post('http://localhost:3000/usuario/devolver', {
            rentalId: rentalId,
            goodCondition: goodCondition,
            earlyReturn: earlyReturn,
            earlyReturnReason: earlyReturnReason,
            rating: rating,
    });

    

};

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>Información para la devolución</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <p>1. Estado del vehículo. ¿Recibió el vehículo en buenas condiciones?</p>
                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                className={`${styles.button} ${goodCondition === true ? styles.active : ''}`}
                                onClick={() => setGoodCondition(true)}
                            >
                                Sí
                            </button>
                            <button
                                type="button"
                                className={`${styles.button} ${goodCondition === false ? styles.active : ''}`}
                                onClick={() => setGoodCondition(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <p>2. ¿La devolución es una devolución temprana?</p>
                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                className={`${styles.button} ${earlyReturn === true ? styles.active : ''}`}
                                onClick={() => setEarlyReturn(true)}
                            >
                                Sí
                            </button>
                            <button
                                type="button"
                                className={`${styles.button} ${earlyReturn === false ? styles.active : ''}`}
                                onClick={() => setEarlyReturn(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {earlyReturn && (
                        <div className={styles.formGroup}>
                            <label htmlFor="earlyReturnReason">Describa el motivo de su devolución (Opcional)</label>
                            <textarea
                                id="earlyReturnReason"
                                value={earlyReturnReason}
                                onChange={(e) => setEarlyReturnReason(e.target.value)}
                                className={styles.textarea}
                            />
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <p>3. Calificación. ¿Cómo calificaría su experiencia con el vehículo?</p>
                        <div className={styles.ratingGroup}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    className={`${styles.ratingButton} ${rating === value ? styles.active : ''}`}
                                    onClick={() => setRating(value)}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Enviar formulario
                    </button>
                </form>
                <button onClick={onClose} className={styles.closeButton}>
                    &times;
                </button>
            </div>
            {showConfirmation && <ConfirmationModal onClose={onClose} />}
        </div>
    );
};

export default ReturnModal;
