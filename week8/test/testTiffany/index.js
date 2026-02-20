
/* ---- RUN TESTS ---- */

async function runPhpTests() {

    /*  ----- USERS_AVAILABILITIES ----- */
    const availRes = await fetch("/resource/UsersAvailabilities.php");
    const availData = await availRes.json();

    // Skapa en DOM create frö tstkort som byggs
    document.querySelector("#availabilities .result-box").textContent =
        JSON.stringify(availData, null, 2);

        

    /*  ----- USERS_RSVP ----- */
/*     const rsvpRes = await fetch("/resource/UsersRSVP.php");
    const rsvpData = await rsvpRes.json();

    document.querySelector("#rsvp .result-box").textContent =
        JSON.stringify(rsvpData, null, 2); */
}

// runPhpTests();

