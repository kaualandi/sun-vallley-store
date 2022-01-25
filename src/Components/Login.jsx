import AOS from 'aos';
import { useEffect } from 'react';

import './Styles/Login.css';

function Login() {
    useEffect(() => {
        AOS.init({
            delay: 300,
        });
    }, []);
    return (
        <div className="login-container">
            <div data-aos="zoom-in" className="login glass-efect">
                <div className="login-header">
                    <h2>Entre em sua conta</h2>
                </div>
                <div className="login-content">
                    <form method='GET' action="/">
                        <label>E-mail:
                            <input name='email' required type="email" placeholder='Digite seu e-mail.'/>
                        </label>
                        <label>Senha:
                            <input name='password' required type="password" placeholder='Digite sua senha.'/>
                        </label>
                        <button className='btn' type="submit">Entrar</button>
                    </form>
                </div>
                <div className="login-footer">
                    <a href="/cadastrar">Cadastre-se</a> | <a href="/recuperar-senha">Esqueci a senha</a>
                </div>
            </div>
        </div>
    );
}
export default Login;