import React,{useState} from 'react'
import "./RecuperarSenha.css";
import NavBar from '../componentes/NavBar'
import firebase from '../config/firebase'
import {Link} from 'react-router-dom'
function RecuperarSenha() {
    const [email, setEmail] = useState()
    const [msg, setMsg] = useState()
    function recuperarSenha(params) {
        firebase.auth().sendPasswordResetEmail(email).then(resultado=>{
            setMsg('Enviamos um link no seu email para você redeficir sua senha!')
        }).catch(erro=>{
            setMsg('Verifique se seu email está correto.')
        })
    }
    return (
        <>
        <NavBar></NavBar>
        <div className="form-cadastro " >
            <form action="" className=" form-login mx-auto recuperar-senha  mt-5">
                <h1 className="tituloRecuperar">Recuperar senha</h1>
                <input onChange={e=> setEmail(e.target.value)} type="email" className="form-control" placeholder="seu email"/>
                <div className="msg ">
                    <span>{msg}</span>
                </div>
                <button onClick={recuperarSenha} type="button" className="btn tbn-lg btn-block btn-enviar">Enviar</button>
            </form>
        </div>
        </>
    )
}

export default RecuperarSenha
