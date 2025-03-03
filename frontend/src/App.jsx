import React , {useContext,useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import {Home} from './pages/Home'
import { Navbar } from './components/Navbar'
import { CarList } from './pages/CarList'
import { CarDetail } from './pages/CarDetail'
import { SearchBar } from './components/SearchBar'

export const App = () => {

  return (
    <div className='px-4 sm:px-4 md:px-6 lg:px-8'>

      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cars' element={<CarList />} />
        <Route path='/car/:CarId' element={<CarDetail />} />
      </Routes>
    </div>
  )
}