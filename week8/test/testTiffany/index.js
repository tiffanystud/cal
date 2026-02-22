async function loadTestsForResource(resourceName, phpFilePath) {


    const response = await fetch(phpFilePath).catch(err => {
    });

    if (!response) {
        return;
    }


    let text = await response.text();

    // Försök tolka som JSOn
    let data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        return;
    }


    const container = document.querySelector(`#${resourceName} .tests-container`);

    if (!data.tests) {
        return;
    }

    data.tests.forEach(test => {
        const card = createTestCard(test);
        container.appendChild(card);
    });
}

async function runRequest(method, endpoint, data = null) {

    let url = endpoint;

    // When db (backup/restore)
    if (endpoint === "/backup_database" || endpoint === "/restore_database") { url = "http://localhost:8000" + endpoint; } 
/*     if (endpoint === "/backup_database" || endpoint === "/restore_database") { 
        
        if (endpoint === "/backup_database" ) {
            url = "http://localhost:8000/controllers/BackupDBController.php" 
        }
        if (endpoint === "/restore_database" ) {
            url = "http://localhost:8000/controllers/RestoreDBController.php" 
        }
        
    } */
    
    // Om GET, bygg querystring
    if (method === "GET" && data) {
        const params = new URLSearchParams(data).toString();
        url = `${endpoint}?${params}`;
    }

    const options = {
        method: method,
        headers: {}
    };

    // Om POST/PATCH/DELETE → skicka JSON-body
    if (method !== "GET" && data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const text = await response.text();

    let body;
    try {
        body = JSON.parse(text);
    } catch {
        body = text;
    }

    return {
        status: response.status,
        body: body
    };
}



/* --------- Build Test card ------ */
function createTestCard(test) {

    const card = document.createElement("div");
    card.classList.add("test-card");

    // Sätt rätt klass om expected och actual är samma
    const isPass = compareResults(test.expected, test.actual);
    card.classList.add(isPass ? "pass" : "fail");

    /* ---- Kort ----- */
    // Titel
    const title = document.createElement("h3");
    title.textContent = `${test.method} ${test.endpoint} - (${test.name})`;
    card.appendChild(title);

    // Infotext
    const info = document.createElement("p");
    info.classList.add("info");
    info.textContent = test.info;
    card.appendChild(info);

    /* ---- Details ----- */
    // Container för Details
    const details = document.createElement("details");

    const summary = document.createElement("summary");
    summary.textContent = "Show details";
    details.appendChild(summary);

    /* -- Received Response --- */
    const actTitle = document.createElement("h4");
    actTitle.textContent = "Received Response";
    details.appendChild(actTitle);

    const act = document.createElement("pre");
    act.textContent = JSON.stringify(test.actual, null, 2);
    details.appendChild(act);

    /* -- Expected Response --- */
    const expTitle = document.createElement("h4");
    expTitle.textContent = "Expected Response";
    details.appendChild(expTitle);

    const exp = document.createElement("pre");
    exp.textContent = JSON.stringify(test.expected, null, 2);
    details.appendChild(exp);

    /* -- Sent Request --- */
    const reqTitle = document.createElement("h4");
    reqTitle.textContent = "Sent Request";
    details.appendChild(reqTitle);

    const req = document.createElement("pre");
    req.textContent = JSON.stringify({
        queryParams: test.queryParams,
        requestBody: test.requestBody
    }, null, 2);
    details.appendChild(req);

    card.appendChild(details);

    return card;
}



/* ---- Jämför response med expected ----------- */
function compareResults(expected, actual) {

    // 1. Jämför status
    if (expected.status !== actual.status) {
        return false;
    }

    // 2. Försök tolka actual.body som JSON
    let actualBody = actual.body;

    try {
        actualBody = JSON.parse(actual.body);
    } catch (e) {
        // behåll raw om det inte går att parsa
    }

    // 3. Om expected.body är ett objekt (t.ex. error)
    if (!Array.isArray(expected.body)) {

        // actual måste också vara ett objekt
        if (typeof actualBody !== "object" || actualBody === null) {
            return false;
        }

        // kontrollera att alla expected-nycklar finns i actual
        for (let key in expected.body) {
            if (!(key in actualBody)) {
                return false;
            }
        }

        return true;
    }

    // 4. Om expected.body är en array (t.ex. [ {…} ])
    if (Array.isArray(expected.body)) {

        // actual måste också vara en array
        if (!Array.isArray(actualBody)) {
            return false;
        }

        // expected-body har alltid exakt 1 objekt i dina tester
        const expectedObj = expected.body[0];
        const actualObj = actualBody[0];

        // actual måste ha ett objekt
        if (typeof actualObj !== "object" || actualObj === null) {
            return false;
        }

        // kontrollera att alla expected-nycklar finns i actual
        for (let key in expectedObj) {
            if (!(key in actualObj)) {
                return false;
            }
        }

        return true;
    }

    return false;
}





/*  ------- Kör alla test -------- */
async function runAllTests() {

    console.log("START AV runAllTests")

    /* -- Rollback start -- */
    // Initialisera rollback funktionaliter
    await runRequest("POST", "/backup_database");
    
    
    /* -- Resources -- */
    await loadTestsForResource(
        "usersAvailabilities",
        "/resources/UsersAvailabilitiesTest.php"
    );

    // await loadTestsForResource("users", "resources/Users.php");
    // await loadTestsForResource("groups", "resources/Groups.php");
    
    
    /* -- Rollback end -- */
    // Gör rollback efter alla test
    await runRequest("POST", "/restore_database");
}

runAllTests();


