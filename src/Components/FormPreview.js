import React, { useState } from 'react';
import './FormPreview.css';

function FormPreview({ questions, headerImage }) {
  const [responses, setResponses] = useState({});
  
  const handleChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
  };

  const handleSubmit = async () => {
    const response = {
      questions: questions,
      responses: responses,
      headerImage: headerImage,
    };
    const res = await fetch('http://localhost:5000/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response),
    });
    if (res.status === 200) {
      alert('Form submitted successfully!');
    } else {
      alert('Failed to submit form.');
    }
  };

  return (
    <div className="form-preview">
      <h2>Preview Form</h2>
      {headerImage && <img src={headerImage} alt="Header" className="header-image" />}
      {questions.map((question, index) => (
        <div key={index} className="question">
          <h3>{question.text}</h3>
          {question.image && <img src={question.image} alt="Question" className="question-image" />}
          {question.type === 'text' && (
            <input
              type="text"
              value={responses[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          )}
          {question.type === 'multiple-choice' && (
            <div>
              <input type="radio" name={`question${index}`} onChange={() => handleChange(index, 'Option 1')} /> Option 1
              <input type="radio" name={`question${index}`} onChange={() => handleChange(index, 'Option 2')} /> Option 2
            </div>
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Form</button>
    </div>
  );
}

export default FormPreview;
