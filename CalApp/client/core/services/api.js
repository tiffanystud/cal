// API-calls


export async function apiRequest( {entity, method, body = null} ) {
    
    const options = {
        method: method.toUpperCase(),
        headers: { "Content-Type:": "application/json"}        
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    const response = await fetch("../../../api/controllers/router.php"); 
    const data = await response.json();
    
    if (!response) {
        throw new Error(data.error || "Unknown API error");
    }
    
    return data; 
}