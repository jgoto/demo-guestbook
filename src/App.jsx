import './App.css'
import Guestbook from './pages/Guestbook'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Wordcloud from './pages/Wordcloud'
import {AuthProvider} from './hooks/AuthContext'
import { PostProvider } from './hooks/PostContext'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

function App() {
  
  return (
    <AuthProvider>
    <PostProvider>
    <BrowserRouter>
    <main>
      <Routes>
        <Route path='/' element={<Guestbook />} />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/contact' element = {<Contact />} />
        <Route path = '/wordcloud' element = {<Wordcloud />} />
      </Routes>
    </main>        
    </BrowserRouter>
    </PostProvider>
    </AuthProvider>
  )
}

export default App
