import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SetContextProvider from './contexts/setContext.jsx'
import Home from './pages/home/Home.jsx'
import { Login, SignUp } from './components/index.js'
import VerifyEmail from './pages/verifyPage/VerifyEmail.jsx'
import VerifyPage from './pages/verifyPage/VerifyPage.jsx'
import Video from './pages/video/Video.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Home />
        )
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/verifyemail",
        element: <VerifyEmail />
      },
      {
        path: "/verifyPage",
        element: <VerifyPage />
      },
      {
        path: "/video/:categoryId/:videoId",
        element: (
          <Video />
        )
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SetContextProvider>
      <RouterProvider router={router} />
    </SetContextProvider>
  </StrictMode>


)



{/* <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/verify' element={<VerifyPage />} />
      </Routes> */}