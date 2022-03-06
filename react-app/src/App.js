import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Edit from './pages/Edit'
import './App.css'
function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Home} />
      <Route path="/add" exact component={Add} />
      <Route path="/edit/:userId" exact component={Edit} />
    </div>
  )
}

export default App
