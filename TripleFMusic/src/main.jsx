import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './layout.jsx'
import Home from './pages/MainArea/Home.jsx'
import MusicGallery from './pages/MainArea/MusicGallery.jsx'
import Song from './pages/MainArea/Song.jsx'
import Login from './pages/MainArea/Login.jsx'
import AddSong from './pages/MainArea/AddSong.jsx'
import About from './pages/MainArea/About.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='musicgallery' element={<MusicGallery/>}/>
      <Route path='song' element={<Song/>}/>
      <Route path='addsong' element={<AddSong/>}/>
      <Route path='about' element={<About/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
