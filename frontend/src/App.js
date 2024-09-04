import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import "./App.css"
import AllTasks from './components/AllTasks'
import ImportantTasks from './components/ImportantTasks'
import CompletedTasks from './components/CompletedTasks'
import IncompleteTasks from './components/IncompleteTasks'
import SignUp from "./components/SignUp"
import Login from "./components/Login"

const App = () => {
  return (
    <div className='appContainer'>
      <Router>
        <Routes>
          <Route exact path='/signup' element={<SignUp />}/>
          <Route exact path='/login' element={<Login />}/>
          <Route exact path='/' element={<Home/>}>
            <Route index element={<AllTasks/>}/>
            <Route path='importantTasks' element={<ImportantTasks/>}/>
            <Route path='completedTasks' element={<CompletedTasks/>}/>
            <Route path='incompleteTasks' element={<IncompleteTasks/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App