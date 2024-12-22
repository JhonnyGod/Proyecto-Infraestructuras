import React, { useEffect } from 'react';
import GooglePayButton from '@google-pay/button-react';
import usePaymentStatus from '../store/PaymentStatus';
import axios from 'axios';

export default function GooglePayComponent({ transactionData, priceString }) {
    const { setPaymentStatus, paymentData, paymentStatus, isPaymentSuccess} = usePaymentStatus();
    const { id_usuario, id_vehiculo } = transactionData;

    console.log("Lo que recibe", transactionData)
    const handlePaymentSuccess = () => {
        isPaymentSuccess();
        if (isPaymentSuccess) {
            finishRent();
        }
    };
    const finishRent = async () => {
       try {
        const saveRent = await axios.post('http://localhost:3000/renta/alquilarvehiculo', {
             id_usuario: transactionData.idusuario,
             id_vehiculo: transactionData.idvehiculo,
             fecha_inicio: transactionData.fecha_inicio,
             fecha_fin: transactionData.fecha_fin,
             valor_total: priceString,
         },)
 
         if(saveRent.status != 200){
             alert('Algo salió mal mientras se realizaba la renta. Intenta nuevamente.');
         }
       } catch (error) {
           console.error('Error al realizar la renta:', error);
           alert('Algo salió mal mientras se realizaba la renta. Intenta nuevamente.');
       }
    }
    

const handlePaymentFailure = () => {
    setPaymentStatus('FAILED');
    alert('Pago fallido. Intenta nuevamente.');
};

console.log('Merchant ID:', process.env.REACT_APP_GOOGLE_PAY_MERCHANT_ID);
console.log('Merchant Name:', process.env.REACT_APP_GOOGLE_PAY_MERCHANT_NAME);

return (
    <div>
        <GooglePayButton
            environment="TEST"
            paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                    {
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['VISA', 'MASTERCARD'],
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                gateway: "example",
                                gatewayMerchantId: "exampleGatewayMerchantId",
                            },
                        },
                    },
                ],
                merchantInfo: {
                    merchantId: process.env.REACT_APP_GOOGLE_PAY_MERCHANT_ID,
                    merchantName: process.env.REACT_APP_GOOGLE_PAY_MERCHANT_NAME,
                },
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: priceString,
                    currencyCode: 'COP',
                    countryCode: 'CO',
                },
                shippingAddressRequired: true,
                callbackIntents: ['PAYMENT_AUTHORIZATION'],
            }}
            onLoadPaymentData={(paymentRequest) => {
                console.log('Load Payment Data:', paymentRequest);
            }}
            onPaymentAuthorized={(paymentData) => {
                console.log("Cebolla")
                handlePaymentSuccess();
                setPaymentStatus('SUCCESS');
                return { transactionState: 'SUCCESS' };
            }}
            onPaymentFailed={(error) => {
                console.error('Payment Failed:', error);
                handlePaymentFailure();
            }}
        />
    </div>
);
}
