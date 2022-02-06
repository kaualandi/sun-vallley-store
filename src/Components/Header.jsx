import React, {useEffect} from "react";
import axios from "axios";
import './Styles/Header.css';

function Header() {
    useEffect(() => {
        axios.post('http://'+window.location.hostname+'/api/header.php', {
            user_id: sessionStorage.getItem('user_id')
        })
        .then(function (response) {
            let result = response.data;
            if (!result.notloged) {
                let userFirstName = result.user_name.split(' ')[0] || result.user_name;
                sessionStorage.setItem('user_id', result.user_id);
                sessionStorage.setItem('firtName', userFirstName);
                sessionStorage.setItem('function',parseInt(result.user_function));
            }
        })
        .catch(function (error) {
            console.log('Error:', error.toString());
        });
    }, []);

    function logout(e) {
        e.preventDefault();
        axios.post('http://'+window.location.hostname+'/api/logout.php')
        .then(function (response) {
            let result = response.data;
            if (result.success) {
                sessionStorage.clear();
				window.location.href = '/';
            }
        })
    }

    return (
        <nav className="navbar fixed-top navbar-expand-md navbar-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">SunValley Store</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fa-solid fa-align-right"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                {sessionStorage.getItem('user_id') ? (
                    <>
                        <li className="nav-item">
                            <a className="nav-link" href="/conta">{sessionStorage.getItem('firtName') ? sessionStorage.getItem('firtName') : 'Conta'}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/" onClick={logout}>Sair</a>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <a className="nav-link" href="/entrar">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cadastrar">Cadastro</a>
                        </li>
                    </>
                    
                )}
                {sessionStorage.getItem('function') === '1' ? (
                    <li className="nav-item">
                        <a className="nav-link" href="/admin">Admin</a>
                    </li>
                ) : ''}
                <li className="nav-item">
                    <a className="nav-link" href="/produtos">Produtos</a>
                </li>
                {sessionStorage.getItem('user_id') ? (
                    <li className="nav-item">
                        <a className="nav-link" href="/carrinho">Carrinho</a>
                    </li>
                ) : ''}
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