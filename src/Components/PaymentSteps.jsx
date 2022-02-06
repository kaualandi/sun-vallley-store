import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import axios from 'axios';
import { useLocation} from 'react-router-dom';
import { useMercadopago } from 'react-sdk-mercadopago';
import Loading from './Loading';

import './Styles/PaymentSteps.css';

function PaymentsStep() {
    const mercadopago = useMercadopago.v2('TEST-fea39f3b-8896-465f-a765-6f39dbba2ab4', {
        locale: 'pt-BR'
    });
    const [totalValue, setTotalValue] = useState(0);
    const [fullNameProduct, setFullNameProduct] = useState('');
    const [loadingAll, setLoadingAll] = useState(true);
    const [loadingPayNow, setLoadingPayNow] = useState(true);
    const [preferenceId, setPreferenceId] = useState('');
    const [error, setError] = useState(false);
    const [infomsg, setInfomsg] = useState('');

    if(!sessionStorage.getItem('user_id')) {
        window.location.href = '/';
    }

    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();
    const status = query.get('status');

    function calcTotalValue(data) {
        let totalValue = 0;
        data.forEach(item => {
            totalValue += (item.price * item.qtd);
        });
        return totalValue;
    }
    function prepearName(data) {
        let name = '';
        data.forEach((item, i) => {
            let itemNameQtd = item.name + ' x' + item.qtd;
            if (i === data.length - 1) {
                name += itemNameQtd + '.';
            } else {
                name += itemNameQtd + ', ';
            }
        });
        return name;
    }
    

    useEffect(() => {
        AOS.init({
            delay: 300,
        });
        
        if(!status) {
        axios.post('http://'+window.location.hostname+'/api/mycart.php',
        {user_id: sessionStorage.getItem('user_id')})
        .then(function (response) {
            if (response.data.error) {
            } else {
                if (response.data.length === 0) {
                    window.location.href = '/carrinho';
                }
                const totalProductValue = calcTotalValue(response.data)
                sessionStorage.setItem('totalProductValue', totalProductValue);
                setTotalValue(totalProductValue);
                const fullName = prepearName(response.data)
                sessionStorage.setItem('fullName', fullName);
                setFullNameProduct(fullName);
                setLoadingAll(false);
                
                axios.post('http://'+window.location.hostname+'/api/getPreferenceID.php',{
                            title: fullName,
                            quantity: 1,
                            currency_id: "BRL",
                            unit_price: totalProductValue
                        })
                .then(function (response) {
                    const result = response.data;
                    if (result.error) {
                        setError(error);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } else {
                        setPreferenceId(result);
                        setLoadingPayNow(false);
                    }
                })
                .catch(function (error) {
                    setError('Um erro aconteceu. Irei recarregar a página e tentar novamente.',error);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                });
            }
        })
        } else {
            setLoadingAll(false);
            setLoadingPayNow(false);
        }

        if (status) {
            setLoadingAll(true);
            if (status !== 'failure') {
                const payment_id = query.get('payment_id');
                const preference_id = query.get('preference_id');

                if (payment_id) {
                    if (!sessionStorage.getItem('totalProductValue') && !sessionStorage.getItem('fullName')) {
                        window.location.href = '/carrinho';
                    }
                    console.log(
                        {
                            user_id: sessionStorage.getItem('user_id'),
                            payment_id: payment_id,
                            total_value: sessionStorage.getItem('totalProductValue'),
                            details: sessionStorage.getItem('fullName'),
                            preference_id: preference_id
                        }
                    );
                    axios.post('http://'+window.location.hostname+'/api/neworder.php', {
                        user_id: sessionStorage.getItem('user_id'),
                        payment_id: payment_id,
                        total_value: sessionStorage.getItem('totalProductValue'),
                        details: sessionStorage.getItem('fullName'),
                        preference_id: preference_id
                    })
                    .then(function (response) {
                        if (response.data.error) {
                            setError('Um erro aconteceu. Irei recarregar a página e tentar novamente.',error);
                            setLoadingAll(false);
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                        } else {
                            setInfomsg(response.data.success);
                            setLoadingAll(false);
                            sessionStorage.removeItem('totalProductValue');
                            sessionStorage.removeItem('fullName');
                        }
                    });
                } else {
                    setLoadingAll(false);
                }
            } else {
                setLoadingAll(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    function nextStep() {
        const checkout = mercadopago.checkout({
            preference: {
                id: preferenceId
            }
        });
        checkout.open();
    }

    return (
        <div className="payments-container">
            <div data-aos="zoom-in" className="payments glass-efect">
                <div className="payments-header text-center">
                    <h2>Finalizar pedido</h2>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {loadingAll ? <Loading /> : (
                    <>
                        {!status && (
                            <div className="card-content__buy">
                            <p className="text-center">Produto: {fullNameProduct}</p>
                            <p className='text-center'>Total: {totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                        </div>
                        )}
                        
                        {status ? (
                            <>
                                {status === 'success' && (<div className="text-center alert alert-success" role="alert">Seu pedido foi aprovado, agora basta aguardar, iremos mandar em seu e-mail todas as informações. <a href="/conta">Ver pedido</a>.<br/> {infomsg}</div>)}
                                {status === 'failure' && (<div className="text-center alert alert-danger" role="alert">Seu pagamento falhou, <a href="/finalizar-pedido">tentar novamente</a> ou <a href="/ajuda">ajuda</a>.</div>)}
                                {status === 'pending' && (<div className="text-center alert alert-info" role="alert">A aprovação do seu pagamento está em andamento, você pode verificar o status na sua conta. <a href="/conta">Ver pedido</a>.<br/> {infomsg}</div>)}
                            </>
                        ) : (
                            <>
                                {loadingPayNow ? <Loading/> : (
                                    <div className="payments-content">
                                        <button onClick={nextStep} className='btn fancy-border-radius'>Pagar agora!</button>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
                <div className="payments-footer">
                    <a href="/ajuda">Preciso de ajuda</a>
                </div>
            </div>
            <script src="https://sdk.mercadopago.com/js/v2"></script>
        </div>
    );
}
export default PaymentsStep;