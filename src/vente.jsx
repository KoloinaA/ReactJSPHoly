import { useState, useEffect, React } from 'react'
import axios from 'axios'
import edit from './edit.png'
import poubelle from './poubelle.png'
import ajout from './ajout.png'
import exit from './exit.png'
import produit from './produit.png'
import './vente.css'
import BarChart from './barChart'
import DonutChart from './donutChart'

function FormVenteAdd({ close }) {
    const [input, setInput] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        const headers = {
            'Content-Type': 'application/json' // Adjust based on your data format
          };
      
          const config = {
            headers,
            'X-Requested-With': 'XMLHttpRequest' // Optional CORS hint
          };

        axios.put('http://localhost:8080/VenteFarany/VenteServlet', input, config)
      .then(response=> {
        console.log(response)
        window.location.reload();
      } )
      .catch(error => {
        console.log(error)
      } )
    }

    const handleChange = (e) => {
        
        let object = {...input}
        object[e.target.name] = e.target.value 
        setInput(object)
    }
    // console.log(input)

    return (
        <>
            <div id='bg' >
                <div id='block'>
                    <div id='box-form'>
                        <div id='titre'>
                            <img src={produit} alt="produit" />
                        </div>
                        <p>Ajouter un nouveau</p>
                        <div id='input-group'>
                            <form action="" onSubmit={(e) => handleSubmit(e)}>
                                {/* <div id='input'>
                                    <input type="text" value={input.numProduit} onChange={(e) => handleChange(e)} placeholder='Numéro' name='numProduit' /><br />
                                </div> */}
                                <div id='input'>
                                    <input type="text" value={input.design} onChange={(e) => handleChange(e)} placeholder='Désignation' name='design' /><br />
                                </div>
                                <div id='input' className='input'>
                                    <input type="number" value={input.prix} onChange={(e) => handleChange(e)} placeholder='Prix' name='prix' style={{ marginRight: '10px' }} />
                                    <input type="number" value={input.quantite} onChange={(e) => handleChange(e)} placeholder='Quantité' name='quantite' /><br />
                                </div>

                                <input type="submit" value="Ajouter" />
                            </form>
                        </div>
                    </div>
                    <img src={exit} alt="exit" width="25px" height="25px" onClick={close} />
                </div>
            </div>
        </>
    )
}

function FormVenteEdit({ close, data, fermer }) {
    const [dataEdit, setDataEdit] = useState({})
    const [input, setInput] = useState({})
    

    const setData = () => {
        const num = document.getElementById('numProduit')
        const design = document.getElementById('design')
        const prix = document.getElementById('prix')
        const quantite = document.getElementById('quantite')

        num.value = data.numProduit
        design.value = data.design
        prix.value = data.prix
        quantite.value = data.quantite
    }

    useEffect(() => {
        setData()
    })

    const handleSubmit = (e) => {
        const headers = {
            'Content-Type': 'application/json' // Adjust based on your data format
          };
      
          const config = {
            headers,
            'X-Requested-With': 'XMLHttpRequest' // Optional CORS hint
          };

        axios.put('http://localhost:8080/VenteFarany/VenteServlet', headers, config)
      .then(response=> {
        console.log(response)
        window.location.reload();
      } )
      .catch(error => {
        console.log(error)
      } )
    }

    const handleChange = (e) => {
        let object = input
        object[e.target.name] = e.target.value 
        setInput(object)
    }

    // console.log(input)

    return (
        <>
            <div id='bg' style={{display: !close ? 'none' : 'block'}}>
                <div id='block'>
                    <div id='box-form'>
                        <div id='titre'>
                            <img src={produit} alt="produit" />
                        </div>
                        <p>Modifier un produit</p>
                        <div id='input-group'>
                            <form action="">
                                <div id='input'>
                                    <input type="hidden" value={input.numProduit} name='numProduit' id='numProduit' />
                                    <input type="text" value={input.design} onChange={(e) => handleChange(e)} placeholder='Désignation' name='design' id='design' /><br />
                                </div>
                                <div id='input' className='input'>
                                    <input type="number" value={input.prix} onChange={(e) => handleChange(e)} placeholder='Prix' name='prix' id='prix' style={{ marginRight: '10px' }} />
                                    <input type="number" value={input.quantite} onChange={(e) => handleChange(e)} placeholder='Quantité' name='quantite' id='quantite' /><br />
                                </div>

                                <input type="submit" value="Modifier" />
                            </form>
                        </div>
                    </div>
                    <img src={exit} alt="exit" width="25px" height="25px" onClick={fermer} />
                </div>
            </div>
        </>
    )
}


