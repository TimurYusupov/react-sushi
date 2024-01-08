import './styles/App.scss'
import { useEffect, useState } from 'react'

import Header from './components/Header/Header'
import SushiCard from './components/SushiCard/SushiCard'
import Categories from './components/Categories/Categories'
import Sort from './components/Sort/Sort'

const App = () => {
   const [allSushi, setAllSushi] = useState([])

   const addSushi = (id) => {
      /* setAllSushi((prev) => {
         return prev.map((item) => {
            if (item.id === id) {
               return { ...item, count: item.count + 1 }
            } else {
               return item
            }
         })
      }) */

      setAllSushi((prev) =>
         prev.map((item) => (item.id === id ? { ...item, count: item.count + 1 } : item))
      )
   }

   useEffect(() => {
      const fetchAllSushi = async () => {
         try {
            const response = await fetch('https://518e0d814bf9a511.mokky.dev/items')
            const sushiData = await response.json()
            setAllSushi(sushiData)
         } catch (err) {
            console.log(err)
         }
      }

      fetchAllSushi()
   }, [])

   return (
      <div className="wrapper">
         <Header />
         <main>
            <div className="container">
               <section className="categories-sort">
                  <Categories />
                  <Sort />
               </section>

               <section className="items">
                  <h1>All:</h1>
                  <div className="sushiItems">
                     {allSushi.map((item) => (
                        <SushiCard addSushi={addSushi} key={item.id} {...item} />
                     ))}
                  </div>
               </section>
            </div>
         </main>
      </div>
   )
}

export default App
