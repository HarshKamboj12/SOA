# SOA Book API
Project done as a proof of concept API with microservice architecture

Course: Service Oriented Architecture @ [FCSE](https://www.finki.ukim.mk)

## Short description

The business logic of the API will consist of mostly search operations
on various categories of books like name, authors, year, publication date etc.

## Instructions to run on server
1. Clone the repository
2. Navigate to the newly created folder `cd soa-project`
3. Stop any running containers you might have `docker stop $(docker ps -a -q)`
4. If you haven't built the docker images for the microservices, you can do so by running the bash script `bash build_docker_images.sh`.
5. Once all the images have been built successfully, run the JHipster Registry `docker-compose -f jhipster-registry.yml up`
6. Navigate to `soa-project/docker-compose`. This is where the central configuration file `docker-compose.yml` is and from here you can run all the microservices at once `docker-compose up -d`.
7. Check if all processes are running correctly with `docker ps` (you should see a process for each microservice container).
8. The frontend of the application is running on port 8080, with default login "admin:admin". The list of registered microservices can be accessed on port 8761 on the JHipster registry.

## Application architecture

The functionalities of searching through various criteria are separated
in different microservices (see microservice list below.) to balance the strain in case of heavy load.
While searching through the book data the requests will mostly depend on the
User Preferences microservice which will hold the the data about what the user likes
(favorite genres, authors etc.).
There will be a second operation which will be supported by the Random Search microservice,
which is going to randomise searches for the user based on the book search criteria.
The User microservice will be responsible for the user management of the application.
The authentication will be available through the Zuul (Edge) microservice.
For load balancing we will use traefik, Eureka as a service registry and custom API Gateway
as a central unification point of the microservices.
The initial database records will be filled with data scraped from the web.

## Full microservice list
* Author microservice
* Genre microservice
* Rating microservice
* Book microservice
* Book picture microservice
* User Preferences microservice
* JHipster service registry 
* Custom Book API Gateway

## Picture of application architecture
 ![alt text][logo]
 
 [logo]: https://github.com/alisakrstova/soa-book-api/blob/master/app_architecture.png "app architecture"


## Available endpoints
Following are all the endpoints available with their corresponding HTTP methods grouped by logical parts of the system.
### Books
* GET: __/api/books__ - retrieves paged result of all books
* GET: __/api/books/{bookId}__ - retrieves book details
* GET: __/api/books/search__ - searches books by name and description
	* Query string:
		* query (string) - the name and description of the books to be returned
* POST: __/api/books__ - creates new book
	* Data parameters (for JSON object in request body):
		* name
		* yearPublished
		* description
		* numPages
		* genreId
		* authorId
* PUT: __/api/books/{bookId}__ - updates details for book with given ID
* DELETE: __/api/books/{bookId}__ - deletes book with given ID

### Authors
* GET: __/api/authors__ - retrieves all authors
* GET: __/api/authors/{authorId}__ - retrieves author by given ID
* POST: __/api/authors__ - creates new author
	* Data parameters:
		* name
		* born
		* website
* PUT: __/api/authors/{authorId}__ - updates details for author with given ID
* DELETE: __/api/authors/{authorId}__ - deletes author with given ID

### Genres
* GET: __/api/genres__ - retrieves all genres
* GET: __/api/genres/{genreId}__ - retrieves genre by given ID
* POST: __/api/genres__ - creates new genre
	* Data parameter:
		* name
* PUT: __/api/genres/{genreId}__ - updates details for genre with given ID
* DELETE: __/api/genres/{genreId}__ - deletes genre with given ID

### Ratings
* GET: __/api/ratings__ - lists all books with a value for the rating equal to the one supplied in the request parameters
	* Data parameters:
		* bookId - rating for which book
		* userId - by which user the rating is given
		* score (float) - rating/grade to filter by
* GET: __/api/ratings/{bookId}__ - retrieves average grade for book with given ID
* POST: __/api/ratings/{bookId}__ - rates book (updates average grade)
* DELETE: __/api/ratings/{bookId}__ - deletes rating for book
* PUT: __/api/ratings__ - modifies data for existing rating

### User preferences 
* GET: __/api/userpreferences__ - retrieves a list of all user preferences in the system
* POST: __/api/userpreferences__ - creates a preference
	* Data parameters:
		* userId
		* genre - which genre is the user rating
		* score - how preferred is the genre
		
### Book picture 
* POST: __/api/bookpictures__ -  send the picture as bytes
    * Data parameters:
        * Picture as bytes
        * bookId - the book the picture belongs to
* GET: __/api/bookpictures__ - get a list of all pictures
* GET: __api/bookpictures/{id}__ - get picture for book with *id*

 
## Team Members
* [Alisa Krstova 141501](https://github.com/alisakrstova) 
* [Gjorgji Kirkov 141021](https://github.com/kirkovg)
* [Alek Petreski 141507](https://github.com/alekkki)
