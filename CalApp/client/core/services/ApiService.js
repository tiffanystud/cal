
// API-calls - alla som använder denna funktionen ska wrappa fetchen med try/catch

// Entity (matcha i router.php)
export async function apiRequest({ entity, method, body = null }) {

    // console.log(`RECEIVED REQUEST: ${entity} ${method} ${body} -`)

    const options = {
        method: method.toUpperCase(),
        headers: { "Content-Type": "application/json" }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const BASE_URL = "http://localhost:8000";

    let response;
    let responseData;

    try {

        response = await fetch(`${BASE_URL}/${entity}`, options);
        responseData = await response.json();

    } catch (err) {
        PubSub.publish("Network::Error");

        // Ge komponenten det den behöver för att förstå men inte stanna upp
        return null;
    }

    // Handle type of !ok from api
    if (response.status === 404) {
        throw responseData;
    }

    if (response.status === 400) {
        throw responseData;
    }

    if (response.status === 409) {
        throw responseData;
    }

    // Throw error om annat serverfel, kanske annat alt här?
    if (!response.ok) {
        throw responseData;
    }

    // Från erik: Status måste alltid returneras och en (ev. tom) body + status
    const data = await response.json();
    return data;

}