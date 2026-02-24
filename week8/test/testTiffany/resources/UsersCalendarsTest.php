<?php

error_log("---------In UsersCalendarsTest.php. - row 3");
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

    
    // Testa som JSON annars Text?
    $decodedBody = json_decode($responseBody, true);
    
    if ($decodedBody === null && $responseBody !== "") {
        $decodedBody = $responseBody;
    }
    if ($responseBody === "") {
        $decodedBody = null;
    }

    $response = [
        "status" => $responseCode,
        "body" => $decodedBody
    ];

    return $response;

}

/* ---------------- USERS_CALENDARS ---------------- */

function testGet_200()
{
    $expected = [
        "status" => 200,
        "body" => [[
            "id" => "ID", 
            "userId" => "ID", 
            "calId" => "ID", 
            "isAdmin" => "bool"
        ]]
    ];
    $actual = runRequest(
        method: "GET",
        endpoint: "/users_calendars"
    );

    $result = [
        "name" => "GET 200",
        "method" => "GET",
        "endpoint" => "/users_calendars",
        "queryParams" => null,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Returns all connections between users and calendars"
    ];

    return $result;
};

function testPost_201()
{
    $expected = [
        "status" => 201,
        "body" => [
            "id" => "ID", 
            "userId" => "ID", 
            "calId" => "ID", 
            "isAdmin" => false
        ]
    ];

    $body = [
        "userId" => "65e10aa11a001",
        "calId" => "65e10aa11b003"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/users_calendars",
        data: $body
    );

    $result = [
        "name" => "POST 201",
        "method" => "POST",
        "endpoint" => "/users_calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Connection created. (User joined calendar)."
    ];

    return $result;

};

function testPost_400()
{
        $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
        ]
    ];

    $body = [
        "userId" => "65e10aa11a001",
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/users_calendars",
        data: $body
    );

    $result = [
        "name" => "POST 400",
        "method" => "POST",
        "endpoint" => "/users_calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Required fields missing"
    ];

    return $result;
}

function testPost_404()
{
        $expected = [
        "status" => 404,
        "body" => [
            "error" => "User not found"
        ]
    ];

    $body = [
        "userId" => "65eda",
        "calId" => "65e10aa11b003"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/users_calendars",
        data: $body
    );

    $result = [
        "name" => "POST 404",
        "method" => "POST",
        "endpoint" => "/users_calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "User not found."
    ];

    return $result;
};

function testPost_409()
{
    $expected = [
        "status" => 409,
        "body" => [
            "error" => "User already in calendar"
        ]
    ];

    $body = [
        "userId" => "65e10aa11a001",
        "calId" => "65e10aa11b003"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/users_calendars",
        data: $body
    );

    $result = [
        "name" => "POST 409",
        "method" => "POST",
        "endpoint" => "/users_calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Connection already exists."
    ];

    return $result;

};

function testDelete_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            "message" => "Deleted successfully!"
        ]
    ];

    $body = [
        "userId" => "65e10aa11a001",
        "calId" => "65e10aa11b003"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/users_calendars",
        data: $body
    );

    $result = [
        "name" => "DELETE 200",
        "method" => "DELETE",
        "endpoint" => "/users_calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "User removed from calendar."
    ];

    return $result;
};

function testDelete_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Calendar ID missing."
        ]
    ];

    $body = [
        "userId" => "65e10aa11a001"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/users_calendars",
        data: $body
    );

    $result = [
        "name" => "DELETE 400",
        "method" => "DELETE",
        "endpoint" => "/users_calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Required fields missing."
    ];

    return $result;
};

function testDelete_404(){
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "User ."
        ]
    ];

    $body = [
        "userId" => "dsjgh01",
        "calId" => "65e10aa11b003"

    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/users_calendars",
        data: $body
    );

    $result = [
        "name" => "DELETE 200",
        "method" => "DELETE",
        "endpoint" => "/users_calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "User not found."
    ];

    return $result;
}





/* ---------- RUN ALL TESTS ---------- */

function runTests()
{
    $tests = [];

    // GET
    $tests[] = testGet_200();

    // POST
    $tests[] = testPost_201();
    $tests[] = testPost_400();
    $tests[] = testPost_404();
    $tests[] = testPost_409();    


    // DELETE
    $tests[] = testDelete_200();
    $tests[] = testDelete_400();
    $tests[] = testDelete_404();

    return $tests;
}



echo json_encode(["tests" => runTests()], JSON_PRETTY_PRINT);
