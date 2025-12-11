import React from 'react'
import Admin from './Admin'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>    
        <Route path="/" element={ <Admin/>}/>
    </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App