import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import './styles/mediaGlobal.css'
import './styles/reset.css';
import './styles/fonts.css'

import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Autorisation from './pages/Autorisation';
import Main from './pages/Main';
import Result from './pages/Result';
import Search from './pages/Search';

const App: React.FC = () =>  {

  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/autorisation' element={<Autorisation/>} />
          <Route path='/search' element={<Search/>}/>
          <Route path='/result' element={<Result/>} />
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App;