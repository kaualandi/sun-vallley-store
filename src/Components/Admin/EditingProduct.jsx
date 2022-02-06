import axios from "axios";
import React, {useState} from "react";
import Loading from "../Loading";

function EditingProduct({editing, setEditing, setReflash}) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    function saveEditProduct(e) {
        e.preventDefault();
        setLoading(true);
        axios.post('http://'+window.location.hostname+'/api/admin/editProduct.php', {
            user_id: sessionStorage.getItem('user_id'),
            product_id: editing.product_id,
            name: editing.name,
            price: editing.price,
            category: editing.category,
            description: editing.description,
            image: editing.image
        })
        .then(function (response) {
            let result = response.data;
            if (result.error) {
                setError(result.error);
                setLoading(false);
            } else {
                setReflash(true);
                setEditing(false);
                setLoading(false);
            }
        })
        .catch(function (error) {
            setError('Um erro aconteceu, mas só Deus sabe qual. Tente recarregar a página.');
            setLoading(false);
        });
    }
    function backNoSave() {
        setReflash(true);
        setEditing(false);
    }
    function handleChange(e) {
        setEditing({
            ...editing,
            [e.target.name]: e.target.value
        });
    }
    if (loading) {
        return <Loading />
    }
    return (
        <section id="editproduct">
            <h3>Editando Produto</h3>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form onSubmit={e => saveEditProduct(e)} className=''>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                    <label>Nome:
                        <input onChange={handleChange} value={editing.name} maxLength="50" type="text" name="name" placeholder='Nome do produto'/>
                    </label>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                    <label>Preço:
                        <input onChange={handleChange} type="number" value={editing.price} max="200" min="0" step=".5" name="price" placeholder='Use valores decimais. ex: 8.50' />
                    </label>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                    <label>Categoria:
                        <select value={editing.category} onChange={handleChange} name="category">
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
                        <input value={editing.description} onChange={handleChange} name="description" maxLength="100" placeholder='Digite o que pode ser alterado na conta'/>
                    </label>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                    <label>Imagem:
                        <input value={editing.image} onChange={handleChange} maxLength="500" type="url" name="image" placeholder='URL da imagem'/>
                    </label>
                    </div>
                </div>
                <div className="d-flex">
                    <button className='btn' type="submit">Salvar e sair</button>
                    <button className='btn' type="button" onClick={backNoSave}>Sair sem salvar</button>
                </div>
            </form>
        </section>
    );
}
export default EditingProduct;