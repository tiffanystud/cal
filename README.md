# PENTACal: Documentation
Short description...

# Basic necessities
## PHP Developmental Server
> To run the project in its current stage you need PHPs Developmental server installed on your device.
Download PHP: https://www.php.net/downloads.php 
To test if PHP has been installed correctly, run:
php -v
in your terminal (read more about the terminal in the next paragraph). If you run into problems with the install, consult generative AI or Google for assistance.

## BASH-terminal
> To start and run the server you need a BASH-terminal. If you are using Mac, a BASH terminal is built into your system (terminal). If you are using Windows, we recomend downloading and using Git Bash: https://git-scm.com/install/ 

# Start server(s)
For the project to work, you need to start 2 different servers. Both these servers will be PHP Developmental Servers.

## Client
> To serve the client, navigate to the projects client folder in your terminal. The pathway to this folder can differ from device to device, depending on where you decide to store the repo. When you have navigated to the client-folder run: `php -S localhost:8001`
in your terminal. This will start and run a PHP Developmental Server on port 8001 of localhost. To visit the server, simply type into your web browser:
http://localhost:8001

NOTE: The port on which the client folder is served on does not matter as long as it is NOT served on port 8000 which is reserved for backend.

## API
> To serve the API, navigate to the projects api folder in yor terminal. The pathway to this folder can differ from device to device, depending on where you decide to store the repo. When you have navigated to the api-folder run: `php -S localhost:8000 index.php`
in your terminal. This will start and run a PHP Developmental Server on port 8000 of localhost.
If you attempt to visit this server via the web browser, you will most likely be met by the message:
{error: "Route not found"}
This server serves the backend / api of the project, and is not meant to be reached directly. But the server served on the client folder needs to contact this api server to fetch data from our database.

NOTE: This server NEEDS to be served on port 8000. This port is reserved for the api and the api will be unreachable if served on any other port.

# Folder Structure
> This project is made up of two primary folders, "api" and "client". The "api" folder handles everything backend and contains all API-code (PHP). The "client" folder handles the client / frontend. Components and views exists inside this folder.

## API folder
> The api folder includes:
- index.php - php file
- controllers - directory
- middleware - directory
- services - directory
- repository - directory
- test - directory

### index.php
> This index.php file acts as the gateway to out API. All requests are first handled by this file. If you start a PHP developemental server without specifying a file, all requests will default to index.php. To make sure that everything goes smoothly however, we recomend to assign index.php as the root file when starting the server (See Start server(s)/API).

### controllers
> The controllers directory includes router.php and controllers for evert endpoint in the API. router.php is where the request first is handled, and the endpoint is checked. If the endpoint is valid the router will run the appropriate controller-file. The controller-files handle the request on a surface level. They control and checks request-method and runs appropriate service-file. The controller-files also sends response when it has gotten an answer from the service-files.

### middleware
> The middleware directory only includes one file: Middleware.php. This file sets CORS-headers for to allow requests from foreign origins. It also checks if the requests Content-Type header was set to application/json in case of POST, PATCH and DELETE-requests.

### services
> The services folder includes service-files for every endpoint handled by the API. These service-files are called from the controller and include methods to handle, send and receive data from the database. The services have methods for each of the different HTTP-methods that the specific endpoint handles. The service-files then returns the appropriate response to controller or throws an Exception if an error was encountered.

### repository
> The repository directory includes DBAccess.php, DBIO.php and the database folders. The database folders include json-files for each endpoint. These json-files include the data for each specific endpoint. The db-backup folder is a failsafe database that is not used for anything other than being a backup, to restore the db to a neutral state. This was mostly used during development to test endpoints. DBAccess.php includes method to get, post, patch or delete data from a specific db. Each service creates a new instance of the DBAccess class with the name of the endpoint sent to the contstructor. The service-file can then access these methods to perform actions which either gets, posts, patches or deletes data from the database. 

