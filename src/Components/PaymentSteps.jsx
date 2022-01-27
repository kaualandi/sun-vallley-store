import React, { useEffect } from 'react';
import AOS from 'aos';

import './Styles/PaymentSteps.css';

function PaymentsStep() {
    useEffect(() => {
        AOS.init({
            delay: 300,
        });
    }, []);
    return (
        <div className="payments-container">
            <div data-aos="zoom-in" className="payments glass-efect">
                <div className="payments-header">
                    <h2>Finalizar pedido</h2>
                </div>
                <div className="payments-content">
                    
                </div>
                <div className="payments-footer">
                    <a href="/ajuda">Preciso de ajuda</a>
                </div>
            </div>
        </div>
    );
}
export default PaymentsStep;