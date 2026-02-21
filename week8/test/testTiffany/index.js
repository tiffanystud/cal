
/* ---- RUN TESTS ---- */

console.log("START AV INDEX.JS")

async function loadTestsForResource(resourceName, phpFilePath) {

    console.log("Fetching:", phpFilePath);

    const response = await fetch(phpFilePath).catch(err => {
        console.error("FETCH ERROR:", err);
    });

    if (!response) {
        console.error("No response object returned at all");
        return;
    }

    console.log("Response status:", response.status);

    let text = await response.text();
    console.log("RAW RESPONSE TEXT:", text);

    // Försök tolka JSON
    let data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        console.error("JSON PARSE ERROR:", e);
        return;
    }

    console.log("Parsed JSON:", data);

    const container = document.querySelector(`#${resourceName} .tests-container`);
    console.log("Container:", container);

    if (!data.tests) {
        console.error("data.tests saknas!");
        return;
    }

    data.tests.forEach(test => {
        const card = createTestCard(test);
        container.appendChild(card);
    });
}



/* ----------------------------------------------------
   BYGG ETT TESTKORT
---------------------------------------------------- */

function createTestCard(test) {

    const card = document.createElement("div");
    card.classList.add("test-card");

    // PASS / FAIL
    const isPass = compareResults(test.expected, test.actual);
    card.classList.add(isPass ? "pass" : "fail");

    // Titel
    const title = document.createElement("h3");
    title.textContent = `${test.method} ${test.endpoint} — ${test.name}`;
    card.appendChild(title);

    // Info-text
    const info = document.createElement("p");
    info.classList.add("info");
    info.textContent = test.info;
    card.appendChild(info);

    // Expandable details
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Visa detaljer";
    details.appendChild(summary);

    // Request
    const req = document.createElement("pre");
    req.textContent = JSON.stringify({
        queryParams: test.queryParams,
        requestBody: test.requestBody
    }, null, 2);
    details.appendChild(req);

    // Expected
    const exp = document.createElement("pre");
    exp.textContent = JSON.stringify(test.expected, null, 2);
    details.appendChild(exp);

    // Actual
    const act = document.createElement("pre");
    act.textContent = JSON.stringify(test.actual, null, 2);
    details.appendChild(act);

    card.appendChild(details);

    return card;
}


/* ----------------------------------------------------
   JÄMFÖR EXPECTED VS ACTUAL
---------------------------------------------------- */

function compareResults(expected, actual) {

    // Jämför status
    if (expected.status !== actual.status) {
        return false;
    }

    // Försök tolka actual.body som JSON
    let actualBody = actual.body;
    try {
        actualBody = JSON.parse(actual.body);
    } catch (e) {
        // om det inte är JSON, behåll raw
    }

    // Jämför body
    return JSON.stringify(expected.body) === JSON.stringify(actualBody);
}

/* ----------------------------------------------------
   STARTA ALLA TESTER
---------------------------------------------------- */

async function runAllTests() {

    console.log("START AV runAllTests")

    await loadTestsForResource(
        "usersAvailabilities",
        "/resources/UsersAvailabilities.php"
    );

    // await loadTestsForResource("users", "resources/Users.php");
    // await loadTestsForResource("groups", "resources/Groups.php");
}

runAllTests();


