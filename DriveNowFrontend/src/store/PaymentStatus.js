import { create } from 'zustand'; 

const usePaymentStatus = create((set, get) => ({
    paymentStatus: null,  // Estado inicial es null (sin transacción)
    paymentData: null,  // Datos de la transacción
    setPaymentStatus: (value) => set({ paymentStatus: value }),  // Función para actualizar el estado
    getPayStatus: () => get().paymentStatus !== null,  // Verifica si el estado ha sido actualizado
    isPaymentSuccess: () => get().paymentStatus === 'SUCCESS',  // Verifica si la transacción fue exitosa
    setPaymentData: (data) => set({ paymentData: data }),  // Función para actualizar los datos de la transacción
}));

export default usePaymentStatus;
