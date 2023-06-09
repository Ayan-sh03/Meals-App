import './App.css'
import Favourite from './Components/Favourite'
import Meals from './Components/Meals'
import Search from './Components/Search'
import Modal from './Components/Modal'
import {useGlobalContext} from './Context'

export default function App() {
  const {showModal,favourite} = useGlobalContext()
  return (
    <main>
<Search/>
      {showModal && <Modal/>}
      {favourite.length > 0 && <Favourite/>}
      
      <Meals/>
    </main>
  )
}
