import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cadastro } from './pages/Cadastro';
import { CadastroConsulta } from './pages/CadastroConsulta';
import { CadastroCirurgia } from './pages/CadastroCirurgia';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Home />}/>
        <Route path='/cadastro' element={<Cadastro />}/>
        <Route path='/cadastroconsulta' element={<CadastroConsulta />}/>
        <Route path='/cadastrocirurgia' element={<CadastroCirurgia />}/>
      </Routes>
    </BrowserRouter>
  )
}

