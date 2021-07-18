import React, {useState} from 'react'
import './login.css'
import firebase from '../config/firebase'
import 'firebase/auth'
import {Link, Redirect} from 'react-router-dom'
import NavBar from '../componentes/NavBar'
import { useSelector,useDispatch } from "react-redux";
function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')

    const dispatch = useDispatch()

    function logar(params) {
        firebase.auth().signInWithEmailAndPassword(email,senha).then(resultado=>{
                dispatch({type:'LOG_IN',usuarioEmail:email})
        }).catch(erro=>{
            setMensagem('Ops! Verifique se seu email ou senha estão corretos.')
        })

         
    }
    console.log(useSelector(state => state.usuarioEmail))
    return (
        <>
        {
             useSelector(state => state.usuarioLogado ==true? <Redirect to="/" />: null)
        }
        <div className="login">
            <i class="fas fa-glass-cheers  fa-5x"></i>
            <h1>Login</h1> 
            <form className="formulario" action="">
                <input onChange={e=> setEmail(e.target.value)} type="email" name="" id="inputEmail" placeholder="seu email"/>
                <input onChange={e=> setSenha(e.target.value)} type="password" name="" id="inputPassword" placeholder="sua senha" />
                <button onClick={logar} type="button">Entrar</button>

                <div className="alerta-mensagem">
                    <span>{mensagem}</span>
                </div>

                <div className="opcoes-login">
                <Link to="/recuperarSenha">Recuperar senha</Link>
                <Link to="/cadastro">Quero me cadastrar</Link>
                </div>
            </form>
        </div>
        </>

         
    )
}

export default Login
