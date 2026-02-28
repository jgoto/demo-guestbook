import './App.css'
import Guestbook from './pages/Guestbook'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Wordcloud from './pages/Wordcloud'
import Navigation from './components/layout/Navigation'
import {AuthProvider} from './hooks/AuthContext'
import { PostProvider } from './hooks/PostContext'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { ProfileProvider } from './hooks/ProfileContext'

function App() {
  
  return (
    <AuthProvider>
    <PostProvider>
    <ProfileProvider>
    <BrowserRouter>
    <main>
      <h1>Demo Guestbook</h1>
      <Navigation />
      <Routes>
        <Route path='/' element={<Guestbook />} />
        <Route path = '/profile' element = {<Profile />} />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/contact' element = {<Contact />} />
        <Route path = '/wordcloud' element = {<Wordcloud />} />
      </Routes>
    </main>        
    </BrowserRouter>
    </ProfileProvider>
    </PostProvider>
    </AuthProvider>
  )
}

export default App
