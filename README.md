# REST API creation

We have to create REST API (CRUD) that allows us to Create, Read, Update and Delete notes from file.
Using HTTP core module we have to create a server that will listen to 8080 port.

---

### Main tasks:
1. Create a server that listens and reads notes.json
(https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTP-server/)
2. Create an endpoint to read all notes using the GET method (ex: http://localhost: 8080/notes)
3. Create an endpoint to create a note using the POST method
4. Create an endpoint to return notes by arg (title) using the GET method (eg http://localhost: 8080/:title)
5. Create an endpoint to delete a note by arg (title) using the DELETE method (eg http://localhost: 8080 /:title)
6. Create an endpoint to update a note by arg (title) using the PUT method (eg http://localhost: 8080/:title)

---

#### Here are the endpoints that we have to implement using specific HTTP methods:
- /notes			     GET			  Get	All notes
- /notes			     POST		    Add new note
- /notes/:title		 GET			  Get a note by title
- /notes/:title		 DELETE		  Delete a note
- /notes/:title		 PUT			  Update by title

---

#### Some useful links that might help you during the implementation:
[How to create a HTTP server](https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTP-server/)
[How to create a HTTP client](https://nodejs.org/en/knowledge/HTTP/clients/how-to-create-a-HTTP-request/)
[How to create a HTTP server using HTTP core module](https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module)
[https://nodejs.org/en/knowledge/](https://nodejs.org/en/knowledge/)
