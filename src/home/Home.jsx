import React,{useState,useEffect} from 'react'
import './home.css'
import {Link} from 'react-router-dom'
import NavBar from '../componentes/NavBar'
import { useSelector } from "react-redux";
import EventoCard from '../componentes/EventoCard';
import firebase from '../config/firebase'
function Home({match}) {
    const [eventos, setEventos] = useState([])
    const [pesquisa, setPesquisa] = useState('')
    let listaEventos =[]
    const usuario = useSelector(state => state.usuarioEmail)
    useEffect(() => {
        if(match.params.parametro){
            firebase.firestore().collection('eventos').where('usuario','==',usuario).get().then(async(sucesso)=>{
            
                await sucesso.docs.forEach(doc=>{
                    if (doc.data().titulo.indexOf(pesquisa) >= 0) {
                        listaEventos.push({
                            id:doc.id,
                            ...doc.data()
                        })
                    }
                })
                setEventos(listaEventos)
            }).catch(erro=>{
    
            })
        }else{
        firebase.firestore().collection('eventos').get().then(async(sucesso)=>{
            
            await sucesso.docs.forEach(doc=>{
                if (doc.data().titulo.indexOf(pesquisa) >= 0) {
                    listaEventos.push({
                        id:doc.id,
                        ...doc.data()
                    })
                }
            })
            setEventos(listaEventos)
        }).catch(erro=>{
            alert(erro)
        })
    }
    })
    
    return (
        <div className="Home">
              <NavBar></NavBar>
              <div className="row m-5">
                  <h1 className="text-center mb-4">Eventos</h1>
                    <input className="text-center py-1" onChange={e=> setPesquisa(e.target.value)}  placeholder="Pesquisar evento pelo título..." type="text"/>
              </div>
            <div className="eventos mt-3"> 
              {eventos.map(item=> <EventoCard key={item.id} id={item.id} banner={item.banner} titulo={item.titulo} visualizacoes={item.visualizacoes}  descricao={item.descricao}></EventoCard> )}
            </div>
        </div>
    )
}
export default Home
