import Header from './components/Header/Header'
import Home from './pages/Home/Home'

import './styles/App.scss'

const App = () => {
   return (
      <div className="wrapper">
         <Header />
         <main>
            <Home />
         </main>
      </div>
   )
}

export default App
