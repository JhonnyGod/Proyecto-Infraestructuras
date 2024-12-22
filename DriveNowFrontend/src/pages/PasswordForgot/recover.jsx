import { useState } from 'react';
import axios from 'axios';
import './recover.css';
import { useNavigate } from 'react-router-dom';

const Recover = () => {
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [code, setCode] = useState(['', '', '', '']);
    const [isMoved, setIsMoved] = useState(false);
    const [replacer, showReplacer] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [newpas, setNewpas] = useState('');
    const [confirmpas, setConfirmpas] = useState('');
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const matchPasswords = (e) => {
        e.preventDefault();
        const new_password = newpas;
        const confirm_password = confirmpas;
        if (new_password != confirm_password) {
            console.log('Las contraseñas no coinciden');
        }
        else {
            finishReplace();
        }
    }

    const finishReplace = async () => {
        try {
            const sendNewPassword = await axios.put(`${apiUrl}/usuario/actualizaruser`, {
                email: email,
                password: newpas,
                code: code.join('')
            });

            if (sendNewPassword.status === 200) {
                console.log("Contraseña actualizada exitosamente.");
                navigate('/');
            }
            else {
                console.error('Error al actualizar contraseña')
            }
        } catch (error) {
            console.error('Error al actualizar contraseña:', error);
        }
    }


    const togglePasswordVisibility = (inputId) => {
        const inputField = document.getElementById(inputId);
        if (inputField.type === 'password') {
            inputField.type = 'text';
        } else {
            inputField.type = 'password';
        }
    };

    const takeDigit = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value) || value === '') {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 3) {
                const nextInput = document.querySelectorAll('.code-input-group input')[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    }

    const sendCodeToBackend = async () => {
        const codeString = code.join('');
        const userEmail = email;
        try {
            const passwordChangeResponse = await axios.post(`${apiUrl}/usuario/validarCodigo`, {
                email: userEmail,
                code: codeString
            });

            if (passwordChangeResponse.status === 200) {
                console.log('Código validado');
                showReplacer(true);
                setIsExiting(true);

            }

        } catch (error) {
            console.error('Error al validar código:', error);
        }
    }

    const openRecoveryCodeForm = () => {
        setShowContent(true);
        setShowModal(false);
        setIsMoved(true);
    }

    const recoverPasswordFunction = async (e) => {
        e.preventDefault();
        try {
            setShowModal(true);
            const response = await axios.post('http://localhost:3000/usuario/recuperar', { email });
            console.log("Solicitud enviada");

            const data = response.data;

            const info = {
                status: data.ok,
                message: data.message
            };
            

            if (info.status === 200) {
                console.log(info);
            }


            if (response.status !== 200) {
                console.error('Error al recuperar contraseña:', response);
                setEmail('');
            }

        } catch (error) {
            console.error('Error al recuperar contraseña:', error);
            setEmail('');
        }
    };

    const register = async (e) => {
        e.preventDefault();
        navigate('/Login');
      }

    return (
        <div className='Container'>     
            <div className={`Recover ${isMoved ? 'move-left' : ''} ${isExiting ? 'exit-left' : ''}`}>
                <h1>Recuperar contraseña</h1>
                <form onSubmit={recoverPasswordFunction}>
                    <div className="line">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingresa tu correo electrónico."
                            required
                        />
                        <i className="fas fa-envelope recover_icon"></i>
                    </div>
                    <button type="submit" className='sendbutton'>Enviar</button>
                    <div className="forgot-password">
                        <a href="#" className="Return_login" onClick={register} > Regresar </a>
                    </div>
                </form>
                {showModal && (
                    <div className='modal-overlay'>
                        <div className="modal-content">
                            <p>Si el correo se encuentra registrado, se envió un correo de verificación.</p>
                            <button className="closebutton" onClick={openRecoveryCodeForm}>Cerrar</button>
                        </div>
                    </div>
                )}
            </div>
            {showContent && (
                <div className={`recovery-code-input ${isMoved ? 'move-right' : ''} ${isExiting ? 'exit-right' : ''}`}>
                    <p>Ingresa el código que se envió a tu correo:</p>
                    <div className="code-input-group">
                        <input
                            type="text"
                            maxLength="1"
                            pattern="\d"
                            onChange={(e) => takeDigit(e, 0)}
                            required
                        />
                        <input
                            type="text"
                            maxLength="1"
                            pattern="\d"
                            onChange={(e) => takeDigit(e, 1)}
                            required
                        />
                        <input
                            type="text"
                            maxLength="1"
                            pattern="\d"
                            onChange={(e) => takeDigit(e, 2)}
                            required
                        />
                        <input
                            type="text"
                            maxLength="1"
                            pattern="\d"
                            onChange={(e) => takeDigit(e, 3)}
                            required
                        />
                    </div>
                    <button type="button" className='verify-button' onClick={sendCodeToBackend}>
                        Verificar
                    </button>
                </div>
            )}
            {replacer && (
                <div className='password-setter'>
                    <h1>Recuperar contraseña</h1>
                    <form onSubmit={matchPasswords}>
                        <div className="password-line">
                            <input
                                type="password"
                                id="new-password"
                                placeholder="Ingresa tu nueva contraseña."
                                onChange={(e) => setNewpas(e.target.value)}
                                required
                            />
                            <i className="fas fa-lock finalrecover_icon"></i>
                            <span className="toggle-password" onClick={() => togglePasswordVisibility('new-password')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </span>
                        </div>
                        <div className="confirm password-line">
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirma tu nueva contraseña."
                                onChange={(e) => setConfirmpas(e.target.value)}
                                required
                            />
                            <i className="fas fa-lock recover_icon"></i>
                            <span className="toggle-password" onClick={() => togglePasswordVisibility('confirm-password')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </span>
                        </div>
                        <button type="submit" className='sendbutton'>Enviar</button>
                        
                    </form>
                </div>
            )}
        </div>
    );
};

export default Recover;
