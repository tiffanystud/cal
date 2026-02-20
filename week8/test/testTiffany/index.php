<?php

function runRequest($method, $endpoint, $data = null)
{
    $url = "http://localhost:8000" . $endpoint;
    
    // Vid GETT bygg query m params
    if ($method === "GET" && $data !== null) {
        
        $queryString = http_build_query($data);
        $url = $url . "?" . $queryString;
        
    }

    $curlReq = curl_init($url);
    
    // Svar som ttext och sätt HTTP metod
    curl_setopt($curlReq, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlReq, CURLOPT_CUSTOMREQUEST, $method);
    
    if ($method !== "GET" && $data !== null) {
        
        $jsonBody = json_encode($data);
        $jsonHeader = ["Content-Type: application/json"];
        
        // Sätt rättt headers
        curl_setopt($curlReq, CURLOPT_POSTFIELDS, $jsonBody);
        curl_setopt($curlReq, CURLOPT_HTTPHEADER, $jsonHeader);
        
    }
    
    // Kör requesten och hämta datan
    $responseBody = curl_exec($curlReq);
    $responseCode = curl_getinfo($curlReq, CURLINFO_HTTP_CODE);
    
    // Stäng curl
    curl_close($curlReq);

    $response = ["status" => $responseCode, "body" => $responseBody]; 
    return $response;
    
}


/* ------ USERS_AVAILABILITIES ------ */

/* --- GET --- */

// 200
echo runRequest(
    method: "GET", 
    endpoint: "/users_availabilities?userId=65e10aa11a001&date=2026-03-01");

// 404
echo runRequest(
    method: "GET", 
    endpoint: "/users_availabilities?userId=65e10aa11a001&date=0000-00-00");

// 400
echo runRequest(
    method: "GET", 
    endpoint: "/users_availabilities?userId=65e10aa11a001");


/* --- POST --- */

// 201
echo runRequest(
    method: "POST", 
    endpoint: "/users_availabilities",
    data:[
        "userId" => "65e10aa11a00a",
        "date" => "2026-03-20",
        "isAvailable" => false,
        "calId" => "65e10aa11b005",
    ]);

// 400
echo runRequest(
    method: "POST", 
    endpoint: "/users_availabilities",
    data:[
        "userId" => "65e10aa11a00a",
        "date" => "2026-03-20",
        "isAvailable" => false,
        // "calId" => "65e10aa11b005",
    ]);


// 404
echo runRequest(
    method: "POST", 
    endpoint: "/users_availabilities",
    data:[
        "userId" => "65e10aa11a00a",
        "date" => "2026-03-20",
        "isAvailable" => false,
        "calId" => "000000000000",
    ]);

// 409
echo runRequest(
    method: "POST", 
    endpoint: "/users_availabilities",
    data:[
        "userId" => "65e10aa11a001",
        "date" => "2026-03-01",
        "isAvailable" => false,
        "calId" => "65e10aa11b001",
    ]);
    
    

/* --- PATCH --- */

// 201
echo runRequest(
    method: "PATCH", 
    endpoint: "/users_availabilities",
    data:[
        "userId" => "65e10aa11a001",
        "date" => "2026-03-01",
        "isAvailable" => false,
        "calId" => "65e10aa11b001",
    ]);
    
// 204
echo runRequest(
    method: "PATCH", 
    endpoint: "/users_availabilities",
    data:[
        "userId" => "65e10aa11a001",
        "date" => "2026-03-01",
        "isAvailable" => false,
        "calId" => "65e10aa11b001",
    ]);

// 400
echo runRequest(
    method: "PATCH", 
    endpoint: "/users_availabilities",
    data:[
        "userId" => "65e10aa11a00a",
        "date" => "2026-03-20",
        "isAvailable" => false,
        // "calId" => "65e10aa11b005",
    ]);


// 404
echo runRequest(
    method: "PATCH", 
    endpoint: "/users_availabilities",
    data:[
        "userId" => "65e10aa11a00a",
        "date" => "0000-00-00",
        "isAvailable" => false,
        "calId" => "65e10aa11b005",
    ]);

    
/* --- DELETE --- */

// 200
echo runRequest(
    method: "DELETE", 
    endpoint: "/users_availabilities",
    data:[
        "userId" => "65e10aa11a00a",
        "date" => "2026-03-20",
        "calId" => "65e10aa11b005",
    ]);

// 400
echo runRequest(
    method: "DELETE", 
    endpoint: "/users_availabilities",
    data:[
        "userId" => "65e10aa11a00a",
        "date" => "2026-03-20",
        // "calId" => "65e10aa11b005",
    ]);


// 404
echo runRequest(
    method: "DELETE", 
    endpoint: "/users_availabilities",
    data:[
        "userId" => "000000000000",
        "date" => "2026-03-20",
        "calId" => "65e10aa11b005",
    ]);

    
