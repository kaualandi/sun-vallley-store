import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import './Styles/Product.css';
import axios from 'axios';
import Loading from './Loading';

function Product({ product }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [itemQtd, setItemQtd] = useState(1);

    function addToCart(id) {
        setLoading(true);
        if (!sessionStorage.getItem('user_id')) {
            window.location.href = '/entrar';
        }
        axios.post('https://' + window.location.hostname + '/api/addToCart.php', {
            product_id: id,
            user_id: sessionStorage.getItem('user_id'),
            quantity: itemQtd
        })
            .then(function (response) {
                if (response.data.error) {
                    setError(response.data.error);
                } else {
                    setSuccess(response.data.success);
                }
                setLoading(false);
            });
    }
    useEffect(() => {
        AOS.init();
    }, []);
    function closeButton(state) {
        if ('error') setError(null);
        if ('success') setSuccess(null);
    }
    function changeQtdValue(state) {
        if (state === '-') {
            if (itemQtd > 1) {
                setItemQtd(itemQtd - 1);
            }
        }
        if (state === '+') {
            if (itemQtd < 99) {
                setItemQtd(itemQtd + 1);
            }
        }
    }

    return (
        <div data-aos="zoom-in" className="product col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="product-container glass-efect">
                <div className="product-image">
                    <img src={product.image} alt="product" />
                </div>
                <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <p className="product-info__price">
                        <strong>{parseFloat(product.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</strong>
                    </p>
                </div>
                <div className="product-buy">
                    {error && <div className="alert alert-danger" role="alert">{error} <button onClick={() => closeButton('error')} className="button-close-alert no-style"><i className="fa-solid fa-xmark"></i></button></div>}
                    {success && <div className="alert alert-success" role="alert">{success} <button onClick={() => closeButton('success')} className="button-close-alert no-style"><i className="fa-solid fa-xmark"></i></button></div>}
                    {loading ? <Loading /> : (
                        <>
                            <div className="select-quatity">
                                <button onClick={() => changeQtdValue('-')} className='btn reduce'>
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <input readOnly type="number" min="1" value={itemQtd} max="99"/>
                                <button onClick={() => changeQtdValue('+')} className='btn increase'>
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <button className="btn" onClick={() => addToCart(product.id)}>
                                Adicionar ao carrinho
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Product;