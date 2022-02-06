import React, { useState } from "react";
import HeaderContents from "./HeaderContents";
import CartList from "./CartList";
import './Styles/Cart.css';

function Cart() {
    const [totalValue, setTotalValue] = useState(0);
    let buttonDisabled = false;
    if (!totalValue) {
        buttonDisabled = true;
    }
    function finishOrder() {
        if (!buttonDisabled) {
            window.location.href = "/finalizar-pedido";
        }
    }
    return (
        <div className="cart">
            <HeaderContents title="Carrinho"/>
            <div className="cart-content container">
                <div className="cart-content__list">
                    <CartList setTotalValue={setTotalValue} />
                </div>
                <div className="cart-content__buy">
                    <div className="cart-content__buy-total">
                        <p>Total: {totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                    </div>
                    <button disabled={buttonDisabled} onClick={finishOrder} className="btn">Finalizar pedido</button>
                </div>
                <div className='payment-metods'>
                    <img src="https://i.imgur.com/apj1EAq.png" alt="metodos de pagamentos" />
                </div>
            </div>
        </div>
    );
}
export default Cart;