import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-green-50 text-sm'>
      <ToastContainer />
      <div className='min-h-screen pb-60'>
        <Navbar />
        <Manager />
      </div>
      <Footer />
    </div>
  )
}

export default App
