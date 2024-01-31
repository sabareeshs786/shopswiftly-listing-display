# Shopswiftly listing and display service
## This is a micro service of an e-commerce application named Shopswiftly used to list and display the products from the MongoDB database. It is developed using node.js, express.js, mongodb and more.

### Installation instructions

Follow the below steps to set up the microservice in your local machine:

#### Prerequisites
- Node package manager(npm)
- Node JS
- Git

#### Steps to install the shopswiftly-profile microservice:

1. **Clone the repository**
    ```bash
   git clone https://github.com/sabareeshs786/shopswiftly-listing-display
   cd shopswiftly-listing-display

2. **Install the dependencies**
   ```bash
   npm install

3. **Create a .env file**
   
   In this the key to decrypt the access token and refresh token should be added. And also the URI of the mongodb database and the admin email id and password. Follow the upcoming steps to do this.
   
4. **Open terminal and run the following command**
   ```bash
   node
   require('crypto').randomBytes(64).toString('hex')
   ```
   Copy the 64 characters long string that is generated

5. **Add the following lines in the .env file that is created above**
   ```bash
   ACCESS_TOKEN_SECRET=COPIED_64_CHARACTERS_LONG_STRING
   ```
   Create another 64 characters long string with same command specified above and copy it.
   ```bash
   REFRESH_TOKEN_SECRET=COPIED_64_CHARACTERS_LONG_STRING
   ```

6. **Procure a MongoDB Database Cloud Storage from AWS, GCP or Azure for free by following the below link from MongoDB Atlas**
   Link: https://youtu.be/NcN9S0DR1nU?si=pEJW7jQIBoLwZqIc

7. **Copy the database URIs by following the instructions in the above link and paste it in the .env file as mentioned below**
   ```bash
   DATABASE_URI_USER_PRODUCTS=COPIED_MONGODB_DATABASE_URI

8. **Now run the following command to start a node.js server in development mode**
    ```bash
    npm run dev
    ```
9. **Install other microservices as well in the following links by following the instructions specified there**
    
    https://github.com/sabareeshs786/shopswiftly-profile
    
    https://github.com/sabareeshs786/shopswiftly-image-server
    
    https://github.com/sabareeshs786/shopswiftly-admin-ui
    
    https://github.com/sabareeshs786/shopswiftly-user-ui

    https://github.com/sabareeshs786/shopswiftly-inventory

### Features provided by this microservice

1. **Fetching product data from the server**
   
