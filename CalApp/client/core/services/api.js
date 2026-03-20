
// API-calls - alla som använder denna funktionen ska wrappa fetchen med try/catch

// Entity (matcha i router.php)
export async function apiRequest({ entity, method, body = null }) {

    console.log(`RECEIVED REQUEST: ${entity} ${method} ${body} -`)

    const options = {
        method: method.toUpperCase(),
        headers: { "Content-Type": "application/json" }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const BASE_URL = "http://localhost:8000";

    let response;

    try {

        response = await fetch(`${BASE_URL}/${entity}`, options);

    } catch (err) {

        console.error("Network error:", err);
        PubSub.publish("Network::Error");

        // Ge komponenten det den behöver för att förstå men inte stanna upp
        return null;
    }

    // Handle type of !ok from api
    if (response.status === 404) {
        console.warn("404 Not Found: ", entity);
        return [];
    }

    if (response.status === 400) {
        console.warn("400 Bad Request: ", entity);
        return null;
    }
    
    if (response.status === 409) {
        console.warn("409 Bad Request: ", entity);
        return null;
    }
    
    // Throw error om annat serverfel, kanske annat alt här?
    if (!response.ok) {
        console.error("Server error: ", response.status);
        return null;
    }

    // Från erik: Status måste alltid returneras och en (ev. tom) body + status
    const data = await response.json();
    return data;
    
}