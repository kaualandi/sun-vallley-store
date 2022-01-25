import AOS from 'aos';
import { useEffect } from 'react';
import InputMask from 'react-input-mask';

import './Styles/Register.css';

function Register() {
    useEffect(() => {
        AOS.init({
            delay: 300,
        });
    }, []);
    return (
        <div className="register-container">
            <div data-aos="zoom-in" className="register glass-efect">
                <div className="register-header">
                    <h2>Crie uma conta</h2>
                </div>
                <div className="register-content">
                    <form method='GET' action="/">
                        <label>Nome:
                            <input name='nome' required type="text" placeholder='Digite seu nome.'/>
                        </label>
                        <label>E-mail:
                            <input name='email' required type="email" placeholder='Digite seu e-mail.'/>
                        </label>
                        <label>Celular:
                            <InputMask name='phone' required type="tel" mask="+55 (99) 99999-9999" placeholder='Digite seu celular.' maskChar='_'/>
                        </label>
                        <label>Senha:
                            <input name='password' required type="password" placeholder='Digite sua senha.'/>
                        </label>
                        <button className='btn' type="submit">Cadastrar</button>
                    </form>
                </div>
                <div className="register-footer">
                    <a href="/entrar">Entrar</a> | <a href="/ajuda">Ajuda</a>
                </div>
            </div>
        </div>
    );
}
export default Register;