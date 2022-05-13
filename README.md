# Memestagram

This is our clone of Instagram with a focus on all memes, good and bad.

Memestagram is a photo-sharing website where users can connect with others and share meme photos of their choice. Memestagram is inspired by Instagram.

## Application Architecture

Memestagram is built on a React frontend with a Flask backend, using PostgreSQL as a database.

## Frontend Overview

Memestagram does the majority of its applcation logic and validations on the backend, but display/interaction logic on the frontend is managed using several technologies.

### Frontend Technologies Used

#### React

Memestagram is a React application. All display logic is handled by the React libraries.

#### Redux

All state management in Memestagram is handled with Redux, with thunks making API calls to the backend server to handle the data.

## Backend Overview

Memestagram uses a Flask server with a Postgresql database.

### Backend Technologies Used

#### Flask

The ability to play with the data so easly made Flask very efficent for me to use creating Memestagram.

#### PostgreSQL

PostgreSQL was the database of choice because it is simple to work with, and is easily manipulable using Sequelize.

#### WTForms

WTForms made it very easy for me to implemetn validators into my app.

#### SQLAlchemy

SQLAlchemy was the ORM of choice for Memestagram. It made data seeding so easy.


## Important Screenshots

TODO:


# Technology Used
<p float="left">
<img src="https://github.com/AngelShuWei/Memestagram/blob/main/react-app/public/image/python.png?raw=true" width="100">
<img src="/react-app/public/img/javascript.png" width="100">
<img src="/react-app/public/img/react.png" width="100">
<img src="/react-app/public/img/redux.png" width="100">
</p>

## Getting started finding the memes

1. Clone this repo
  * git clone https://github.com/AngelShuWei/Memestagram.git

2. Install dependencies
   ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL.
  * CREATE USER <'memestagram_dev'> WITH CREATEDB PASSWORD <'password'>

4. Create a .env file in the backend directory based on the .env.example

5. Enter your username and password information into your .env file along with your desired database name, a
   secured combination of characters for your JWT_Secret, and your PORT(generally 5000)

6. Add the following proxy to your package.json file within your frontend directory, replacing or
   keeping the 5000 port to match your PORT configuration found in your .env file.
  * "proxy": "http://localhost:5000"

7. Create database, migrate, and seed models:
  ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

8. Start backend server
  * flask run

9. Start frontend services, which should open the app in your default browser, if not navigate to http://localhost:3000/
  * npm start

10. A demo user button is available to use or you may create a new user account by clicking on "Sign up".


<img src="app/react-app/public/img/homePage.png" >

<img src="app/react-app/public/img/onePostPage.png" >

<img src="app/react-app/public/img/posting.png" >

<img src="app/react-app/public/img/profilePage.png" >
