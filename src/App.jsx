import './App.css'
import ExamMaster from './pages/ExamMaster'
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from './pages/Home';
import QuestionMaster from './pages/QuestionMaster';
import { TopicMaster } from './pages/adminTopics/TopicMaster';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login/>}></Route> */}
          <Route path="/" element={<Home/>}></Route>
          <Route path="/exammaster" element={<ExamMaster/>}></Route>
          <Route path="/questionmaster" element={<QuestionMaster/>}></Route>
          <Route path="/topicmaster" element={<TopicMaster />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
