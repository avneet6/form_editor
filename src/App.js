import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './Components/Navbar';
import FormEditor from './Components/FormEditor';
import FormPreview from './Components/FormPreview';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [headerImage, setHeaderImage] = useState(null);

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const updateHeaderImage = (image) => {
    setHeaderImage(image);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<FormEditor addQuestion={addQuestion} updateHeaderImage={updateHeaderImage} />} />
          <Route path="/preview" element={<FormPreview questions={questions} headerImage={headerImage} />} />
        </Routes>
        <Link to="/preview">Preview Form</Link>
        
      </div>
    </Router>
  );
}

export default App;
