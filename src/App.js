import React from 'react'
import './App.css';
import {BrowserRouter, Route}  from 'react-router-dom'
import {store,persistor} from "./store/store";
import {Provider} from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Login from './login/Login'
import Cadastro from './cadastro/Cadastro'
import Home from './home/Home'
import RecuperarSenha from "./recuperarSenha/RecuperarSenha";
import EventoCadastro from './eventoCadastro/EventoCadastro'
import EventoDetalhes from './eventos-detalhes/EventoDetalhes'
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Route exact path='/login' component={Login}></Route>
          <Route exact path='/cadastro' component={Cadastro}></Route>
          <Route exact path='/recuperarsenha' component={RecuperarSenha}></Route>
          <Route exact path='/' component={Home}></Route>
          <Route  path='/eventos/:parametro' component={Home}></Route>
          <Route exact path='/cadastrarevento' component={EventoCadastro}></Route>
          <Route path='/eventodetalhes/:parametro' component={EventoDetalhes}></Route>
          <Route path='/editarevento/:parametro' component={EventoCadastro}></Route>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
