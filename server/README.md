# HypnotizeTheBoss

This project is our Database project. The goal of this project is to make something similar to speedrun.com that has the ability to query data cooler lol. 


# Set up the project
Here, we will list the things we've downloaded for the ease of the project: 

## Clone this repo 
do it lol 

## Create an .env file 
An .env file is used to store and list secret values that we don't want the public to know. For example, we totally don't want our database username of "postgres" to be leaked, so we would do the following. 

1) go to the root of the repository 
2) create a `.env` file 
3) run `npm install dotenv`
4) Inside the `.env` file, you can define your environment variables in the format `KEY=VALUE`
   
        DB_USER=postgres
5) Create these variables for the following
    
        DB_HOST=<insert endpoint here> 
        DB_USER=<insert user here> 
        DB_PASS=<insert password here>
        DB_PORT=<insert port number here>
        DB_DATABASE=<insert database here>
6) You should be good to go! This project has a .gitignore file that contains the .env file so our information is not out to the world. 

### Postman 
Postman is for API stuff. We are going to be sending our requests from here to test if our APIs are working correctly. Please get this one.

Here's the link and documentation to download the following 

[Postman](https://www.postman.com/downloads/)

### pgAdmin4 (optional)
pgAdmin4 makes it so that we can create tables, columns, and databases easier to manage. It is similar to an IDE and can help us keep track of what we have visually without things feeling like pre 1990s. 

Here's the link and documentation to download the following 

[pgAdmin4](https://www.pgadmin.org/download/) 

## How to run the project 
1) `cd` into the `server` folder 
2) run `nodemon index` to run the project, this prolly runs your backend 
   1) if it doesn't work, you prolly need to install nodemon `npm install --global nodemon` this will install nodemon globally on your machine 

## How to use Postman 
1) run `nodemon index` to spin up our backend
2) Open Postman 
3) Create a new folder, there should be a template one called "RESTful API basics" 
4) Within the POST one, add the following to the `url` portion: `http://localhost:3000/insertData`
   1) we are localhosting the website 
   2) 3000 is *my* default port (it might be different for you, it shouldn't be tho lol from the code I wrote)
   3) `insertData` is the express function we are calling to insert the data we pass in

5) Click "body" we should now be show the raw json
6) Insert the following to the json 

        {
                "number": 12
        }
7) Click "Send" to send this information
8) Check the console log of the program to see if the information had sent




