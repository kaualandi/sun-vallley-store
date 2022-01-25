import InputMask from 'react-input-mask';
import HeaderContents from "./HeaderContents";
import FaqList from './FaqList';
import './Styles/Help.css';

function Help() {
    
    const social = [
        {
            name: "discord",
            link: "https://discord.gg/s8aKgmEWjG",
            icon: "fa-brands fa-discord"
        },
    ];

    

    return (
        <div className="help">
            <HeaderContents title={'Ajuda'}/>
            <div className="help-content container">
                <section id="faq">
                    <h3>Perguntas frequentes</h3>
                    <FaqList />
                </section>
                <section id="contact">
                    <h3>Contato</h3>
                    <div className="socialList">
                        {social.map(social => (
                            <a href={social.link} key={social.name}>
                                <i className={`${social.icon}`}></i>
                            </a>
                        ))}
                    </div>
                    <form method="get">
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <label>Nome:
                                    <input required type="text" name="nome" placeholder="Digite seu nome."/>
                                </label>
                                <label> E-mail:
                                    <input required type="email" name="email" placeholder="Digite seu e-mail."/>
                                </label>
                                <label> Telefone:
                                    <InputMask name='phone' type="tel" mask="+55 (99) 99999-9999" placeholder='Digite seu celular.' maskChar='_'/>
                                </label>
                            </div>
                            <div className="col-12 col-sm-6">
                                <label>Mensagem:
                                    <textarea required name="mensagem" placeholder="Digite sua mensagem."></textarea>
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="btn">Enviar</button>
                    </form>
                </section>
            </div>
        </div>
    );
}
export default Help;