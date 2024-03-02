# <p align="center">CEC 2024 &mdash; Team Cascade<p>
<p align="center"><image src="assets/logo.svg"></p>

# OceanNext &mdash; Consulting
OceanNext Consulting delivers innovative algorithmic solutions for optimal offshore resource extraction, prioritizing ecological preservation while ensuring accessibility for non-programmers.

## Tech-Stack
The following technologies and resources are used in this application
### Frontend
- [Node.js and npm](https://nodejs.org/en)
- Javascript
- [React.js](https://react.dev/)
- [MaterialUI](https://mui.com/material-ui/)
- [Axios](https://www.axios.com/)
### Backend
- [Python3](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/3.0.x/)
- [Flask Caching](https://flask-caching.readthedocs.io/en/latest/)
- Flask Blueprint
- [Numpy](https://numpy.org/)
- [Pandas](https://pandas.pydata.org/)

## Getting Started 
This project is divided into two main parts: the backend, developed with Flask, and the frontend, developed with React. Follow the instructions below to set up both environments on your local machine.
- Start by cloning this repository to your local machine:
```
$ git clone https://github.com/Eric599/CEC-2024-Programming-Competition.git
```

## Backend Setup
To run the backend application:
1. Ensure you have the following installed.
    - [Python3](https://www.python.org/downloads/)
    - [pip3](https://pip.pypa.io/en/stable/installation/)

2. Navigate to the `/backend` directory:
```
$ cd backend
```
3. Install the required dependencies:
```
$ pip3 install -r requirements.txt
```
4. Start the Flask development server:
```
$ flask --app run run
```
The server should now be running on http://localhost:5000

## Frontend Setup
To run the frontend application:
1. Ensure you have the following installed.
    - [Node.js and npm](https://nodejs.org/en)

2. Navigate to the `/frontend` directory:
```
$ cd frontend
```
3. Install the required dependencies:
```
$ npm install
```
4. Start the node project:
```
$ npm start
```
The frontend application should now be running on http://localhost:3000. Navigate to that url in your browser and begin using the application!

## Software Design Architecture
OceanNext uses a single tier client server architecture to provide its services. The front end and backend are completely segregated, this allows for loose coupling between the business logic and UI logic.
    

## Algorithm Analysis
We decided to use a hybrid algorithm approach to determining the best place to park rigs. We used a greedy and dynamic programming approach to analyze the given data. The algorithm makes a series of decisions where it looks for the best move at each step (e.g., finding the location with the maximum net value of resources minus preserves, considering the constraints). It selects the move that seems best at the moment, which is a hallmark of greedy algorithms. Each move the rig has to make is dependent on its previous move which exhibits characteristics of dynamic programming.

Since the rigs can only move 5 blocks a day, a heuristic solution was incorporated to ensure that the algorithm is not computationally heavy.
## Contributors
- **Matthew Collett**: Backend Developer
- **Ethan Garnier**: Frontend Developer
- **Eric Cuenat**: Algorithm Design
- **Cooper Dickson**: Algorithm Design
