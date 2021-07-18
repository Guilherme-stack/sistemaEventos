import React from 'react'
import './NavBar.css'
import {Link} from 'react-router-dom'
import { useSelector,useDispatch } from "react-redux";
function NavBar() {
  const log = useSelector(state => state.usuarioLogado)
  const dispatch = useDispatch()
   
  function deslogar(params) {
     dispatch({type:'LOG_OUT'})
  }
    return (
        <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
  <i class="fas fa-glass-cheers text-white fa-2x"></i>
    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Toggle navigation">
        <i class="fas fa-bars text-white"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active ml-4" aria-current="page" to="/">Home</Link>
        </li>
         
         
          {
            log==true?
            <>
            <li className='nav-item'><Link className="nav-link"  to="/cadastrarevento">Publicar eventos</Link></li>
            <li className='nav-item'><Link className="nav-link"  to="/eventos/meus">Meus eventos</Link></li> 
            <li className='nav-item'><Link className="nav-link" onClick={deslogar} to="/">Sair</Link></li> 
            </>
            :
            
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/cadastro">Cadastrar</Link>
             </li>
             <li className="nav-item">
               <Link className="nav-link" to="/login">Logar</Link>
            </li>
            </>
            
            
          }
           

         
        <li className="nav-item">
          <Link className="nav-link disabled" to="#" tabindex="-1" aria-disabled="true">Disabled</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}

export default NavBar
