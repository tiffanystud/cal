// API-calls
// Här görs alla fetch från client

export async function apiRequest( {entity, method, body = null} ) {
    
    const options = {
        method: method.toUpperCase(),
        headers: { "Content-Type:": "application/json"}        
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    // ex. "/calendars", { method: "POST", headers: { headers: "Cont.."} }
    const response = await fetch(`/${entity}`, options); 
    const data = await response.json();
    
    if (!response) {
        throw new Error(data.error || "Unknown API error");
    }
    
    // Om ej data då
    return data; 
}