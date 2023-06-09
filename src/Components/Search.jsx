import {useState} from 'react'
import { useGlobalContext } from '../Context'

const search =()=>{
  const [text,setText] = useState('')
  const {setSearchTerm,fetchRandomMeal} = useGlobalContext();

  const handleChange = (e) =>{
    setText(e.target.value)
  }

  const handleRandomMeals = () =>{
    setSearchTerm('')
       fetchRandomMeal()
  }
  const handleSubmit = (e)=>{
    
    e.preventDefault();
    if(text){
      setSearchTerm(text);
     
    }
  }
  return <header className="search-container" >
    <form onSubmit={handleSubmit} >
      <input type="text" placeholder='type favourite meal' className='form-input'  value={text} onChange={handleChange} />
      <button type="submit" className="btn" >search</button>
      <button type="button" className="btn btn-hipster" onClick={handleRandomMeals} >Surprise Me</button>
    </form>
  </header>
}

export default search