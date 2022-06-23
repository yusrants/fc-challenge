# Cache Builder
A simple cache builder project that stores data in cache wrt keys. 
It has the following endpoints:

**endpoint**: "localhost:5000"

### get /populate
 First of all, fetch this end point to populate the db with random users data

### get /keys 
● An endpoint that returns all stored keys in the cache

### get /key/id
● An endpoint that returns the cached data for a given key

### post /key/id
● An endpoint that creates and updates the data for a given key

### delete /keys
● An endpoint that removes all keys from the cache

### delete /key/id
● An endpoint that removes a given key from the cache

## How to setup and run the project

1. Clone the project

 ### Connect to DB:
2.  Create a cluster on mongodb atlas, a new db and collection.
3. Create an .env file in the root folder and add the following parameters:
- ATLAS_URI = "mongodb+srv://<username>:<password>@clusterfc.xbigfoo.mongodb.net/?retryWrites=true&w=majority";
- DATABASE = db-name; 
- COLLECTION = collection-name; 

### Run the following commands
- cd cache-builder 
- npm install
- npm run dev
- The project should be up and running at _"localhost:5000"_


