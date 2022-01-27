import React from "react";
import InputMask from 'react-input-mask';
// import Loading from "../Loading";

function EditingUser({editing, setEditing}) {
    // const [loading, setLoading] = useState(false);

    function saveEditUser(e) {
        e.preventDefault();
        console.log(`Salvando usuário...`);
        setEditing(false);
    }
    function handleChange(e) {
        setEditing({
            ...editing,
            [e.target.name]: e.target.value
        });
        console.log(editing);
    }
    return (
        <section id="editproduct">
            <h3>Editando Produto</h3>
            <form onSubmit={e => saveEditUser(e)} className=''>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Nome:
                                <input onChange={handleChange} value={editing.name} type="text" name="name" placeholder='Nome do usuário'/>
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>E-mail:
                                <input onChange={handleChange} type="email" value={editing.email} name="email" placeholder='E-mail aqui.' />
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Telefone:
                                <InputMask name='phone' onChange={handleChange} required value={editing.phone} type="tel" mask="+55 (99) 99999-9999" placeholder='Digite seu celular.' maskChar='_'/>
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Status:
                                <select value={editing.status} onChange={handleChange} name="status">
                                    <option value="1">Ativo</option>
                                    <option value="0">Banido</option>
                                </select>
                            </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                            <label>Poder:
                                <select value={editing.power} onChange={handleChange} name="status">
                                    <option value="0">Usuário</option>
                                    <option value="1">Admin</option>
                                </select>
                            </label>
                            </div>
                        </div>
                        <button className='btn' type="submit">Salvar e sair</button>
                    </form>
        </section>
    );
}
export default EditingUser;