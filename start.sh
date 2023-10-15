#!/bin/bash

# Navigate to frontend directory
cd frontend
# Install dependencies
npm i
# Start React app
npm start

# In a new terminal, navigate to the validator directory
cd ../validator
# Install dependencies
npm i
# Start the Node.js ValidatorService
node app.js
