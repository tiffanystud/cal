
------

Instruktioner för att köra test:

1. Starta API
    1. Serva hela rotmappen (week8) med port 8000.
        1. cd week8 
        2. php -S localhost:8000
    2. Nu körs API på port 8000 (http://localhost:8000)


2. Starta test/dashboard
    1. Serva testmappen (testName) med port 8001 (php -S localhost:8000)
        1. cd week8/test/testName
        2. php -S localhost:8001
    2. Nu körs dashboard på port 8001


3. Kör test
    1. Skriv in på webbläsaren: http://localhost:8001/index.html
    
    
Rollbacks
- Gör alla starter ovan
- Testa manuellt
    - http://localhost:8000/backup_database 
    - http://localhost:8000/restore_database


-------

Test Struktur - API

- Varje resurs har en egen PHP testfil där testerna körs via dashboarden i webbläsaren och anropar API som en vanlig klient. Nedan specar hur filerna och flödet fungerar. 


Övergripande flöde i 9 delar (filspecifika detaljer i avsnitett under):

1. Dashboarden körs i wl (index.html) enl. avsnittet ovan

2. Starta testkörningen (index.js, runRequest(method, endpoint, data))
    - För varje resurs görs följande
    1. Backup av databasen (runRequest("POST", "/backup_database"))
        1. Skickar POST till API
        2. Routern tar emot
        3. BackupController körs
    2. Ladda testfilen - loadTestsForResource(resource, phpFilePath) - index.js
        1. Hämtar testfilen på servern (:8000) och runTests() körs i testfilen
        2. Bygger HTML (createTestCard(test)) 
            - Görs för varje returnerat test från testfilen (runTests())
    3. Återställer databasen (runRequest("POST", "/restore_database")) 
        1. Skickar POST till API
        2. Routern tar emot
        3. BackupController körs

3. Testfilen körs på serversidan (punkt 2.2 ovan) - resourceTest.php
    1. Kör testfunktioner och returnera JSON till index.js
        1. Kör alla testfunktioner (testPost200(), testPatch400())
        2. Samla körda testers resultat i en array
        3. Echoar arrayen (JSON) till index.js
        - Varje testfunktion använder: 
    2. Bygger upp requesten - runRequest(method, endpoint, data) - resourceTest.php
        1. Bygger URL på serversidan
        2. Skickar HTTP anrop med cURL
        3. JSON encode req. body / decode response
        4. Returnerar svar i detta format: ["status" => ..., "body" => ...], som API kollar

4. Routern tar emot anropet - Router(requestUrl) - router.php
    1. Läser URL-path/HTTP-metod
    2. Kör CORS +/ JSON middleware
    3. Skickar vidare till rätt controller

5. Controllern hanterar requesten - handle(method, input) - resourceController.php
    1. Anropar rätt service
    2. Fångar exeptions om något går fel
    3. Returnerar svar genom metoder beroende på exeption eller return-value
        - bubbleData, bubbleError, bubbleMessage
        - Här kollas felmeddelande/statuskoder som testernas $expected jämförs emot

6. Service kör logiken - getAll(), create() ... - resourceService.php
    1. Läser data. via DBAccess
    2. Validerar, filterar och uppdaterar
    3. Returnerar svar eller sätter $exc m. felmeddelanden som jämförs i controller (punkt 5.3) 

7. Databashantering - DBAccess.php/DBIO.php
    - Flödet: service -> DBAccess -> DBIO -> JSON-filer

8. Svaret går tillbaka 
    DBIO -> DBAccess -> Sevice -> Controller -> Router -> runRequest() (resourceTest.php) ->  
    runTest() (resourceTest.php) -> index.js -> HTML i dashboard 

9. Restore körs (rollback) - runRequest("POST", "/restore_database") - index.js
    - Återställer JSON till det den var när testet kördes
        


------

Filers ansvarsområden och funktioner

1. Router (alla tester körs här med)
    - Läser URL (plockar ut GET eller JSON-body) + metod
    - Kör CORS +/ JSON middleware
    - Anropar önskad controller
    
2. Controllers
    - Anropar rätt funktion i service
    - Fångar exeptions (errors)
    - Skickar rätt HTTP-status och svar (json/error msg)
    - Använder 3 "svarsfunktioner" 
        - bubbleData($data, $status) - returnerar data, 
        - bubbleMessage($msg, $status) - returnerar meddelanden, 
        - bubbleError($exc, $sender) - returnerar felmeddelande beroende på exc textinnehåll

3. Services
    - Hämtar data från DBAccess
    - Filtrerar, validerar ooch uppdaterar
    - Katsar exc vid fel med strängar som bubbleFuncs sedan mappar till rätt statusskoder (i controllers) 

4. DBAccess 
    - Ett "lager" runtom DBIO
    - Anropar DBIO med rätt resurs

5. DBIO
    - Läser och skriver över "databasen"
    - Används även av database backup/restore
    
5. Testfiler (resursTest.php)
    - runRequest() - cURL
        - Bygger URL (http://localhost:8000 + endpoint)
    - testFuncs () - 
        - $expected - skapar ett objekt med förväntad respons (enl. API docs)
        - $body/$query - sätts för varje enskilt test 
        - Anropar runRequest med 
    - runTests()
        - Kör alla testfunktioner (testGet200(), testPatch400())
        - Returnerar [ "resource" => "resource_name", "tests" => $tests ] // JSON som index.js läser
    
6. Dashboard (index.html, index.js)
    - index.html 
        - Har en fördefinerad div per resurs som js sedan "bygger ut"
    - index.js
        - loadTestsForResource(resourceName, phpFilePath)
        - runRequest(method, endpoint, data = null)
        - createTestCard(test)
        - compareResults(expected, actual)
        - runAllTests()
        
        
----