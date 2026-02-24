<?php

error_log("---------In EventsRSVPTest.php. - row 3");
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



// 200
function testCalendarGet_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            [
                "id" => "ID",
                "creatorId" => "ID",
                "name" => "STRING",
                "type" => "string"
            ]
        ]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/calendars",
        data: null
    );

    return [
        "name" => "GET 200",
        "method" => "GET",
        "endpoint" => "/calendars",
        "queryParams" => null,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Fetches all calendars messages"
    ];
}



// 200 QUERY
function testCalendarGetQuery_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            [
                "id" => "ID",
                "creatorId" => "ID",
                "name" => "STRING",
                "type" => "string"
            ]
        ]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/calendars",
        data: null
    );

    return [
        "name" => "GET 200",
        "method" => "GET",
        "endpoint" => "/calendars",
        "queryParams" => ["id" => "65e10aa11b003"],
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Fetches calendar for user"
    ];
}

// 404 query
function testCalendarGetQuery_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            [
               "error" => "No calendars found by id"
            ]
        ]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/calendars",
        data: null
    );

    return [
        "name" => "GET 404",
        "method" => "GET",
        "endpoint" => "/calendars",
        "queryParams" => ["id" => "123"],
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Gives error for user"
    ];
}






// 404
function testCalendarGet_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            [
              "error" => "No calendars found"
            ]
        ]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/calendars",
        data: null
    );

    return [
        "name" => "GET 200",
        "method" => "GET",
        "endpoint" => "/calendars",
        "queryParams" => null,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Fetches all calendars"
    ];
}




//POST//
// 201
function testCalendarPost_201()
{
    $expected = [
        "status" => 201,
        "body" => [
            [
              "id" => "ID",
              "creatorId" => "ID",
              "name" => "STRING",
              "type" => "STRING"
            ]
        ]
    ];

    $body = [
        "creatorId" => "2",
        "name" => "testGroup",
        "type" => "public"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/calendars",
        data: null
    );

    return [
        "name" => "POST 201",
        "method" => "POST",
        "endpoint" => "/calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Sends "
    ];
}



// 400
function testCalendarPost_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            [
             "error" => "Attributes missing"
            ]
        ]
    ];

    $body = [
        "name" => "testGroup",
        "type" => "public"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/calendars",
        data: null
    );

    return [
        "name" => "POST 400",
        "method" => "POST",
        "endpoint" => "/calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing attributes"
    ];
}


// Kolla denna koden i service
// 409
function testCalendarPost_409()
{
    $expected = [
        "status" => 409,
        "body" => [
            [
             "error" => "User is already in group with same name"
            ]
        ]
    ];

    $body = [
        "name" => "testGroup",
        "type" => "public"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/calendars",
        data: null
    );

    return [
        "name" => "POST 409",
        "method" => "POST",
        "endpoint" => "/calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => ""
    ];
}



//PATCH//

// 200
function testCalendarPatch_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            [
              "id" => "ID",
              "creatorId" => "ID",
              "name" => "STRING",
              "type" => "STRING"
            ]
        ]
    ];

    $body = [
        "id" => "65e10aa11b003",
        "name" => "changedNameTest",
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/calendars",
        data: null
    );

    return [
        "name" => "PATCH 200",
        "method" => "PATCH",
        "endpoint" => "/calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Sends "
    ];
}


// 400
function testCalendarPatch_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            [
              "id" => "ID",
              "creatorId" => "ID",
              "name" => "STRING",
              "type" => "STRING"
            ]
        ]
    ];

    $body = [
        "name" => "changedNameTest",
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/calendars",
        data: null
    );

    return [
        "name" => "PATCH 400",
        "method" => "PATCH",
        "endpoint" => "/calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Sends "
    ];
}


//DELETE//

//200

function testCalendarDelete_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            [
              "id" => "ID",
              "creatorId" => "ID",
              "name" => "STRING",
              "type" => "STRING"
            ]
        ]
    ];

    $body = [
        "id" => "65e10aa11b003"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/calendars",
        data: null
    );

    return [
        "name" => "DELETE 200",
        "method" => "PATCH",
        "endpoint" => "/calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Sends "
    ];
}

//400

function testCalendarDelete_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            [
                "error" => "Calendar doesent exist"
            ]
        ]
    ];

    $body = [
        "id" => "124"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/calendars",
        data: null
    );

    return [
        "name" => "DELETE 400",
        "method" => "PATCH",
        "endpoint" => "/calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Sends "
    ];
}









/* ---------- RUN ALL TESTS ---------- */

function runTests()
{
    return [
        testCalendarGet_200(),
        testCalendarGet_404(),
        // testCalendarGet_400(),

        testCalendarGetQuery_200(),
        testCalendarGetQuery_404(),

        testCalendarPost_201(),
        testCalendarPost_400(),
        // testCalendarPost_409(),

        testCalendarPatch_200(),
        testCalendarPatch_400(),
        // testCalendarPatch_404(),

        testCalendarDelete_200(),
        testCalendarDelete_400(),
        // testCalendarDelete_404()
    ];
}

echo json_encode(["tests" => runTests()], JSON_PRETTY_PRINT);
