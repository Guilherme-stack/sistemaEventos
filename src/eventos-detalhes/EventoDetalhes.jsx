import React,{useState,useEffect} from 'react'
import firebase from '../config/firebase'
import {Link, Redirect} from 'react-router-dom'
import './EventoDetalhes.css'
import {useSelector} from 'react-redux'
import NavBar from '../componentes/NavBar'
function EventoDetalhes(props) {
    const [evento, setEvento] = useState()
    const [urlImg, setUrlImg] = useState()
    const [page, setPage] = useState(true)
    const logado = useSelector(state => state.usuarioEmail)
    const [carregando, setCarregando] = useState()
    const [removido, setRemovido] = useState(false)
     useEffect(() => {
            if (page) {
                
            
            firebase.firestore().collection('eventos').doc(props.match.params.parametro).get().then(resultado=>{
            setEvento(resultado.data())
            firebase.firestore().collection('eventos').doc(props.match.params.parametro).update('visualizacoes',resultado.data().visualizacoes+1)
            firebase.storage().ref(`imagens/${resultado.data().banner}`).getDownloadURL().then(url=>{
                setUrlImg(url)
                setPage(false)
            })
            
        }).catch(erro=>{
            
        })

        }else{
            firebase.firestore().collection('eventos').doc(props.match.params.parametro).get().then(resultado=>{
                setEvento(resultado.data())
  
                firebase.storage().ref(`imagens/${resultado.data().banner}`).getDownloadURL().then(url=>{
                    setUrlImg(url)
                     
                })
                
            }).catch(erro=>{
                
            })
        }
     },[])
    
     function removerEvento(params) {
        firebase.firestore().collection('eventos').doc(props.match.params.parametro).delete().then(resultado=>{
              setRemovido(true)
        })
     }
      
    return (
        <>
             {!removido?null: <Redirect to="/"></Redirect>}
            <NavBar></NavBar>
            {page ?
            <div>  <div class="spinner-border text-dark mx-auto carregando" role="status"> <span class="visually-hidden margin">Loading...</span></div></div>
            :
            <div >
                <div className="">
                    <img src={urlImg} className="img-banner" alt="Banner"/>
                </div>
                <i class="fas fa-eye   mt-3 visualizacoes mx-1"> {evento.visualizacoes +1}</i>
                <div className="detalhes">
                    <div className="card-info">
                        <i class="fas text-white fa-2x fa-calendar-day"></i>
                        <strong>Data</strong>
                        <span>{!page? evento.data: 
                        <div class="spinner-border text-dark carregando" role="status"> <span class="visually-hidden margin">Loading...</span></div>}</span>
                  </div>
                    <div className="card-info">
                        <i class="fas fa-birthday-cake  text-white fa-2x"></i>
                         <strong>Tipo</strong>
                         <span>   <span>{!page? evento.tipo: 
                        <div class="spinner-border text-dark carregando" role="status"> <span class="visually-hidden margin">Loading...</span></div>}</span>
                 </span>
                    </div>
                    <div className="card-info">
                    <i class="fas fa-clock text-white fa-2x"></i>
                    <strong>Horário</strong>
                    <span>  <span>{!page? evento.hora: 
                        <div class="spinner-border text-dark carregando" role="status"> <span class="visually-hidden margin">Loading...</span></div>}</span>
                 </span>
                    </div>
                </div>
                <div className="box-detalhes">
                    <h5><strong>Detalhes do Evento</strong></h5>
                    <p>  <span>{!page? evento.descricao: 
                        <div class="spinner-border text-dark carregando" role="status"> <span class="visually-hidden margin">Loading...</span></div>}</span>
                 </p>
                </div>
                {
                   logado ==evento.usuario ? <Link to={`/editarevento/${props.match.params.parametro}`}><i class="fas  fa-3x fa-pen-square btn-editar"></i></Link>:null
                }
                {
                   logado ==evento.usuario ? <button onClick={removerEvento} className="btn-remover">Remover Evento</button> :null
                }
                
                 
            </div>
            }
        </>
        
    )
}

export default EventoDetalhes
