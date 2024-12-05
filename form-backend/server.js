const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formEditor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define schemas and models
const questionSchema = new mongoose.Schema({
  type: String,
  text: String,
  image: String,
});

const responseSchema = new mongoose.Schema({
  responses: Map,
  timestamp: { type: Date, default: Date.now },
});

const formSchema = new mongoose.Schema({
  headerImage: String,
  questions: [questionSchema],
  responses: [responseSchema],
});

const Form = mongoose.model('Form', formSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-form', async (req, res) => {
  const { questions, responses, headerImage } = req.body;
  try {
    const form = new Form({
      headerImage: headerImage,
      questions: questions,
      responses: [{ responses: responses }],
    });
    await form.save();
    res.status(200).send('Form response saved successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to save form response.');
  }
});

app.get('/responses', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to fetch form responses.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
