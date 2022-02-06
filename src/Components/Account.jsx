import React, { useState } from 'react';
import HeaderContents from './HeaderContents';
import MyData from './MyData';
import MyOrders from './MyOrders';
import CartList from './CartList';
import './Styles/Account.css';
import Loading from './Loading';
import axios from 'axios';

function Account() {
    const [totalValue, setTotalValue] = useState(0);

    const [errorAlterPass, setErrorAlterPass] = useState(false);
    const [successAlterPass, setSuccessAlterPass] = useState(false);
    const [loadingAlterPass, setLoadingAlterPass] = useState(false);
    const [alterPassInput, setAlterPassInput] = useState({
        currentPass: '',
        newPass: '',
        confirmPass: ''
    });
    
    const [errorDropAccount, setErrorDropAccount] = useState(false);
    const [successDropAccount, setSuccessDropAccount] = useState(false);
    const [loadingDropAccount, setLoadingDropAccount] = useState(false);
    const [dropAccountInput, setDropAccountInput] = useState({confirmPass: ''});

    function handlePassInput(e) {
        setAlterPassInput({
            ...alterPassInput,
            [e.target.name]: e.target.value
        });
    }
    function handleDropAccountInput(e) {
        setDropAccountInput({
            confirmPass: e.target.value
        });
    }

    function handleEditPassSubmit(e) {
        e.preventDefault();
        setLoadingAlterPass(true);
        setErrorAlterPass(false);
        setSuccessAlterPass(false);
        axios.post('http://' + window.location.hostname + '/api/alterPass.php', {
            user_id: sessionStorage.getItem('user_id'),
            currentPass: alterPassInput.currentPass,
            newPass: alterPassInput.newPass,
            reNewPass: alterPassInput.confirmPass
        })
            .then(function (response) {
                if (response.data.error) {
                    setErrorAlterPass(response.data.error);
                    setLoadingAlterPass(false);
                } else {
                    loadingAlterPass('Senha alterada com sucesso!');
                    setLoadingAlterPass(false);
                }
            })
            .catch(function (error) {
                setErrorAlterPass('Um erro aconteceu, mas só Deus sabe qual.');
                setLoadingAlterPass(false);
            });
    }

    function dropAccountSubmit(e) {
        e.preventDefault();
        setLoadingDropAccount(true);
        setErrorDropAccount(false);
        axios.post('http://' + window.location.hostname + '/api/dropAccount.php', {
            user_id: sessionStorage.getItem('user_id'),
            confirmPass: dropAccountInput.confirmPass
        })
            .then(function (response) {
                if (response.data.error) {
                    setErrorDropAccount(response.data.error);
                    setLoadingDropAccount(false);
                } else {
                    setSuccessDropAccount('Conta excluída!');
                    sessionStorage.clear();
                    window.location.href = '/';
                    setLoadingDropAccount(false);
                }
            })
            .catch(function (error) {
                setErrorDropAccount('Um erro aconteceu, mas só Deus sabe qual.');
                setLoadingDropAccount(false);
            });
    }

    return (
        <div className="account">
            <HeaderContents title={'Minha Conta'}/>
            <div className="account-content container">
                <section id='my-data'>
                    <h2>Meus dados</h2>
                    <MyData/>
                </section>
            
                <section id='my-orders'>
                    <h2>Meus pedidos</h2>
                    <MyOrders />
                </section>

                <section id='cart'>
                    <h2>Meu carrinho</h2>
                    <p className='totalValue'>Total: {totalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                    <CartList setTotalValue={setTotalValue}/>
                    <a className='fancy-border-radius show-more' href="/carrinho">Ver mais</a>
                </section>

                <section id="alter-pass">
                    <h2>Alterar senha</h2>
                    {loadingAlterPass ? <Loading/> : (
                        <>
                            {errorAlterPass ? <p className='alert alert-danger' role='alert'>{errorAlterPass}</p> : null}
                            {successAlterPass ? <p className='alert alert-success' role='alert'>{successAlterPass}</p> : null}
                        <form onSubmit={handleEditPassSubmit}>
                            <label>Senha atual
                                <input required value={alterPassInput.currentPass} onChange={handlePassInput} name='currentPass' type="password" placeholder="Sua senha atual" />
                            </label>
                            <label>Nova senha
                                <input required value={alterPassInput.newPass} onChange={handlePassInput} name='newPass' type="password" placeholder="Nova senha" />
                            </label>
                            <label>Confirmar nova senha
                                <input required value={alterPassInput.confirmPass} onChange={handlePassInput} name='confirmPass' type="password" placeholder="Confirmar nova senha" />
                            </label>
                            <button className="btn" type="submit">Alterar senha</button>
                        </form>
                        </>
                    )}
                </section>

                <section id="delete-account">
                    <h2>Excluir conta</h2>
                    {loadingDropAccount ? <Loading/> : (
                        <>
                        {errorDropAccount ? <p className='alert alert-danger' role='alert'>{errorDropAccount}</p> : null}
                        {successDropAccount ? <p className='alert alert-success' role='alert'>{successDropAccount}</p> : null}
                        <form onSubmit={dropAccountSubmit}>
                            <p className='upper-case text-center'>Cuidado! Essa ação é irreversível!</p>
                            <p className='text-center'>Com isso serão excluídos todos os seus dados e seus pedidos, perdendo inclusive a garantia de suas compras, caso haver algum.</p>
                            <label>Senha atual
                                <input name='confirmPass' onChange={handleDropAccountInput} value={dropAccountInput.confirmPass} type="password" placeholder="Sua senha atual" />
                            </label>
                            <button className="btn" type="submit">Excluir conta</button>
                        </form>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}
export default Account;