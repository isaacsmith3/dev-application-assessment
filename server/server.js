const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Path to the JSON file where contacts are stored
const contactFilePath = path.join(__dirname, 'data.json');

// Read the data
function getContactsData() {
  const data = fs.readFileSync(contactFilePath);
  return JSON.parse(data);
}

// Write the data
function saveContactsData(plans) {
  fs.writeFileSync(contactFilePath, JSON.stringify(plans, null, 2));
}

function generateRandomId() {
    let id;
    const contacts = getContactsData();
    do {
      id = (Math.floor(Math.random() * 1000) + 1).toString(); 
    } while (contacts.some(contact => contact.id === id));
    return id;
  }

// GET all contacts
app.get('/plans', (req, res) => {
  const contacts = getContactsData();
  res.json(contacts);
});

// CREATE a new contacts
app.post('/plans', (req, res) => {
    try {
      const newContact = { ...req.body, id: generateRandomId() }; // Generate random ID
      const contacts = getContactsData();
  
      contacts.push(newContact);
      saveContactsData(contacts);
  
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create plan' });
    }
  });

// UPDATE a plan
app.put('/plans/:id', (req, res) => {
  const { id } = req.params;
  const updatedContact = req.body;
  let contacts = getContactsData();

  contacts = contacts.map((contact) => (contact.id === id ? updatedContact : contact));
  saveContactsData(contacts);

  res.json(updatedContact);
});

// DELETE a contacts
app.delete('/plans/:id', (req, res) => {
  const { id } = req.params;
  let contacts = getContactsData();

  contacts = contacts.filter((contact) => contact.id !== id);
  saveContactsData(contacts);

  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});