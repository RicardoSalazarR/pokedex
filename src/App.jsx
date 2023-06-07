import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import Pokemons from './components/Pokemons'
import InputName from './components/InputName'
import PokemonDetail from './components/PokemonDetail'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {


  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<InputName />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/pokemons' element={<Pokemons />} />
            <Route path='/pokemons/:id' element={<PokemonDetail />} />
          </Route>

        </Routes>

      </HashRouter>


    </div>
  )
}

export default App
