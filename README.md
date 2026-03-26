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