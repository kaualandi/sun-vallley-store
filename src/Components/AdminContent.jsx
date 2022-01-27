import React, {} from 'react';
import Dashboard from './Admin/Dashboard';
import Orders from './Admin/Orders';
import ProductsConfig from './Admin/ProductsConfig';
import UsersConfig from './Admin/UsersConfig';
// import Graphic from './Admin/Graphic';

function AdminContent() {

    return (
        <div className="admin-content">
            <section id="dashboard">
                <Dashboard />
            </section>
            <section id='orders'>
                <h1>Pedidos</h1>
                <Orders/>
            </section>
            <section id='products'>
                <h1>Produtos</h1>
                <ProductsConfig />
            </section>
            <section id='users'>
                <h1>Usuários</h1>
                <UsersConfig />
            </section>
            {/* <section id='expense'>
                <h1>Despesas</h1>
                <Graphic />
            </section> */}
        </div>
    );
}
export default AdminContent;