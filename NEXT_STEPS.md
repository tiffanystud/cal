# PENTACAL: Next steps 

> The main step is restructuring the the fontend. That includes:
   
    Having services per view
   
    Refactoring all components, for global and view
   
    Rename the files and contents for the appropriate function
   
    Refactoring the events for PubSub, having a naming convention

    Implementing a login view

    Implementing more popups instead of views

    User feedback when user interact with inputs 

    Fix popstate for navigating backwards, works sometimes and sometimes not

    Having a clear and structured template for all of the components and views with methods. 
    
    Having only custom component class for components which extends HTMLElement and only non HTMLElement classes or functions for views

    BE CONSEQUENCE WITH FRONTEND!!!!



> Backend

    Presentation-layer/API
        - Add methods in the api for extracting the raw data and making it more client friendly when client fetches
        - Add methods and internal requests for other entitites if its needed instead of handling the entities in frontend through mulitple fetch.

    More data within the entitites for more functionality in both backend and frontend

    Validate more data from the entities within requests


