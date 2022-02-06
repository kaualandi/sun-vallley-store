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
            {
                "id": 3,
                "question": "Error 204.",
                "answer": "Não é exatamente um erro: o servidor atendeu com sucesso a solicitação e que não há conteúdo adicional para enviar no corpo de carga de resposta.",
                'link': ''
            },
            {
                "id": 4,
                "question": "Error 400.",
                "answer": "O servidor não pode ou não processará a solicitação devido a algo que é percebido como um erro desconhecido, contate o suporte.",
                'link': ''
            },
            {
                "id": 5,
                "question": "Error 401.",
                "answer": "A solicitação não foi aplicada porque não possui credenciais de autenticação válidas para o recurso de destino.",
                'link': ''
            },
            {
                "id": 6,
                "question": "Error 403.",
                "answer": "O servidor entendeu o pedido, mas se recusa a autorizá-lo. Você não pode realizar essa ação no momento.",
                'link': ''
            },
            {
                "id": 7,
                "question": "Error 404.",
                "answer": "O servidor de origem não encontrou uma representação atual para o recurso de destino ou não está disposto a revelar que existe.",
                'link': ''
            },
            {
                "id": 8,
                "question": "Error 405.",
                "answer": "O método recebido na linha de solicitação é conhecido pelo servidor de origem, mas não suportado pelo recurso de destino.",
                'link': ''
            },
            {
                "id": 9,
                "question": "Error 412.",
                "answer": "Uma ou mais condições dadas nos campos de cabeçalho de solicitação avaliados como falsas quando testados no servidor.",
                'link': ''
            },
            {
                "id": 10,
                "question": "Error 500.",
                "answer": "Houve uma falha de comunicação em nossos servidores, primeiro verifique se sua conexão é estável e se persistir, entre em contato conosco.",
                'link': ''
            },
            {
                "id": 11,
                "question": "Error 503.",
                "answer": "No momento, o servidor não consegue lidar com a solicitação devido a uma sobrecarga temporária ou manutenção programada, que provavelmente será aliviada após algum atraso.",
                'link': ''
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
                <div className="col-12 col-xl-6" key={faq.id}>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id={'headingOne'+faq.id}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#collapseOne'+faq.id} aria-expanded="false" aria-controls={'collapseOne'+faq.id}>
                        {faq.question}
                        </button>
                        </h2>
                        <div id={'collapseOne'+faq.id} className="accordion-collapse collapse" aria-labelledby={'headingOne'+faq.id} data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            {faq.answer} {faq.link}
                        </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default FaqList;