export default function Vente(props) {
    const [add, setAdd] = useState(false)
    const [edite, setEdite] = useState(false)
    const [data, setData] = useState({})
    const [vente, setVente] = useState({})
    const [barData, setBarData] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8080/VenteFarany/VenteServlet')
            .then(response => {
                setVente(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [vente])

    useEffect(() => {
        axios.get('http://localhost:8080/VenteFarany/VenteServ')
          .then(response => {
            console.log(response);
    
            const newBarData = [
              response.data.minPrix,
              response.data.maxPrix,
              response.data.montantTotal,
            ];
    
            setBarData(newBarData);
          })
          .catch(error => {
            console.log(error);
            // setErrorMessage('Error retrieving data');
          });
    })

    const ventes = Object.entries(vente).map(([key, value]) => ({ index: key, ...value, }));

    const editData = (num, design, prix, quantite) => {
        setEdite(true);
        let object = data;
        object.numProduit = num
        object.design = design
        object.prix = prix
        object.quantite = quantite
        setData(object)
    }

    const deleteData = (numProduit) => {
        axios.delete(`http://localhost:8080/VenteFarany/VenteServlet?numProduit=${numProduit}`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const edition = () => {
        if(edite){
            return(<FormVenteEdit fermer={() => setEdite(false)} close={edite} data={data} />)
        }else {return}
    }
    // console.log(barData[0])

    return (
        <>
            <div id='body'>
                <div id='header'>
                    <p>Gestion de produit</p>

                </div>

                <div id='container'>
                    <div id='leftside'>
                        <div id='entete'>
                            {/* <p>20 produits touvés</p> */}
                            <button>
                                <img src={ajout} alt='ajout' width="20px" height='20px' />
                                <p onClick={() => setAdd(true)} style={{ marginLeft: '5px' }}>Ajouter un nouveau</p>
                            </button>
                        </div>

                        <div id='tableau'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Numéro</th>
                                        <th>Désignation</th>
                                        <th>Prix</th>
                                        <th>Quanité</th>
                                        <th>Montant</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        ventes.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.numProduit}</td>
                                                <td>{item.design}</td>
                                                <td>{item.prix}</td>
                                                <td>{item.quantite}</td>
                                                <td>{item.prix * item.quantite}</td>
                                                <td>
                                                    <button onClick={() => editData(item.numProduit, item.design , item.prix, item.quantite)} style={{ marginRight: "15%" }}><img src={edit} alt="edit" /></button>
                                                    <button onClick={() => deleteData(item.numProduit)}><img src={poubelle} alt="delete" /></button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div id='rightside'>
                        <div id='prix'>
                            <div id='box-prix'>
                                <p>Prix minimal</p>
                                <p>{barData[0]}</p>
                            </div>
                            <div id='box-prix'>
                                <p>Prix maximal</p>
                                <p>{barData[1]}</p>
                            </div>
                            <div id='box-prix'>
                                <p>Montant total</p>
                                <p>{barData[2]}</p>
                            </div>
                        </div>

                        <div id='graphe'>
                            <div id='box-graphe'>
                                <DonutChart min={barData[0]} max={barData[1]} total={barData[2]} />
                            </div>

                            {/* <div id='box-graphe'>
                                <DonutChart />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {edition()}
            {add && <FormVenteAdd close={() => setAdd(false)} />}
            
        </>
    )
}