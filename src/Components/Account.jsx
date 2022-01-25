import HeaderContents from './HeaderContents';
import MyData from './MyData';
import MyOrders from './MyOrders';
import CartList from './CartList';

function Account() {
    return (
        <div className="account">
            <HeaderContents title={'Minha conta'}/>
            <div className="account-content container">
                <section id='my-data'>
                    <h2>Meus dados</h2>
                    <MyData/>
                </section>
            
                <section id='my-orders'>
                    <h2>Meus pedidos</h2>
                    <MyOrders/>
                </section>

                <section id='cart'>
                    <h2>Meu carrinho</h2>
                    <CartList/>
                    <a className={'fancy-border-radius'} href="/carrinho">Ver mais</a>
                </section>

                <section id="alter-pass">
                    <h2>Alterar senha</h2>
                    <form>
                        <label>Senha atual
                            <input type="password" placeholder="Sua senha atual" />
                        </label>
                        <label>Nova senha
                            <input type="password" placeholder="Nova senha" />
                        </label>
                        <label>Confirmar nova senha
                            <input type="password" placeholder="Confirmar nova senha" />
                        </label>
                        <button className="btn" type="submit">Alterar senha</button>
                    </form>
                </section>

                <section id="delete-account">
                    <h2>Excluir conta</h2>
                    <form>
                        <label>Senha atual
                            <input type="password" placeholder="Sua senha atual" />
                        </label>
                        <button className="btn" type="submit">Excluir conta</button>
                    </form>
                </section>
            </div>
        </div>
    );
}
export default Account;