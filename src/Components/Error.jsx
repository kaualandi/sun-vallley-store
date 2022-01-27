import React from 'react';
import BotError from "./Vectors/BotError";
import { useLocation } from "react-router-dom";
import './Styles/Error.css';

function Error({ errorCode, errorMessage }) {
    let location = useLocation();
    return (
        <div className="error d-flex">
            <div className="row">
                <div className="error-text col-12 col-sm-6 text-center">
                    <h1>Oops! Erro {errorCode}</h1>
                    <p>{errorMessage}</p>
                    <code>{location.pathname}</code>
                    <a className="fancy-border-radius" href="/">Início</a>
                    <a className="fancy-border-radius" href="/ajuda">Ajuda</a>
                </div>
                <div className="error-image col-12 col-md-6">
                    <BotError />
                </div>
            </div>
        </div>
    );
}

export default Error;