### test
> The test directory includes the test for the API. The test tests all possible endpoints to the API, displays them on a page and shows if the expected response was correct or not. To read about how to run the test, please read README.md file inside the test directory. 

## client folder
> The client folder includes:
- index.html - html-file
- index.js - JavaScript-file
- core - directory
- components - directory
- assets - directory

### index.html
> A standard HTML-file used to actually view the site. We have very little standard HTML and most is set by JS. 

### index.js
> Initial js-file that imports components, services, views and runs the router. This is the only JS-file that is connected directly to the HTML-document and is loaded when the HTML-file is loaded. 

### core
> The core directory includes four directories: router, services, store, views. 

> The router folder includes router.js which checks the URL and publishes a change:view event to alert the views. 

> The services-file includes service-files for the different views. The services are imported into index.js and they run when index.js runs. The service-files subscribe to different events related to the view. For example some of the subscriptions handle getting certain data from the API, before the view is loaded. 

> The store folder includes events.js, pubsub.js, state.js and store.js. state.js and store.js handle the state and notify. events.js include objects containing string to make it easier to send ceratin events. pubsub.js includes handling for pubsub, methods like subscribe and publish.

> The views directory includes all views. Each folder represents a different view. The folders contain a script that loads displays the view and some also include view-specific components.

### components 
> The components directory includes global custom components. Each folder inside this directory represents a global component. 

### assets
> The assets directory includes the icons folder. The icons folder contains icons (images) that we use on the site. This directory will also be the place for fonts and site-wide CSS files.

# API Documentation
The following section includes the API Documentation for the project. It includes all possible endpoints, methods and expected request / response bodies. 
All responses from are sent as JSON.

## Allowed HTTP-Methods
The API only accepts HTTP-methods GET, POST, PATCH and DELETE. A request with any other HTTP-method will be rejected.

## JSON Headers 
If you send a POST, PATCH or DELETE request, the Content-Type header must be set to application/json. If header is set to anything else, the request will be rejected.

## Endpoints
### /users
#### GET
- Used to: Get all users
- Expected request-body: none
- Possible response statuses: 200 OK
- Response-body: array of user-objects
- Example response(s): 
> 200 OK
```json
[{
    "id": "65e10aa11a001",
    "email": "elle@gamil.com",
    "pwd": "testpass",
    "name": "Elias"
}]
```

#### POST
- Used to: Create a new user and add it to the database
- Expected request-body:
```js
{
    name: string,
    email: string,
    password: string
}
```
- Possible response-statuses: 201 Created, 400 Bad Request, 409 Conflict
- Response-body: user-object of created user or error-object
- Example response(s):
> 201 Created | User was successfully created
```js
{
    "id": "65e10aa11a001",
    "email": "elle@gamil.com",
    "pwd": "testpass",
    "name": "Elias"
}
```

> 400 Bad Request | One or more required attributes are missing
```js
{
    error: "Missing fields"
}
```

> 409 Conflict | User with username or email already exists
```js
{
    error: "User aldready exists"
}
```

#### PATCH 
- Used to: edit or change existing user credentials
- Expected request-body:
```js
{
    userId: "string",
    name: "string?",
    password: "string?",
    email: "string?"
}
```
- Possible response statuses: 200, 400, 404
- Response-body: Edited user-object or error-object
- Example response:
> 200 OK | User was successfully edited
```json
{
    "id": "65e10aa11a001",
    "email": "elle@gamil.com",
    "pwd": "newpass",
    "name": "Elias"
}
```

> 400 Bad Request | userId attribute missing
```js
{
    error: "Missing userId parameter"
}
```

> 404 Not Found | User with provided ID was not found
```js
{
    error: "User not found"
}
```

#### DELETE
- Used to: Delete user from database
- Expected request-body: 
```js
{
    userId: string,
    password: string,
    email: string
}
```
- Possible response statuses: 200, 400, 403, 404
- Response-body: success-object or error-object
- Example response:
> 200 OK | User was successfully deleted
```js
{
    message: "User successfully deleted"
}
```

