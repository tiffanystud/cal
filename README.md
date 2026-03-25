# PENTACal: Documentation
Short description...

# Basic necessities
> PHP Developmental Server
To run the project in its current stage you need PHPs Developmental server installed on your device.
Download PHP: https://www.php.net/downloads.php 
To test if PHP has been installed correctly, run:
php -v
in your terminal (read more about the terminal in the next paragraph). If you run into problems with the install, consult generative AI or Google for assistance.

> BASH-terminal
To start and run the server you need a BASH-terminal. If you are using Mac, a BASH terminal is built into your system (terminal). If you are using Windows, we recomend downloading and using Git Bash: https://git-scm.com/install/ 

# Start server(s)
For the project to work, you need to start 2 different servers. Both these servers will be PHP Developmental Servers.

> Client
To serve the client, navigate to the projects client folder in your terminal. The pathway to this folder can differ from device to device, depending on where you decide to store the repo. When you have navigated to the client-folder run:
php -S localhost:8001
in your terminal. This will start and run a PHP Developmental Server on port 8001 of localhost. To visit the server, simply type into your web browser:
http://localhost:8001

NOTE: The port on which the client folder is served on does not matter as long as it is NOT served on port 8000 which is reserved for backend.

> API
To serve the API, navigate to the projects api folder in yor terminal. The pathway to this folder can differ from device to device, depending on where you decide to store the repo. When you have navigated to the api-folder run:
php -S localhost:8000 index.php
in your terminal. This will start and run a PHP Developmental Server on port 8000 of localhost.
If you attempt to visit this server via the web browser, you will most likely be met by the message:
{error: "Route not found"}
This server serves the backend / api of the project, and is not meant to be reached directly. But the server served on the client folder needs to contact this api server to fetch data from our database.

NOTE: This server NEEDS to be served on port 8000. This port is reserved for the api and the api will be unreachable if served on any other port.