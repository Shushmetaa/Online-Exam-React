import './App.css'
import ExamMaster from './pages/ExamMaster'
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/exammaster" element={<ExamMaster/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