> 400 Bad Request | Required attributes missing
```js
{
    error: "Missing fields"
}
```

> 403 Forbidden | Sent password or email does not match
```js
{
    error: "Invalid email or password"
}
```

> 404 Not Found | User was not found
```js
{
    error: "User not found"
}
```

### /users?id=id
#### GET
- Used to: get a specific user from their userId
- Expected request-body: none, but request-param "id" expected
- Possible response statuses: 200, 404
- Response-body: User-object or error-object
- Example response:
> 200 OK | Appropratie user was found
```json
{
     "id": "65e10aa11a001",
    "email": "elle@gamil.com",
    "pwd": "testpass",
    "name": "Elias"
}
```

> 404 Not Found | No user with provided ID was found
```js
{
    error: "User not found"
}
```

### /calendars
#### GET
- Used to: Get call calendars from database
- Expected request-body: none
- Possible response statuses: 200, 404
- Reponse-body: array of calendar-objects or error-object
- Example response:
> 200 OK | Atleast one calendar was found and the array was returned
```json
[{
    "id": "65e10aa11b001",
    "creatorId": "65e10aa11a001",
    "name": "Projekt A",
    "description": "En samlingsplats f\u00f6r allt som r\u00f6r projektet.",
    "type": "public"
}]
```

> 404 Not Found | No Calendars were found
```js
{
    error: "No calendars found"
}
```

#### POST
- Used to: Create a new calendar and add it to the database
- Expected request-body:
```js
{
    userId: string,
    name: string,
    type: string
}
```
- Possible response statuses: 200, 400, 409
- Response-body: Created calendar-object or error-object
- Example response:
> 200 OK | Calendar was created
```json
{
    "id": "65e10aa11b001",
    "creatorId": "65e10aa11a001",
    "name": "Projekt A",
    "description": "En samlingsplats f\u00f6r allt som r\u00f6r projektet.",
    "type": "public"
}
```

> 400 Bad Request | Attributes missing in request-body
```js
{
    error: "Missing attributes"
}
```

> 409 Conflict | User trying to create calendar is already in a calendar with provided name
```js
{
    error: "User is already in group with same name"
}
```

#### PATCH
- Used to: edit or change existing calendar
- Expected request-body: 
```js
{
    id: "string", 
    name: "string?",
    description: "string?",
    type: "string?"
}
```
- Possible response statuses: 200, 400
- Response-body: Edited calendar-object or error-object
- Example response:
> 200 OK | Calendar was successfully edited
```json
{
    "id": "65e10aa11b001",
    "creatorId": "65e10aa11a001",
    "name": "New name",
    "description": "New desc",
    "type": "public"
}
```

> 400 Bad Request | id attribute was not set
```js
{
    error: "Id missing"
}
```

> 400 Bad Request | No values to change were provided
```js
{
    error: "No values to change"
}
```

#### DELETE
- Used to: Delete a calendar from database
- Expected request-body:
```js
{
    id: string,
    creatorId: string
}
```
- Possible response statuses: 200, 400, 404
- Response-body: Deleted calendar-object or error-object
- Example response:
> 200 OK | Calendar was successfully deleted
```json
{
    "id": "65e10aa11b001",
    "creatorId": "65e10aa11a001",
    "name": "Projekt A",
    "description": "En samlingsplats f\u00f6r allt som r\u00f6r projektet.",
    "type": "public"
}
```

> 400 Bad Request | If id attribute is missing
```js
{
    error: "Missing attribtes"
}
```

> 404 Not Found | No calendar with provided id was found
```js
{
    error: "No calendar exists to delete"
}
```

