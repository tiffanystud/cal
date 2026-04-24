
------

Instruktioner för att köra test:

1. Starta API (terminal 1)
    1. Serva hela api-mappen (calApp/api) med port 8000.
        1. cd calApp/api 
        2. php -S localhost:8000
    2. Nu körs API på port 8000 (http://localhost:8000)


2. Starta test/dashboard (terminal 2)
    1. Serva testmappen (testName) med port 8001 (php -S localhost:8000)
        1. cd calApp/api/test
        2. php -S localhost:8001
    2. Nu körs dashboard på port 8001


3. Kör test
    1. Skriv in på webbläsaren: http://localhost:8001/index.html
    
    
Rollbacks
- Gör alla starter ovan
- Testa rollback manuellt
    1. http://localhost:8000/backup_database 
    2. http://localhost:8000/restore_database


-------

Test Struktur - API

- Varje entitet har en egen PHP testfil där testerna körs via dashboarden i webbläsaren och anropar API som en vanlig klient. Nedan specar hur filerna och flödet fungerar. 

--

Övergripande flöde i 9 delar (filspecifika detaljer i avsnitett under):

1. Dashboarden körs i webbläsaren (index.html) enl. avsnittet ovan

2. Testkörningen startas - index.js - runRequest(method, endpoint, data)
    - För varje entitet görs följande
    1. Backup av databasen (runRequest("POST", "/backup_database"))
        1. Skickar POST till API
        2. Routern tar emot
        3. BackupController körs
    2. Ladda testfilen - loadTestsForResource(entity, phpFilePath) - index.js
        1. Hämtar testfilen på servern (:8000) och runTests() körs i testfilen
        2. Bygger HTML (createTestCard(test)) 
            - Görs för varje returnerat test från testfilen (runTests())
    3. Återställer databasen (runRequest("POST", "/restore_database")) 
        1. Skickar POST till API
        2. Routern tar emot
        3. RestoreController körs

3. Testfilen körs på api-sidan (punkt 2.2 ovan) - entityTest.php
    1. Kör testfunktioner och returnera JSON till index.js
        1. Kör alla testfunktioner (testPost200(), testPatch400())
        2. Samla körda testers resultat i en array
        3. Echoar arrayen (JSON) till index.js
        - Varje testfunktion använder: 
    2. Bygger upp requesten - runRequest(method, endpoint, data) - entityTest.php
        1. Bygger URL på serversidan
        2. Skickar HTTP anrop med cURL
        3. JSON encode req. body / decode response
        4. Returnerar svar i detta format: ["status" => ..., "body" => ...], som API kollar

4. Routern tar emot anropet - Router(requestUrl) - router.php
    1. Läser URL-path/HTTP-metod
    2. Kör CORS +/ JSON middleware
    3. Skickar vidare till rätt controller

5. Controllern hanterar requesten - handle(method, input) - entityController.php
    1. Anropar rätt service
    2. Fångar exeptions om något går fel
    3. Returnerar svar genom metoder beroende på exeption eller return-value
        - bubbleData, bubbleError, bubbleMessage
        - Här kollas felmeddelande/statuskoder som testernas $expected jämförs emot

6. Service kör logiken - getAll(), create() ... - entityService.php
    1. Läser data. via DBAccess
    2. Validerar, filterar och uppdaterar
    3. Returnerar svar eller sätter $exc m. felmeddelanden som jämförs i controller (punkt 5.3) 

7. Databashantering - DBAccess.php/DBIO.php
    - Flödet: service -> DBAccess -> DBIO -> JSON-filer

8. Svaret går tillbaka 
    DBIO -> DBAccess -> Sevice -> Controller -> Router -> runRequest() (entityTest.php) ->  
    runTest() (entityTest.php) -> index.js -> HTML i dashboard 

9. Restore körs (rollback) - runRequest("POST", "/restore_database") - index.js
    - Återställer JSON till det den var när testet kördes
        


------

Filers ansvarsområden och funktioner (ingående info för /test)

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
    - Anropar DBIO med rätt entitet

5. DBIO
    - Läser och skriver över "databasen"
    - Används även av backup/restore database
    
--

5. Testfiler (entitetTest.php)
    - runRequest() - cURL
        - Bygger URL (http://localhost:8000 + endpoint)
    - testFuncs () - 
        - $expected - skapar ett objekt med förväntad respons (enl. API docs)
        - $body/$query - sätts för varje enskilt test 
        - Anropar runRequest med
    - runTests()
        - Kör alla testfunktioner (testGet200(), testPatch400())
        - Returnerar [ "entity" => "entity_name", "tests" => $tests ] // JSON som index.js läser
    
6. Test Dashboard (index.html, index.js)
    - index.html 
        - Har en fördefinerad div per entitet som js sedan "bygger ut"
    - index.js
        - runAllTests()
            - körs direkt
            - Kör för varje entitet: 
                1. runRequest(db backup), 
                2. loadTestsForResource(htmlID, entityTest.php), 
                3. runRequest(db restore)
        - loadTestsForResource(entityName, phpFilePath)
            1. Fetchar på angiven filePath (:8000)
            2. Hämtar entity HTML div
            3. Sparar returnerad testArray i data.test
                - Anropar createTestCard() för varje data.test
                - Appendar detta till entityDiv
        - runRequest(method, endpoint, data = null)
            - Används för att köra en request direkt från index.js (tester från testfilerna)
                - "/backup_database" och "/restore_database" kör från index.js
            1. Bygger URL och kör fetchanrop
        - createTestCard(test)
            1. Bygger HTML-"kort" för varje test per entitye
                - Visar: testnamn,  metod + endpint, expected data, recieved/actual data, info, och färg
        - compareResults(expected, actual)
            - Används av createTestCard för att markera grönt eller rött
            1. Jämför:
                - keys i expected och actual (value ej av intresse) 
                - statuskod i expected och actual
            2. Returnerar t/f
        
----