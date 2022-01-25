import React, {} from 'react';
import Typist from 'react-typist';

import './Styles/Landing.css';
import Cart from './Vectors/Cart';
import AddCart from './Vectors/AddCart';
import ChatBegin from './Vectors/ChatBegin';
import logo from './logo.png';

function Landing() {
    return (
        <div className="landing">
            <div className="landing-header">
                <img src={logo} alt="SunValley Logo"/>
                <h1>Bem vindo a <span className="landing-title wrapper">SunValley Store</span>.</h1>
                <div className='paragraph'><Typist>A loja de serviços digitais mais barata do Brasil! 🛒</Typist></div>
            </div>
            <div className="landing-content">
                <div className="container">
                    <div className="landing-content-item row">
                        <div className="text col-12 col-sm-6">
                            <h2>Produtos</h2>
                            <p>Veja os produtos disponíveis para compra sem precisar entrar ou se cadastrar.</p>
                            <a href='/produtos' className="button fancy-border-radius">Ver produtos</a>
                        </div>
                        <div className="image col-12 col-sm-6">
                            <AddCart />
                        </div>
                    </div>
                    <div className="landing-content-item row">
                        <div className="image col-12 col-sm-6">
                            <Cart />
                        </div>
                        <div className="text col-12 col-sm-6">
                            <h2>Entre</h2>
                            <p>Se já tem cadastro, entre e adicione produtos ao seu carrinho.</p>
                            <a href='/entrar' className="button fancy-border-radius">Entrar</a>
                        </div>
                    </div>
                    <div className="landing-content-item row">
                        <div className="text col-12 col-sm-6">
                            <h2>Ainda tem dúvidas?</h2>
                            <p>Não hesite em nos contactar ou leia as dúvidas frequentes na página de ajuda.</p>
                            <a href='/ajuda' className="button fancy-border-radius">Ajuda</a>
                        </div>
                        <div className="image col-12 col-sm-6">
                            <ChatBegin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Landing;