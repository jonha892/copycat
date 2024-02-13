import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Detail from './features/detail'
import Home from './features/home'
import Login from './features/login'
import PrivateRoute from './features/private-route'
import { CORRECT_PIN } from './stores/pin-store'

const router = createBrowserRouter([
  { path: '/', element: <Login numberOfPins={CORRECT_PIN.length} /> },
  {
    element: <PrivateRoute />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'details/:id', element: <Detail /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
