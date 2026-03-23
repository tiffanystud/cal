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

/* --- GET --- */

// 200 1
function testUsersGetAll_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            [
                "id" => "ID",
                "email" => "VALUE",
                "pwd" => "VALUE",
                "name" => "VALUE"
            ]
        ]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/users",
        data: null
    );

    return [
        "name" => "GET 200 (all users)",
        "method" => "GET",
        "endpoint" => "/users",
        "queryParams" => null,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Fetches all users"
    ];
}

// 200 2
function testUsersGetOne_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            "id" => "ID",
            "email" => "VALUE",
            "pwd" => "VALUE",
            "name" => "VALUE"
        ]
    ];

    $query = [
        "id" => "65e10aa11a001"
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/users",
        data: $query
    );

    return [
        "name" => "GET 200 (one user)",
        "method" => "GET",
        "endpoint" => "/users",
        "queryParams" => $query,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Fetches a specific user"
    ];
}

// 404
function testUsersGetOne_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "user not found"
        ]
    ];

    $query = [
        "id" => "000000000000"
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/users",
        data: $query
    );

    return [
        "name" => "GET 404 (one user)",
        "method" => "GET",
        "endpoint" => "/users",
        "queryParams" => $query,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "User does not exist"
    ];
}

function testUsersGetByCal_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            [
                "id" => "ID",
                "email" => "VALUE",
                "pwd" => "VALUE",
                "name" => "VALUE"
            ]
        ]
    ];
    $query = [
        "calId" => "65e10aa11b004"
    ];


    $actual = runRequest(
        method: "GET",
        endpoint: "/users",
        data: $query
    );

    return [
        "name" => "GET 200 (users in calendar))",
        "method" => "GET",
        "endpoint" => "/users",
        "queryParams" => $query,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Fetches user(s) of a specific calendar"
    ];
}

function testUsersGetByCal_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "Calendar not found"
        ]
    ];
    $query = [
        "calId" => "00000"
    ];


    $actual = runRequest(
        method: "GET",
        endpoint: "/users",
        data: $query
    );

    return [
        "name" => "GET 404 (users in calendar))",
        "method" => "GET",
        "endpoint" => "/users",
        "queryParams" => $query,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Fetches user(s) of a specific calendar"
    ];
}


/* --- POST --- */

// 201
function testUsersPost_201()
{
    $expected = [
        "status" => 201,
        "body" => [
            "id" => "ID",
            "email" => "VALUE",
            "pwd" => "VALUE",
            "name" => "VALUE"
        ]
    ];

    $body = [
        "name" => "Test User",
        "email" => "newuser@example.com",
        "pwd" => "123456"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/users",
        data: $body
    );

    return [
        "name" => "POST 201",
        "method" => "POST",
        "endpoint" => "/users",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Creates a new user"
    ];
}

// 400

function testUsersPost_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing fields"
        ]
    ];

    $body = [
        "name" => "",
        "email" => "",
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/users",
        data: $body
    );

    return [
        "name" => "POST 400",
        "method" => "POST",
        "endpoint" => "/users",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing required fields"
    ];
}

// 409
function testUsersPost_409()
{
    $expected = [
        "status" => 409,
        "body" => [
            "error" => "User already exists"
        ]
    ];

    $body = [
        "name" => "Duplicate",
        "email" => "frank@example.com", // existing email
        "pwd" => "123"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/users",
        data: $body
    );

    return [
        "name" => "POST 409",
        "method" => "POST",
        "endpoint" => "/users",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Email already in use"
    ];
}

/* ---- PATCH ---- */

// 200
function testUsersPatch_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            "message" => "Update OK"
        ]
    ];


    $body = [
        "id" => "65e10aa11a006",
        "name" => "Updated Name",
        "pwd" => "newpass"

    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/users",
        data: array_merge($body)
    );

    return [
        "name" => "PATCH 200",
        "method" => "PATCH",
        "endpoint" => "/users",
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Updates a user"
    ];
}

// 404
function testUsersPatch_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "User not found"
        ]
    ];

    $body = [
        "id" => "000000000000",
        "name" => "New Name"
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/users?id=65e10aa11hhyba006",
        data: array_merge($body)
    );

    return [
        "name" => "PATCH 404",
        "method" => "PATCH",
        "endpoint" => "/users",
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "User does not exist"
    ];
}


/*  ---- DELETE ---- */

// 200
function testUsersDelete_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            "message" => "User succesfully deleted"
        ]
    ];

    $body = [
        "id" => "65e10aa11a005",
        "email" => "eve@example.com",
        "pwd" => "pwd5"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/users?id=65e10aa11a006",
        data: $body
    );

    return [
        "name" => "DELETE 200",
        "method" => "DELETE",
        "endpoint" => "/users",
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Deletes a user"
    ];
}

// 404 
function testUsersDelete_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "User not found"
        ]
    ];

    $query = [
        "id" => "000000000000"
    ];

    $body = [
        "email" => "none@example.com",
        "pwd" => "123"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/users?id=65e10agbya11a006",
        data: array_merge($query, $body)
    );

    return [
        "name" => "DELETE 404",
        "method" => "DELETE",
        "endpoint" => "/users",
        "queryParams" => $query,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "User does not exist"
    ];
}






/* ---------- RUN ALL TESTS ---------- */

function runTests()
{
    $tests = [];
    
    $tests[] = testUsersGetAll_200(); 
    $tests[] = testUsersGetOne_200();
    $tests[] = testUsersGetOne_404(); 

    $tests[] = testUsersGetByCal_200();
    $tests[] = testUsersGetByCal_404();
    
    $tests[] = testUsersPost_201();
    $tests[] = testUsersPost_400();
    $tests[] = testUsersPost_409();
    
    $tests[] = testUsersPatch_200();
    $tests[] = testUsersPatch_404();
    
    $tests[] = testUsersDelete_200();
    $tests[] = testUsersDelete_404();
    
    return $tests;
}

echo json_encode(["tests" => runTests()], JSON_PRETTY_PRINT);
