import { Route, Routes } from 'react-router-dom'
import {Home} from './pages/Home'
import { Navbar } from './components/Navbar'
import { CarList } from './pages/CarList'
import { CarDetail } from './pages/CarDetail'
import { SearchBar } from './components/SearchBar'
import { LoginSignUp } from './pages/LoginSignUp'
import { ProtectedRoute } from './components/ProtectedRoute';


export const App = () => {

  return (
    <div className='px-4 sm:px-4 md:px-6 lg:px-8'>

      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/cars' element={<ProtectedRoute><CarList /></ProtectedRoute>} />
        <Route path='/car/:CarId' element={<ProtectedRoute><CarDetail /></ProtectedRoute>} />
        
      </Routes>
    </div>
  )
}