# Take a Fly

Take a Fly is the backend application for a travel destination search platform. It allows users to search for destinations based on specific criteria such as date, budget, and interests. Users can create travel plans and select whether they are public or private. If a travel plan is public, other registered users can view and join the travel if their interests align and the dates are compatible.


## Prerequisites

To run this application, make sure you have the following:

- MySQL database installed and configured.


## Installation

1. Clone the repository
1. Install the required packages: **`npm i`**
3. Create a **`.env`** file based on the provided **`.env.example`** file. Specify the values for the environment variables required by the application to work.


## Usage and Endpoints

Here are some usage examples to get you started:

- To search for destinations, use the search functionality and provide the desired criteria such as interests.

- Create a travel plan and specify whether it is public or private.

- Registered users can join public travel plans.

Feel free to explore the application and experiment with different features.


| Endpoint                                   | Description                                                   | Role                  |
|--------------------------------------------|---------------------------------------------------------------|-----------------------|
| `/api/signup`                              | Creates a new user account                                    | Guest                 |
| `/api/login`                               | Authenticates user credentials and generates a session token  | Guest                 |
| `/api/user`                                | Fetches a list of all users                                   | Admin                 |
| `/api/user/profile`                        | Fetches details of log in user                                | Logged user           |
| `/api/user/:id`                            | Fetches details of a specific user                            | Admin                 |
| `/api/user`                                | Creates a new user                                            | Admin                 |
| `/api/user/:id`                            | Updates information of a specific user                        | Admin                 |
| `/api/user/:id`                            | Deletes a specific user                                       | Admin                 |
| `/api/category`                            | Fetches a list of all categories                              | Logged user           |
| `/api/category/:id`                        | Fetches details of a specific category                        | Admin                 |
| `/api/category`                            | Creates a new category                                        | Admin                 |
| `/api/category/:id`                        | Updates information of a specific category                    | Admin                 |
| `/api/category/:id`                        | Deletes a specific category                                   | Admin                 |
| `/api/destination`                         | Fetches a list of all destinations                            | Logged user           |
| `/api/destination/category/:idCategory`    | Fetches a list of all destinations by specific category       | Logged user           |
| `/api/destination/:id`                     | Fetches details of a specific destination                     | Logged user           |
| `/api/destination`                         | Creates a new destination                                     | Admin                 |
| `/api/destination/:id`                     | Updates information of a specific destination                 | Admin                 |
| `/api/destination/:id`                     | Deletes a specific destination                                | Admin                 |
| `/api/travel`                              | Fetches a list of all travels (Admin can see privates)        | Logged user           |
| `/api/travel/myTravels`                    | Fetches a list of all travels from the logged in user         | Logged user           |
| `/api/travel/users/:travelId`              | Fetches a list of all users in the same public travel         | Logged user           |
| `/api/travel/:id`                          | Fetches details of a specific travel                          | Logged user           |
| `/api/travel`                              | Creates a new travel                                          | Logged user or admin  |
| `/api/travel/:travelId/user/:userId`       | Add user to a public travel                                   | Logged user or admin  |
| `/api/travel/:id`                          | Updates information of a specific travel                      | Admin                 |
| `/api/travel/:id`                          | Deletes a specific travel                                     | Admin                 |
| `/api/travel/user/:id`                     | Updates information of a specific travel (user owner)         | Owner user            |
| `/api/travel/user/:id`                     | Deletes a specific travel (user owner)                        | Owner user            |
| `/api/travel/:travelId/user/:userId`       | Remove user to a public travel                                | Logged user or admin  |


## Data Model

### Table "users" 
| Column      | Type                    | Constraints                           |
| ----------- | ----------------------- | ------------------------------------- |
| id          | int                     | Primary Key, Not Null, Auto Increment |
| first_name  | VARCHAR                 | Not Null                              |
| last_name   | VARCHAR                 | Not Null                              |
| email       | VARCHAR                 | Not Null, Unique                      |
| username    | VARCHAR                 | Not Null                              |
| password    | VARCHAR                 | Not Null                              |
| description | VARCHAR                 | Not Null                              |
| address     | VARCHAR                 |                                       |
| birth_date  | DATE                    | Not Null                              |
| roles       | ENUM('admin', 'user')   | default: user                         |


### Table "categories" 
| Column  | Type     | Constraints                           |
| ------- | -------- | ------------------------------------- |
| id      | int      | Primary Key, Not Null, Auto Increment |
| title   | VARCHAR  | Not Null                              |


### Table "destinations" 
| Column     | Type    | Constraints                           |
| ---------- | ------- | ------------------------------------- |
| id         | int     | Primary Key, Not Null, Auto Increment |
| country    | VARCHAR | Not Null                              |
| city       | VARCHAR | Not Null                              |
| description| TEXT    | Not Null                              |


### Table "destination_category" 
| Column         | Type | Constraints                           |
| -------------- | ---- | ------------------------------------- |
| destinationId  | int  | Not Null, References destinations(id) |
| categoryId     | int  | Not Null, References categories(id)   |


### Table "user_travel" 
| Column    | Type | Constraints                      |
| --------- | ---- | -------------------------------- |
| userId    | int  | Not Null, References users(id)   |
| travelId  | int  | Not Null, References travels(id) |


### Table "travels" 
| Column        | Type                        | Constraints                              |
| ------------- | --------------------------- | ---------------------------------------- |
| id            | int                         | Primary Key, Not Null, Auto Increment    |
| date          | DATE                        | Not Null                                 |
| budget        | FLOAT(10,2)                 |                                          |
| visibility    | ENUM('public', 'private')   | default: private                         |
| id_category   | int                         | Not Null, References categories(id)      |
| userId        | int                         | Not Null, References users(id)           |


## Authors

Take a Fly was created by:

- Carolina (https://github.com/gcarolina03)
- Ainara (https://github.com/ainiesh)
- Juan (https://github.com/JB-Aguilar)


## Technologies Used

This project was built using:

- JavaScript
- Sequelize
- Express


## Contributing

If you would like to contribute to Take a Fly, please submit a pull request with your changes. We welcome contributions of all kinds, including bug fixes, feature additions, and general improvements.


## Project Link

You can find the project on GitHub at: https://github.com/gcarolina03/takeAFly


## License

This project is licensed under the [MIT License](LICENSE).

