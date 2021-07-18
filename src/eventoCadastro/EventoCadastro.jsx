import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import firebase from '../config/firebase'
import NavBar from '../componentes/NavBar'
import {Link, Redirect} from 'react-router-dom'
import './EventoCadastro.css'
function EventoCadastro(props) {
    const [titulo, setTitulo] = useState()
    const [tipo, setTipo] = useState()
    const [descricao, setDescricao] = useState()
    const [data, setData] = useState()
    const [hora, setHora] = useState()
    const [bannerAtual, setBannerAtual] = useState()
    const [bannerNovo, setBannerNovo] = useState()
    const [carregando, setCarregando] = useState(false)
    const [carregado, setCarregado] = useState(false)

    const storage = firebase.storage()
    const db = firebase.firestore()
    const usuarioEmail = useSelector(state=>state.usuarioEmail)
    function publicarEvento(params) {
        setCarregando(true)
        storage.ref(`imagens/${bannerNovo.name}`).put(bannerNovo).then(sucesso=>{
            db.collection('eventos').add({
                titulo:titulo,
                tipo:tipo,
                descricao:descricao,
                data:data,
                hora:hora,
                usuario:usuarioEmail,
                visualizacoes:0,
                banner:bannerNovo.name,
                publico:true,
                criacao:new Date()
            })
            setCarregando(false)
            setCarregado(true)
            
        }).catch(erro=>{
            setCarregando(false)
            alert('Não foi possível publicar o evento.')
        })
    
    }
    function atualizarEvento(params) {
        setCarregando(true)
        storage.ref(`imagens/${bannerNovo.name}`).put(bannerNovo)
            db.collection('eventos').doc(props.match.params.parametro).update({
                titulo:titulo,
                tipo:tipo,
                descricao:descricao,
                data:data,
                hora:hora,
                banner:bannerNovo?bannerNovo.name: bannerAtual
                
            })
            setCarregando(false)
            setCarregado(true)
        }
    useEffect(() => {
    
        if (props.match.params.parametro) {
            
        
        firebase.firestore().collection('eventos').doc(props.match.params.parametro).get().then(resultado=>{
        
         setTitulo(resultado.data().titulo)
         setTipo(resultado.data().tipo)
         setDescricao(resultado.data().descricao)
         setData(resultado.data().data)
         setHora(resultado.data().hora)
         setBannerAtual(resultado.data().banner)
          
        
        
        }) 
    }
 },[carregando])
    return (
        <>
        {carregado == true? <Redirect to="/"/> : null}
        <NavBar></NavBar>
        <div className='cadastrar-evento'>
            <h1 className="titulo-evento">{props.match.params.parametro? 'Editar Evento':'Novo Evento'}</h1>
            <div className="cadastro">
                <label htmlFor="">Título do evento:</label>
                <input type="text" onChange={(e)=> setTitulo(e.target.value)} value={titulo && titulo} className="tituloEvento mt-1"/>
                <label className="mt-3" htmlFor="">Tipo do evento:</label>
                <select className="mt-1" onChange={(e)=> setTipo(e.target.value)} value={tipo && tipo} name="" id="">
                    <option value="" selected disabled >-- Selecione um tipo --</option>
                    <option value="aniversario">Aniversário</option>
                    <option value="show">Show</option>
                    <option value="apresentacao">Apresentação</option>
                    <option value="campeonato">Campeonato</option>
                    <option value="desfile">Desfile</option>
                    <option value="festa">Festa</option>
                    <option value="reuniao">Reunião</option>
                    <option value="revoada">Revoada</option>
                </select>
                <div className="descricao-evento mt-3">
                    <label className="mb-1" htmlFor="">Descrição do evento:</label>
                    <textarea onChange={(e)=> setDescricao(e.target.value)} value={descricao && descricao} name="" id="" cols="30" rows="7"></textarea>
                </div>
                <div className="data-evento mt-3">
                    <div>
                    <label htmlFor="" className="mb-1">Data:</label>
                    <input onChange={(e)=> setData(e.target.value)} value={data && data} type="date" name="data" id=""/>
                    </div>
                    <div>
                    <label htmlFor="" className="mb-1">Hora:</label>
                    <input onChange={(e)=> setHora(e.target.value)} value={hora && hora} type="time" name="data" id=""/>
                    </div>
                     
                </div>
                <div className="arquivo-evento">
                     <label htmlFor="" className="mb-1">Banner do evento:</label>
                     <input onChange={(e)=> setBannerNovo(e.target.files[0])} type="file"/>
                </div>
                {
                    carregando==true? <div class="spinner-border text-dark carregando" role="status"> <span class="visually-hidden margin">Loading...</span></div>
                    :
                    <button onClick={props.match.params.parametro? atualizarEvento:publicarEvento} className="btn-publicar">{props.match.params.parametro? 'Editar Evento':'Publicar Evento'}</button>
                }
                 
            </div>
             
            
        </div>
        </>
         
    )
}

export default EventoCadastro
