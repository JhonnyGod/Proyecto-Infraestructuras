import React from 'react';
import styles from './ConfirmationModal.module.css';

const ConfirmationModal = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Aviso</h2>
        <p className={styles.modalText}>
          El vehículo deberá ser entregado en las próximas 24 a 48 horas. Un gestor de la compañía se pondrá en contacto contigo a través de correo electrónico o teléfono. Muchas gracias por contar con nosotros.
        </p>
        <button onClick={onClose} className={styles.closeButton}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;

