import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import AboutPage from "./components/About";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