### /calendars?id=id
#### GET
- Used to: Get specific calendar from its id
- Expected request-body: none, but "id" request-param expected
- Possible response statuses: 200, 400, 404
- Response-body: calendar-object or error-object
- Example response:
> 200 OK | Calendar was found and returned
```json
{
    "id": "65e10aa11b001",
    "creatorId": "65e10aa11a001",
    "name": "Projekt A",
    "description": "En samlingsplats f\u00f6r allt som r\u00f6r projektet.",
    "type": "public"
}
```

> 400 Bad Request | If any other parameter but id is set
```js
{
    error: "Value missing"
}
```

> 404 Not Found | No calendar found with provided id
```js
{
    error: "No calendars found"
}
```

### /users_calendars
#### GET
- Used to: Get all connections between users and calendars
- Expected request-body: none
- Possible response statuses 200
- Response-body: array of user_calendars-objects
- Example response:
> 200 OK 
```json
{
    "id": "65e10aa11d001",
    "userId": "65e10aa11a001",
    "calId": "65e10aa11b001",
    "isAdmin": true
}
```

#### POST
- Used to: Create a new connection between user and calendar
- Expexted request-body:
```js
{
    userId: string,
    calId: string,
    isAdmin: bool
}
```
- Possible response statuses: 201, 400, 404, 409
- Response-body: user_calendars conncetion-object or error-object
- Example response:
> 201 Created | A new connection was created
```json
{
    "id": "65e10aa11d001",
    "userId": "65e10aa11a001",
    "calId": "65e10aa11b001",
    "isAdmin": true
}
```

> 400 Bad Request | Required attributes missing
```js
{
    error: "Missing atttributes"
}
```

> 404 Not Found | Either provided user or calendar was not found
```js
{
    error: "User or cal not found"
}
```

> 409 Conflict | The connection already exists
```js
{
    error: "User is already in cal"
}
```

#### PATCH
- Used to: change admin-status of a user by editing isAdmin key in connection
- Expected request-body: 
```json
{
    "id": "65e10aa11d001",
    "userId": "65e10aa11a001",
    "calId": "65e10aa11b001",
    "isAdmin": true
}
```
- Possible reponse statuses: 200, 400, 404
- Response-body: success-object or error-object
- Example response:
> 200 OK | Admin status of user was changed
```js
{
    success: "Admin status changed!"
}
```

> 400 Bad Request | Missing required attributes
```js
{
    error: "User ID / CAL ID missing"
}
```

> 400 Bad Request | User is not a member of the specified calendar
```js
{
    error: "User not in calendar"
}
```

> 404 Not Found | No user with specified ID was found
```js
{
    error: "User not found."
}
```

#### DELETE
- Used to: Delete users_calendars connection
- Expected request-body: 
```js
{
    userId: string,
    calId:string
}
```
- Possible response statuses: 200, 400, 404
- Response-body: success-object or error-object
- Example response:
> 200 OK | Connection successfully deleted
```js
{
    message: "Deleted successfully!"
}
```

> 400 Bad Request | userId or calId attributes missing
```js
{
    error: "User ID / Cal ID missing"
}
```

> 404 Not Found | No user or cal was found for specified ids
```js
{
    error: "User not found / Cal not found"
}
```
> 404 Not Found | No connection with specified ids was found
```js
{
    error: "Relation not found"
}
```

### /users_calendars?calId=id
#### GET
- Used to: Get all users_calendars connections for a specific calId
- Expected request-body: none, but request-param "calId" expected
- Possible response statuses: 200, 404
- Request-body: array of connections or error-object
- Example response:
> 200 OK | Connections were found
```json
[{
    "id": "65e10aa11d001",
    "userId": "65e10aa11a001",
    "calId": "65e10aa11b001",
    "isAdmin": true
}]
```

> 404 Not Found | No calendar was found with specified calId
```js
{
    error: "Calendar not found"
}
```

