import React from "react";
import './Styles/Header.css';

function Header() {
    return (
        <nav className="navbar fixed-top navbar-expand-sm navbar-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">SunValley Store</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fa-solid fa-align-right"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/entrar">Login/Cadastro</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/conta">Conta</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/produtos">Produtos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/carrinho">Carrinho</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/ajuda">Ajuda</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
}

export default Header;