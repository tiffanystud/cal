
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
    