### /users_calendars?userId=id
#### GET
- Used to: Get all connections from a specific userId
- Expected request-body: none, but request-param "userId" expected
- Possible response statuses: 200, 404
- Request-body: array of connection-objects or error-object
- Example response:
> 200 OK | Connections found
```json
[{
    "id": "65e10aa11d001",
    "userId": "65e10aa11a001",
    "calId": "65e10aa11b001",
    "isAdmin": true
}]
```

> 404 Not Found | No connections were found with specified userId
```js
{
    error: "User not found"
}
```

### /users_calendars?id=id
#### GET
- Used to: Get a specific connections from its id
- Expected request-body: none, but request-param "id" expected
- Possible response statuses: 200, 404
- Response-body: connection-object or error-object
- Example response:
> 200 OK | Connection found
```json
{
    "id": "65e10aa11d001",
    "userId": "65e10aa11a001",
    "calId": "65e10aa11b001",
    "isAdmin": true
}
```

> 404 Not Found | No connection with specified id was found
```js
{
    error: "Relation not found"
}
```

### /events
#### GET
- Used to: Get all events from database
- Expected request-body: none
- Possible response statuses: 200
- Response-body: array of event-objects
- Example response:
> 200 OK
```json
{
    "id": "65e10aa11c001",
    "date": "2026-03-01",
    "time": "18:00",
    "type": "lecture",
    "name": "Sprint Review",
    "description": "Genomg\u00e5ng av sprintens leverabler och resultat i enlighet med fastst\u00e4lld agenda.",
    "location": "Zoom",
    "needsConfirmation": false,
    "participationLimits": null,
    "tags": "review",
    "calId": "65e10aa11b001"
}
```

#### POST
- Used to: Create a new event and add it to the database
- Expected request-body:
```js
{
    type: string,
    name: string,
    date: string,
    time: string,
    location: string,
    needsConfirmation: bool,
    tags: "string?",
    participationLimit: "string?",
    description: "string?",
    calId: string
}
```
- Possible response statuses: 201, 400, 404
- Response-body: created event-object or error-object
- Example response:
> 201 Created | Event was created
```json
{
    "id": "65e10aa11c001",
    "date": "2026-03-01",
    "time": "18:00",
    "type": "lecture",
    "name": "Sprint Review",
    "description": "Genomg\u00e5ng av sprintens leverabler och resultat i enlighet med fastst\u00e4lld agenda.",
    "location": "Zoom",
    "needsConfirmation": false,
    "participationLimits": null,
    "tags": "review",
    "calId": "65e10aa11b001"
}
```

> 400 Bad Request | Any required attributes are missing
```js
{
    error: "Missing attributes"
}
```

> 404 Not Found | No calendar for specified calId was found
```js
{
    error: "Cal not found"
}
```

#### PATCH
- Used to: Edit an existing event
- Expected request-body:
```js
{
    eventId: string
    type: "string?",
    name: "string?",
    date: "string?",
    time: "string?",
    location: "string?",
    needsConfirmation: "bool?",
    tags: "string?",
    participationLimit: "string?",
    description: "string?",
    calId: string
}
```
- Possible response statuses: 200, 400, 404
- Response-body: Edited event-object or error-object
- Example response:
> 200 OK | Event was edited
```json
{
    "id": "65e10aa11c001",
    "date": "2026-03-01",
    "time": "19:00",
    "type": "lecture",
    "name": "New Name",
    "description": "new desc",
    "location": "New location",
    "needsConfirmation": false,
    "participationLimits": null,
    "tags": "review",
    "calId": "65e10aa11b001"
}
```

> 400 Bad Request | Any of the required attributes are missing
```js
{
    error: "Missing attributes"
}
```

> 404 Not Found | No event or calendar was found for specified calId or eventId
```js
{
    error: "Not found"
}
```

#### DELETE
- Used to: Delete an event
- Expected request-body:
```js
{
    calId: string,
    eventId: string
}
```
- Possible response statuses: 200, 400, 404
- Response-body: succes-object or error-object
- Example response:
> 200 OK | Event deleted
```js
{
    success: "Event deleted successfully"
}
```

