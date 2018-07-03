# WireProposal

A test made for the JS Developer position in WireDelta by Daniel Antonio Tala de Dompierre de Chaufepie.
The project is supposed to be a panel to evaluate proposals made by applicant users, where the company can accept or reject these proposals. 

### Prerequisites

To run and try the current project you should have the next requirements:
-NodeJS and npm installed, I am using the Node version 8.11.3 and npm 6.1.0.
-A web browser.
-Postman, to try the API directly (where are more options than the developed in the Frontend).
-A MongoDB provider, or use the default configuration with my Atlas MongoDB.
-MongoDB Compass recommended.

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

5. 
The first run of the database should have created the following users:
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

##  Author's notes about design decisions


## Author

* **Daniel Antonio Tala de Dompierre de Chaufepie** 
Talaman.info

