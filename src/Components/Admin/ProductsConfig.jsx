import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Loading from '../Loading';
import EditingProduct from './EditingProduct';

function ProductsConfig() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [addingProduct, setAddingProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        category: '',
    });
    const [reflash, setReflash] = useState(false);
    const [errorAdd, setErrorAdd] = useState(false);
    const [errorEdit, setErrorEdit] = useState(false);
    const [successAdd, setSuccessAdd] = useState(false);
    const [successEdit, setSuccessEdit] = useState(false);

    if (reflash) {
        setReflash(false);
        setLoading(true);
        window.location.reload();
    }

    function editProduct(id) {
        setEditing(id);
    }
    function dropProduct(id) {
        setErrorEdit(false);
        setSuccessEdit(false);
        setLoading(true);
        axios.post('http://'+window.location.hostname+'/api/admin/dropProduct.php', {
            user_id: sessionStorage.getItem('user_id'),
            product_id: id
        })
        .then(function (response) {
            let result = response.data;
            if (result.error) {
                setErrorEdit(result.error);
                setLoading(false);
            } else {
                setSuccessEdit(result.success);
                    axios.post('http://'+window.location.hostname+'/api/products.php')
                        .then(function (response) {
                            let result = response.data;
                            if (result.error) {
                                setErrorEdit(result.error);
                                setLoading(false);
                            } else {
                                setProducts(result);
                                setLoading(false);
                            }
                        })
                        .catch(function (error) {
                            setErrorEdit('Um erro aconteceu, mas só Deus sabe qual. Tente recarregar a página.');
                            setLoading(false);
                        });
            }
        })
        .catch(function (error) {
            setErrorAdd('Um erro aconteceu, mas só Deus sabe qual. Tente recarregar a página.');
            setLoading(false);
        })
    }
    function handleAddProduct(e) {
        setAddingProduct({
            ...addingProduct,
            [e.target.name]: e.target.value
        });
    }
    function addProduct(e) {
        e.preventDefault();
        setLoading(true);
        setErrorAdd(false);
        setSuccessAdd(false);
        axios.post('http://'+window.location.hostname+'/api/admin/addProduct.php', {
            user_id: sessionStorage.getItem('user_id'),
            name: addingProduct.name,
            price: addingProduct.price,
            category: addingProduct.category,
            description: addingProduct.description,
            image: addingProduct.image
        })
        .then(function (response) {
            let result = response.data;
            if (result.error) {
                setErrorAdd(result.error);
                setLoading(false);
            } else {
                setSuccessAdd(result.success);
                setLoading(false);
            }
        })
        .catch(function (error) {
            setErrorAdd('Um erro aconteceu, mas só Deus sabe qual. Tente recarregar a página.');
            setLoading(false);
        })
    }

    useEffect(() => {
        setLoading(true);
        setProducts();

        axios.post('http://'+window.location.hostname+'/api/products.php')
        .then(function (response) {
            let result = response.data;
            if (result.error) {
                setErrorEdit(result.error);
                setLoading(false);
            } else {
                setProducts(result);
                setLoading(false);
            }
        })
        .catch(function (error) {
            setErrorEdit('Um erro aconteceu, mas só Deus sabe qual. Tente recarregar a página.');
            setLoading(false);
        });
    }, []);
    function closeButton(state) {
        if ('errorAdd') setErrorAdd(null);
        if ('successAdd') setSuccessAdd(null);
        if ('errorEdit') setErrorEdit(null);
        if ('successEdit') setSuccessEdit(null);
    }

    if (loading) return <Loading />;

    if (editing !== false) {
        return <EditingProduct setEditing={setEditing} editing={editing} setReflash={setReflash}/>;
    }
    return (
        <div className="productsadmin">
            <section id="addproduct">
                <h3>Adicionar Produto</h3>
                    {errorAdd && <div className="alert alert-danger" role="alert">{errorAdd} <button onClick={() => closeButton('errorAdd')} className="button-close-alert no-style"><i className="fa-solid fa-xmark"></i></button></div>}
                    {successAdd && <div className="alert alert-success" role="alert">{successAdd} <button onClick={() => closeButton('successAdd')} className="button-close-alert no-style"><i className="fa-solid fa-xmark"></i></button></div>}
                    <form onSubmit={e => addProduct(e)} className=''>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Nome:
                                <input onChange={handleAddProduct} value={addingProduct.name} maxLength="50" type="text" name="name" placeholder='Nome do produto'/>
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Preço:
                                <input onChange={handleAddProduct} value={addingProduct.price} type="number" name="price" max="200" min="0" step=".5" placeholder='Use valores decimais. ex: 8.50' />
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Categoria:
                                <select onChange={handleAddProduct} value={addingProduct.category} name="category">
                                    <option value="premium">Premium</option>
                                    <option value="game">Jogo</option>
                                    <option value="streaming">Streaming</option>
                                    <option value="vpn">VPN</option>
                                    <option value="adultos">Adultos</option>
                                </select>
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Descrição:
                                <input onChange={handleAddProduct} value={addingProduct.description} maxLength="100" name="description" placeholder='Digite o que pode ser alterado na conta'/>
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Imagem:
                                <input onChange={handleAddProduct} value={addingProduct.image} maxLength="500" type="url" name="image" placeholder='URL da imagem'/>
                            </label>
                            </div>
                        </div>
                        <button className='btn' type="submit">Adicionar</button>
                    </form>
            </section>
            <section id="manipulateproducts">
                <h3>Lista de produtos</h3>
                {errorEdit && <div className="alert alert-danger" role="alert">{errorEdit} <button onClick={() => closeButton('errorEdit')} className="button-close-alert no-style"><i className="fa-solid fa-xmark"></i></button></div>}
                {successEdit && <div className="alert alert-success" role="alert">{successEdit} <button onClick={() => closeButton('successEdit')} className="button-close-alert no-style"><i className="fa-solid fa-xmark"></i></button></div>}
                <div className="table-container">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Categoria</th>
                                <th>Descrição</th>
                                <th>Imagem</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.product_id}>
                                    <td>{product.name}</td>
                                    <td>{parseFloat(product.price).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                                    <td>{product.category}</td>
                                    <td>{product.description}</td>
                                    <td><img src={product.image} alt="imagem do produto" /></td>
                                    <td className='actions'><button onClick={() => editProduct(product)} className="button-table edit"><i className="fa-solid fa-pen"></i></button> <button onClick={() => dropProduct(product.product_id)} className="button-table delete"><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
export default ProductsConfig;