import { Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import SushiDetails from './pages/SushiDetails/Details'
import NotFound from './pages/NotFound/NotFound'

import './styles/App.scss'

const App: React.FC = () => {
   return (
      <div className="wrapper">
         <Header />
         <main>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/item/:id" element={<SushiDetails />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
         </main>
      </div>
   )
}

export default App
