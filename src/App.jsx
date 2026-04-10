import './App.css'
import Guestbook from './pages/Guestbook'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Wordcloud from './pages/Wordcloud'
import PasswordChange from './pages/PasswordChange'
import Navigation from './components/layout/Navigation'
import ProtectedRoute from './components/ProtectedRoute'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Providers } from './hooks/Providers'

function App() {
  
  return (
  <BrowserRouter>
    <Providers>
      <AppContent />
    </Providers>
  </BrowserRouter>
  )
}

function AppContent(){
  
  return(
  <main className={"app-container"}>
    <h1>Demo Guestbook</h1>
    <Navigation />
    <Routes>
      <Route path='/' element={<Guestbook />} />
      <Route path = '/profile' element = {<Profile />} />
      <Route path = '/login' element = {<Login />} />
      <Route path = '/contact' element = {<Contact />} />
      <Route path = '/wordcloud' element = {<Wordcloud />} />
      <Route path = '/changepassword' element = {<ProtectedRoute><PasswordChange /></ProtectedRoute>} />
    </Routes>
  </main>        
  )
  
    
}

export default App
