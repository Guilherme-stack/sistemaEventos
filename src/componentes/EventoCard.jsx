import React,{useState,useEffect} from 'react'
import './EventoCard.css'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import firebase from '../config/firebase'
function EventoCard(props) {
    const [urlImage, setUrlImage] = useState()
    useEffect(() => {
        firebase.storage().ref(`imagens/${props.banner}`).getDownloadURL().then(url=>{
            setUrlImage(url)
        }).catch(erro=>{
            console.log(erro)
        })
    },[urlImage])
    return (
         
        <>
        <div className="evento-card">
             <img className="image-card" src={urlImage} alt=""/>
             <div className="descricao-card"> 
                <h4>{props.titulo}</h4>
                <p>{props.descricao}</p>
                <div className="info">
                    <Link to={"/eventodetalhes/"+props.id}>+ detalhes</Link>
                    <span><i class="fas fa-eye text-dark"></i> {props.visualizacoes}</span>
                </div>
             </div>
        </div>
        </>
    )
}
export default EventoCard
