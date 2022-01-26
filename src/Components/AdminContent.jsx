import Dashboard from './Admin/Dashboard';
import Orders from './Admin/Orders';
import Products from './Admin/Products';

function AdminContent() {
    return (
        <div className="admin-content">
            <section id="dashboard">
                <Dashboard />
            </section>
            <section id='orders'>
                <h1>Pedidos</h1>
                <Orders />
            </section>
            <section id='products'>
                <h1>Produtos</h1>
                <Products />
            </section>
        </div>
    );
}
export default AdminContent;