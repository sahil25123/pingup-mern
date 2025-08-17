
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Discover from './pages/Discover'
import Connections from './pages/Connections'

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path='/feed' element ={<Feed/>}/>
      <Route path="/discover" element={<Discover/>}/>
      <Route path='/feed' element ={<Feed/>}/>
      <Route path="/messages/:userId" element={<Login/>}/>
      <Route path='/connections' element ={<Connections/>}/>

    </Routes>
      
    </>
  )
}

export default App