> 400 Bad Request | calId or eventId attribute missing
```js
{
    error: "Missing attributes"
}
```

> 404 Not Found | No event or calendar was found with specified ids
```js
{
    error: "Not found"
}
```

### /events?calId=id
#### GET
- Used to: Get all events from a specific calendar
- Expected request-body: none, but request-param "calId" expected
- Possible response statuses: 200, 404
- Request-body: array of event-objects or error-object
- Example response:
> 200 OK | Events found
```json
[{
    "id": "65e10aa11c001",
    "date": "2026-03-01",
    "time": "18:00",
    "type": "lecture",
    "name": "Sprint Review",
    "description": "Genomg\u00e5ng av sprintens leverabler och resultat i enlighet med fastst\u00e4lld agenda.",
    "location": "Zoom",
    "needsConfirmation": false,
    "participationLimits": null,
    "tags": "review",
    "calId": "65e10aa11b001"
}]
```

> 404 Not Found | No events were found in the specified calendar
```js
{
    error: "No event(s) found"
}
```

### /events?eventId=id
- Used to: get a specific event from its ID.
- Expected request-body: none, but request-param "eventId" expected
- Possible response statuses: 200, 404
- Request-body: event-object or error-object
- Example request:
> 200 OK | Event found
```json
{
    "id": "65e10aa11c001",
    "date": "2026-03-01",
    "time": "18:00",
    "type": "lecture",
    "name": "Sprint Review",
    "description": "Genomg\u00e5ng av sprintens leverabler och resultat i enlighet med fastst\u00e4lld agenda.",
    "location": "Zoom",
    "needsConfirmation": false,
    "participationLimits": null,
    "tags": "review",
    "calId": "65e10aa11b001"
}
```

> 404 Not Found | No event was found for specified id
```js
{
    error: "No events(s) found"
}
```

### /event_admins
#### GET
- Used to: Get all event_admins connections
- Expected request-body: none
- Possible response statuses: 200
- Response-body: array of event_admins connection-objects
- Example request:
> 200 OK
```json
[{
    "id": "65e10aa143201",
    "eventId": "65e10aa11c001",
    "userId": "65e10aa11a001",
    "canDelete": true,
    "canEdit": true,
    "isCreator": true
}]
```

#### POST
- Used to: Create a new event_admins connection
- Expected request-body: 
```js
{
    userId: string,
    eventId: string,
    canDelete: bool,
    canEdir: bool,
    isCreator: bool
}
```
- Possible response statuses: 201, 400, 404
- Response-body: Created connection-object or error-object
- Example response:
> 201 Created | Connection created
```json
{
    "id": "65e10aa143201",
    "eventId": "65e10aa11c001",
    "userId": "65e10aa11a001",
    "canDelete": true,
    "canEdit": true,
    "isCreator": true
}
```

> 400 Bad Request | Any required attributes are missing
```js
{
    error: "Missing attributes"
}
```

> 404 Not Found | No event or user was found with specified ids
```js
{
    error: "Not found"
}
```

#### PATCH
- Used to: edit existing event_admins connection
- Expected request-body:
```js
{
    userId: string,
    eventId: string,
    canDelete: "bool?",
    canEdit: "bool?",
    isCreator: "bool?"
}
```
- Possible response statuses: 200, 400, 404
- Response-body: edited event_admins connection-object or error-object
- Example response:
> 200 OK | event_admins-object edited
```json
{
    "id": "65e10aa143201",
    "eventId": "65e10aa11c001",
    "userId": "65e10aa11a001",
    "canDelete": true,
    "canEdit": true,
    "isCreator": true
}
```

> 400 Bad Request | evenId or userId attribute missing
```js
{
    error: "Missing attributes"
}
```

> 404 Not Found | No event or user was found with specified ids
```js
{
    error: "Not found"
}
```

#### DELETE
