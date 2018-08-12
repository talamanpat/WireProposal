# WireProposal

A practice project made with, NodeJS, Angular, JSON Web Token, MongoDB, Chai and Mocha. By Daniel Antonio Tala de Dompierre de Chaufepie.
The project is supposed to be a panel to evaluate proposals made by applicant users, where the company can accept or reject these proposals. 

### Prerequisites

To run and try the current project you should have the next requirements:
* NodeJS and npm installed, I am using the Node version 8.11.3 and npm 6.1.0.
* A web browser.
* Postman, to try the API directly (where are more options than the developed in the Frontend).
* A MongoDB provider, or use the default configuration with my Atlas MongoDB.
* MongoDB Compass recommended.

### Installing

To have the project installed and running on your computer, you should do the next steps: 
1. clone or download the repository, extract/save it in your preferred folder for NodeJS projects.   
2. Locate the folder of the project ("./WireProposal") on CMD, and run npm install to download dependencies.
```
npm install
```
3. Configure your preferred MongoDB engine in the file "./config/confs.js", or left the current one that works with my atlas MongoDB.
4. Run the application, if the connection to MongoDB is ok and there does not exist tables for the app in the MongoDB, it should set up everything that is needed to run and test the system, adding useful mocks to test the application by you.
```
npm start
```
In case of being a new database, it should say something like this:
```
A new database, mocking!
creating users and companies...
done
creating jobs and proposals...
done
```
If all goes well, it should output that the listener is running on the port 1234:
```
App listening on port 1234
```

5. The first run of the database should have created the following users:
```
user: jean.pierre@example.com (company)
password: 123456

user: paul.walker@companyexample.com (company)
password: 123456

user: daniel.talaman@gmail.com (applicant)
password: 123456

user: john.doe@example.com (applicant)
password: 123456
```
So, go to your browser and navigate to the next URL:
```
localhost:1234
```
It should redirect you to the login page, use the jean.pierre@example.com user to have few proposals to evaluate. For more information about adding proposals between other possibilities, see the section API. 

Given that the application is for company users, just company users should be allowed to enter into this app, while applicants are waiting for a response.

## Running the tests

To run unitary tests, use the following command when you are located in the project's folder:
```
npm test
```
## Built With
* NodeJS
* Express
* Angular
* JSON Web Token
* MD5 Password encryption
* MongoDB
* Mongoose
* Chai and Mocha

## API
The requirements asked to develop an application to evaluate proposals, the API is designed for specifically this functions and do not cover other parts of the system, it mocking the rest. 
The API is secured by JSON Web Token, after authenticate (see the service /auth below) you have to send the token provided in the header of the request as:
```
x-access-token: (token provided)
```
An important detail is that I have replaced the GET method for PUT, given security reasons, sending the token as a header, not by URL.

* Proposals API
```
--Get all the proposals of the company
PUT /API/props
--Create a proposal. Require datetime, description, negotiable and job_id.
POST /API/props  
--Delete a proposal. Require :proposal_id.
DELETE /API/props/:proposal_id
--Change the status of a proposal. Require :proposal:id and status ( 0 = pending , 1 = accepted , 2 = rejected , 3 = canceled).
PATCH/API /props/:proposal_id 
--Get valuable info about the user that posted the proposal. Require job_id.
PUT /API/getInfoUserByJob 
```

* Authentication and setup
```
-- Authentication with JSON Web Token. Require email and password.
POST /auth

--Create a company user. Require name, email, password and companyName. Service open to not use a token for practical reasons, but needs security.
 POST /setup/company
```

## Web pages
```
localhost:1234/*
localhost:1234/login.html
```
##  Author's notes about design decisions
* I have not used the "_id" field of MongoDB to conserve some design, not adding the relations as an object, instead of that I simulated a relational database behavior by individual queries.
* I did not add a component to share code between the two web pages (/ and /login) because of time, but that should be done. 
* Because of time, as well, I did not make a local setup for the token in unit testing, this is imperative for production systems.

## Author

* **Daniel Antonio Tala de Dompierre de Chaufepie** 
Talaman.info

