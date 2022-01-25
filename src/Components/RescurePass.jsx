import AOS from 'aos';
import { useEffect } from 'react';
import InputMask from 'react-input-mask';

import './Styles/RescurePass.css';

function RescurePass() {
    useEffect(() => {
        AOS.init({
            delay: 300,
        });
    }, []);
    return (
        <div className="rescurepass-container">
            <div data-aos="zoom-in" className="rescurepass glass-efect">
                <div className="rescurepass-header">
                    <h2>Recupere sua senha</h2>
                </div>
                <div className="rescurepass-content">
                    <form method='GET' action="/">
                        <label>Confirme seu e-mail:
                            <input name='email' required type="email" placeholder='Confirme seu e-mail.'/>
                        </label>
                        <label>Confirme seu celular:
                            <InputMask name='phone' required type="tel" mask="+55 (99) 99999-9999" placeholder='Confirme seu celular.' maskChar='_'/>
                        </label>
                        <label>Nova senha:
                            <input name='password' required type="password" placeholder='Digite uma nova senha.'/>
                        </label>
                        <button className='btn' type="submit">Recuperar</button>
                    </form>
                </div>
                <div className="rescurepass-footer">
                    <a href="/cadastrar">Cadastre-se</a> | <a href="/entrar">Entrar</a>
                </div>
            </div>
        </div>
    );
}
export default RescurePass;