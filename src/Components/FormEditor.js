
import React, { useState } from 'react';
import './FormEditor.css';

function FormEditor({ addQuestion, updateHeaderImage }) {
  const [questionType, setQuestionType] = useState('text');
  const [questionText, setQuestionText] = useState('');
  const [questionImage, setQuestionImage] = useState(null);

  const handleAddQuestion = () => {
    const newQuestion = { type: questionType, text: questionText, image: questionImage };
    addQuestion(newQuestion);
    setQuestionText('');
    setQuestionImage(null);
  };

  const handleHeaderImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      updateHeaderImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleQuestionImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setQuestionImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="form-editor">
      <h2>Edit Form</h2>
      <div>
        <label>Header Image: </label>
        <input type="file" onChange={handleHeaderImageChange} />
      </div>
      <div>
        <label>Question Type: </label>
        <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
          <option value="text">Text</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="image">Image</option>
        </select>
      </div>
      <div>
        <label>Question Text: </label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Question Image (optional): </label>
        <input type="file" onChange={handleQuestionImageChange} />
      </div>
      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
}

export default FormEditor;
