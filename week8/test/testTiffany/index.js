// GENERELL TEST-FETCHER 

async function runTest({ url, method = "GET", body = null, targetId }) {
    
    const card = document.querySelector(`#${targetId}`);
    const box = card.querySelector(".result-box");

    try {
        const request = await fetch(url, {
            method,
            headers: body ? { "Content-Type": "application/json" } : {},
            body: body ? JSON.stringify(body) : null
        });

        let response;
        const contentType = request.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            response = await request.json();
        } else {
            response = await request.text();
        }

        card.style.borderColor = request.ok ? "green" : "red";

        box.textContent = 
            typeof response === "string"
                ? response
                : JSON.stringify(response, null, 2);


    } catch (err) {
        card.style.backgroundColor = "red";
        card.innerHTfML = `<p>ERROR</p><pre>${err}</pre>`;
    }
}



/* ----- RESOURCE 1 (users/events etc) ------- */
// Kolla i original för hur funktionerna kan struktureras upp




/* ----- RESOURCE 2 (users/events etc) ------- */

// Kolla i original för hur funktionerna kan struktureras upp



    


/* ---- RUN TESTS ---- */

async function runPhpTests() {

    // 1. USERS_AVAILABILITIES
    const availRes = await fetch("tests_users_availabilities.php");
    const availData = await availRes.json();

    document.querySelector("#availabilities .result-box").textContent =
        JSON.stringify(availData, null, 2);


    // 2. USERS_RSVP
    const rsvpRes = await fetch("tests_users_rsvp.php");
    const rsvpData = await rsvpRes.json();

    document.querySelector("#rsvp .result-box").textContent =
        JSON.stringify(rsvpData, null, 2);
}

runPhpTests();

