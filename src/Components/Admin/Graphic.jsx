import React, { useState, useEffect } from 'react';
import Loading from '../Loading';

function Graphic({allOrders}) {
    const [expenseData, setExpenseData] = useState([]);
    const [totalGainValue, setTotalGainValue] = useState(0);
    const [addingExpense, setAddingExpense] = useState(0);
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    function handleAddExpenseInput(e) {
        setAddingExpense({
            ...addingExpense,
            [e.target.name]: e.target.value
        });
    }
    function addingExpenseSubmit(e) {
        e.preventDefault();
        console.log(`Adicionando despesa...`);
    }

    useEffect(() => {
        setLoading(true);
        setAddingExpense(
            {
                value: '',
                details: '',
            }
        );
        const allClosedOrders = [
            {
                id: 0,
                date: '01/01/2021',
                client: 'João da Silva',
                emailClient: 'demo@host.com',
                details: 'Spotify, Minecraft, LOL',
                total: 20,
                status: 'fechado',
            },
            {
                id: 1,
                date: '01/01/2022',
                client: 'João da Silva',
                emailClient: 'demo@host.com',
                details: 'Spotify, Minecraft, LOL',
                total: 20,
                status: 'fechado',
            },
        ];
        setExpenseData([
            {
                id: 0,
                expense: 0.5,
                details: 'Spotify',
            },
            {
                id: 1,
                expense: 0.2,
                details: 'Disney+',
            },
            {
                id: 2,
                expense: 0.2,
                details: 'Disney+',
            },
            {
                id: 3,
                expense: 0.2,
                details: 'Disney+',
            },
            {
                id: 4,
                expense: 0.7,
                details: 'Minecraft',
            },
            {
                id: 5,
                expense: 0.7,
                details: 'Minecraft',
            },
            {
                id: 5,
                expense: 0.5,
                details: 'Spotify',
            },
        ]);
        // fetch('/api/orders')
        //     .then(res => res.json())
        //     .then(data => {
        //         setChartData(data);
        //     })
        //     .catch(err => {
        //         setError(err);
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });
        // fetch(`/api/orders?filter=${filter}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setOrders(data);
        //         setLoading(false);
        //     })
        //     .catch(err => {
        //         // setError(err);
        //         setLoading(false);
        //     });
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        
        defineTotalGainValue();
        function defineTotalGainValue() {
            setTotalGainValue(
                allClosedOrders.reduce((acc, cur) => {
                    return acc + cur.total;
                }, 0) - expenseData.reduce((acc, cur) => {
                    return acc + cur.expense;
                }, 0)
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (loading) return (<Loading />);
    
    return (
        <div className="expense">
            <section className="expense-overview">
                <div id="expense-overview-content" className={totalGainValue < 0 ? 'red' : 'green'}>
                    <p className='value'>{totalGainValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>

                    <p className='state'>{totalGainValue < 0 ? 'prejuízo' : 'lucro'}</p>
                </div>
            </section>
            <section className="expense-details">
                <h3>Adicionar despesa</h3>
                <div id="expense-details-content">
                    <form onSubmit={addingExpenseSubmit}>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-4">
                                <label>Valor
                                    <input onChange={handleAddExpenseInput} required type="text" value={addingExpense.value} name="value" placeholder='Utilize valores decimais. ex: 8.5'/>
                                </label>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                                <label>Detalhes
                                    <input onChange={handleAddExpenseInput} required type="text" value={addingExpense.details} name="details" placeholder='Ex: Netflix, Netflix, Netflix'/>
                                </label>
                            </div>
                        </div>
                        <button className='btn' type="submit">Adicionar</button>
                    </form>
                </div>
            </section>
        </div>
    );
}
export default Graphic;