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
async function runFunctions() {
    // RESOURCE 1


    // RESOURCE 2

}

// runFunctions();