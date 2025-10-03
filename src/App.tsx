import './App.scss'
import Login from '../components/login.tsx'
import Quotes from '../components/quotes.tsx'
import '../backend/data/quotes.json'
import { useState, useEffect } from 'react'
import Signup from '../components/Signup.tsx'
import { useNavigate } from 'react-router-dom'
import SaveQuote from '../components/saveQuote.tsx'

function App() {
  const [user, setUser] = useState<{username: string} | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <header>
        <div className='nav'>
          <span className='title'>Quote of the Day</span>
          <div className='buttons'>
            {user ? (
              <>
                <span className='welcome'>Welcome, {user.username} 👋</span>
                <button className='logout' onClick={handleLogout}>Logout</button>
                <button className='profile' onClick={() => navigate('/profile')}>Profile</button>
              </>
            ) : (
              <>
                <Login />
                <Signup />
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        <div className='main-content'>
          <Quotes />
        </div>
      </main>
    </>
  )
}

export default App
