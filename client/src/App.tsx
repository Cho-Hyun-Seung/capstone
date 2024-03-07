import './css/App.css'
import About from './pages/About'
import Counter from './pages/Counter'
import Home from './pages/Home'
import { Link, Routes, Route } from 'react-router-dom'
import Input from './pages/Input'
import Input2 from './pages/Input2'
import List from './pages/List'
import MainNavbar from './components/MainNavbar'

function App() {
  return (
    <div className='App'>
      <MainNavbar />
      <nav>
        <Link to={'/'}> Home</Link>
        <Link to={'/about'}> About</Link>
        <Link to={'/counter'}> Counter</Link>
        <Link to={'/input'}> Input</Link>
        <Link to={'/input2'}> Input2</Link>
        <Link to={'/list'}> List</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/counter' element={<Counter />} />
        <Route path='/input' element={<Input />} />
        <Route path='/input2' element={<Input2 />} />
        <Route path='/list' element={<List />} />
      </Routes>
    </div>
  )
}

export default App
