import React,{useState} from 'react'
import firebase from '../config/firebase'
import 'firebase/auth'
import './cadastro.css'
import {Link, Redirect} from 'react-router-dom'
import NavBar from '../componentes/NavBar'
import {useSelector,useDispatch} from 'react-redux'
function Cadastro() {
    const [email , setEmail ] = useState()
    const [senha , setSenha ] = useState()
    const [sucesso , setSucesso ] = useState()
    const [error , setError ] = useState('')
    const [carregando, setCarregando] = useState(false)
    const dispatch = useDispatch()
    function cadastrar(params) {
        setCarregando(true)
        if (!email || !senha) {
            setError('Ops! Você precisa informar o email e senha')
        }
        firebase.auth().createUserWithEmailAndPassword(email,senha).then(resultado=>{
            setCarregando(false)
            setSucesso('Yeah! Você foi cadastrado com sucesso.')
            dispatch({type:'LOG_IN',usuarioEmail:email})
            
        }).catch(erro=>{
            setCarregando(false)
            setSucesso('')
            switch (erro.message) {
                case 'Password should be at least 6 characters':
                    setError('A senha deve ter no mínimo 6 caracteres')
                    break;
                case 'The email address is already in use by another account.':
                    setError('Este email já está sendo utilizado por outro usuário')
                    break;
                case 'The email address is badly formatted.':
                    setError('O formato do email é inválido')
                    break;
                default:
                    setError('Não foi possível cadastrar, tente mais tarde :(')
                    break;
            }
        })
        
    }
    return (
        <>
        {
            sucesso!='Yeah! Você foi cadastrado com sucesso.'? null: <Redirect to='/'/>
        }
        <NavBar></NavBar>
        <div className="form-cadastro">
            <form className="formulario" action="">
                <h3>Zona de cadastro</h3>
                <input placeholder="seu email" onChange={e=>setEmail(e.target.value)} type="email"/>
                <input placeholder="sua senha" onChange={e=>setSenha(e.target.value)} type="password"/>
                 

                {!carregando?<button onClick={cadastrar} type="button">Cadastrar</button>
                :<div class="spinner-border text-light carregando" role="status"> <span class="visually-hidden margin">Loading...</span>     </div>
                 }
                <span className="sucesso">{sucesso}</span>
                <span className="erro">{error}</span>
                <span><Link className="possuir-conta" to="/login">Já sou cadastrado</Link> </span>

                 
            </form>
        </div>
        </>
        
    )
}
export default Cadastro
