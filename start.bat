@echo off



REM In a new terminal, navigate to the validator directory
cd validator
REM Install Dependencies
npm i
REM Start the Node.js ValidatorService
node app.js

REM Navigate to the frontend directory
cd ../frontend

REM Install Dependencies
npm i

REM Start React app
npm start
pause
