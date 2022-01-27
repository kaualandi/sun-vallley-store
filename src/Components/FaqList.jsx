import {useEffect, useState} from "react";
import React from 'react';
import Loading from "./Loading";

function FaqList() {
    const [faq, setFaq] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    useEffect(() => {
        // fetch("https://api.myjson.com/bins/1hjv7i")
        //     .then((response) => response.json())
        //     .then((data) => {
        //         setFaq(data);
        //         setLoading(false);
        //     }).catch(err => {
        //         setError(err);
        //         setLoading(false);
        //     });
        setFaq([
            {
                "id": 0,
                "question": "Como me registro?",
                "answer": "Para se registrar, clique no link abaixo e preencha os dados corretamente.",
                'link': (<a href="/cadastrar">Cadastrar</a>)
            },
            {
                "id": 1,
                "question": "Como faço para entrar?",
                "answer": "Para entrar, clique no link abaixo e preencha os dados corretamente.",
                'link': (<a href="/entrar">Entrar</a>)
            },
            {
                "id": 2,
                "question": "Recuperar senha perdida",
                "answer": "Para alterar sua senha, clique no link abaixo e preencha os dados corretamente.",
                'link': (<a href="/recuperar-senha">Recuperar Senha</a>)
            },
        ]);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="row">
            {faq.map(faq => (
                <div className="col-12 col-md-6 col-xl-4" key={faq.id}>
                    <div className="faq-item col">
                        <div className="faq-item-content glass-efect">
                            <h4>{faq.question}</h4>
                            <p>{faq.answer} {faq.link}.</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default FaqList;