import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/header/header';
import Login from './pages/login/login';
import Signup from "./pages/signup/signup"
import Home from "./pages/home/home"
import CategoryPage from './pages/category/category';
import CartPage from './pages/cart/cart';

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/category/:category' element={<CategoryPage />} />
         {/* 
        <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
        
       
        <Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
					/>
					
					
					<Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />}
					/>

					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
        */}
        
      </Routes>

    </div>
  )
}

export default App
