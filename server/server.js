const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Path to the JSON file where plans are stored
const plansFilePath = path.join(__dirname, 'data.json');

// Read the data
function getPlansData() {
  const data = fs.readFileSync(plansFilePath);
  return JSON.parse(data);
}

// Write the data
function savePlansData(plans) {
  fs.writeFileSync(plansFilePath, JSON.stringify(plans, null, 2));
}

function generateRandomId() {
    let id;
    const plans = getPlansData();
    do {
      id = (Math.floor(Math.random() * 1000) + 1).toString(); 
    } while (plans.some(plan => plan.id === id));
    return id;
  }

// GET all plans
app.get('/plans', (req, res) => {
  const plans = getPlansData();
  res.json(plans);
});

// CREATE a new plan
app.post('/plans', (req, res) => {
    try {
      const newPlan = { ...req.body, id: generateRandomId() }; // Generate random ID
      const plans = getPlansData();
  
      plans.push(newPlan);
      savePlansData(plans);
  
      res.status(201).json(newPlan);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create plan' });
    }
  });

// UPDATE a plan
app.put('/plans/:id', (req, res) => {
  const { id } = req.params;
  const updatedPlan = req.body;
  let plans = getPlansData();

  plans = plans.map((plan) => (plan.id === id ? updatedPlan : plan));
  savePlansData(plans);

  res.json(updatedPlan);
});

// DELETE a plan
app.delete('/plans/:id', (req, res) => {
  const { id } = req.params;
  let plans = getPlansData();

  plans = plans.filter((plan) => plan.id !== id);
  savePlansData(plans);

  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});