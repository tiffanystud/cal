
// API-calls - alla som använder denna funktionen ska wrappa fetchen med try/catch
/*  
{ 
    entity: "users", 
    method: "POST", 
    body = {} 
} 
*/

// Entity (matcha i router.php)
export async function APIRequest({ entity, method, body = null }) {

    // DEVELOPMENT
    console.log(`RECEIVED REQUEST: ${entity} ${method} ${body} -`);

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

        // DEVELOPMENT
        /*         console.log(`RECEIVED RESPONSE AND RESOURCE:`);
                console.log("Response:", response);
                console.log("Resource:", responseData); */

    } catch (err) {
        PubSub.publish("Network::Error");

        // Ge komponenten det den behöver för att förstå men inte stanna upp
        return null;
    }

    // Handle type of !ok from api
    if (response.status === 404) {
        return responseData;
    }

    if (response.status === 400) {
        return responseData;
    }

    if (response.status === 409) {
        return responseData;
    }

    // Throw error om annat serverfel, kanske annat alt här?
    if (!response.ok) {
        return responseData;
    }

    // Från erik: Status måste alltid returneras och en (ev. tom) body + status
    // const data = await response.json();
    return responseData;

}