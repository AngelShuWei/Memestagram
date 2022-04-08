# Memestagram

This is our clone of Instagram with a focus on all memes, good and bad. 

# Technology Used
<p float="left">
<img src="frontend/public/img/python.png" width="100">
<img src="frontend/public/img/javascript.png" width="100">
<img src="frontend/public/img/react.png" width="100">
<img src="frontend/public/img/redux.png" width="100">
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
