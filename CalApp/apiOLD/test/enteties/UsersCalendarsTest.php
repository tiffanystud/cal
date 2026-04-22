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

function testGetAll_200()
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
        "name" => "GET 200 All",
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

function testGetUserId_200()
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

    $query=[
        "userId" => "65e10aa11a001"
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/users_calendars",
        data: $query
    );

    $result = [
        "name" => "GET 200 - userId",
        "method" => "GET",
        "endpoint" => "/users_calendars",
        "queryParams" => $query,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Returns all connections between one user and calendars."
    ];

    return $result;
};

function testGetUserId_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "User not found."
        ]
    ];

    $query=[
        "userId" => "65e10a001"
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/users_calendars",
        data: $query
    );

    $result = [
        "name" => "GET 400 - userId",
        "method" => "GET",
        "endpoint" => "/users_calendars",
        "queryParams" => $query,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "User not found."
    ];

    return $result;
};

function testGetCalId_200()
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

    $query=[
        "calId" => "65e10aa11b003"
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/users_calendars",
        data: $query
    );

    $result = [
        "name" => "GET 200 - calId",
        "method" => "GET",
        "endpoint" => "/users_calendars",
        "queryParams" => $query,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Returns all connections between one calendar and users."
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
            "error" => "Relation already exists."
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

function testPatch_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            "message" => "Admin status changed!"
        ]
    ];

    $body = [
        "userId" => "65e10aa11a001",
        "calId" => "65e10aa11b003"
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/users_calendars",
        data: $body
    );

    $result = [
        "name" => "PATCH 200",
        "method" => "PATCH",
        "endpoint" => "/users_calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "User admin status changed."
    ];

    return $result;
}

function testPatch_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "User ID missing."
        ]
    ];

    $body = [
        "calId" => "65e10aa11b003"
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/users_calendars",
        data: $body
    );

    $result = [
        "name" => "PATCH 400",
        "method" => "PATCH",
        "endpoint" => "/users_calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "User ID missing."
    ];

    return $result;
}

function testPatch_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "Calendar not found."
        ]
    ];

    $body = [
        "userId" => "65e10aa11a001",
        "calId" => "65e003"
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/users_calendars",
        data: $body
    );

    $result = [
        "name" => "PATCH 404",
        "method" => "PATCH",
        "endpoint" => "/users_calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Calendar not found."
    ];

    return $result;
}

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
            "error" => "User not found."
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
        "name" => "DELETE 404",
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
    $tests[] = testGetAll_200();
    $tests[] = testGetUserId_200();
    $tests[] = testGetCalId_200();
    $tests[] = testGetUserId_400();

    // POST
    $tests[] = testPost_201();
    $tests[] = testPost_400();
    $tests[] = testPost_404();
    $tests[] = testPost_409();    

    //PATCH
    $tests[] = testPatch_200();
    $tests[] = testPatch_400();
    $tests[] = testPatch_404();

    // DELETE
    $tests[] = testDelete_200();
    $tests[] = testDelete_400();
    $tests[] = testDelete_404();

    return $tests;
}



echo json_encode(["tests" => runTests()], JSON_PRETTY_PRINT);
