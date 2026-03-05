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

/* ---------------- EVENTS_RSVP ---------------- */

/* ---------- GET ---------- */

function testGet_200()
{
    $expected = [
        "status" => 200,
        "body" => [[
                "id" => "ID",
                "eventId" => "ID",
                "userId" => "ID",
                "date" => "YYYY-MM-DD",
                "isGoing" => "VALUE",
                "reminder" => true
        ]]
    ];

    $query = [
        "eventId" => "65e10aa11c001",
        "userId" => "65e10aa11a002"
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/events_rsvp",
        data: $query
    );

    $result = [
        "name" => "GET 200",
        "method" => "GET",
        "endpoint" => "/events_rsvp",
        "queryParams" => $query,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Returns existing RSVP"
    ];

    return $result;
}


function testGet_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "RSVP not found"
        ]
    ];

    $query = [
        "eventId" => "65e10aa11c001",
        "userId" => "65e10aa11a009"
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/events_rsvp",
        data: $query
    );

    $result = [
        "name" => "GET 404",
        "method" => "GET",
        "endpoint" => "/events_rsvp",
        "queryParams" => $query,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "No RSVP exists for this event + user"
    ];

    return $result;
}


// 400
function testGet_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
        ]
    ];

    $query = [
        "eventId" => "65e10aa11c001"
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/events_rsvp",
        data: $query
    );

    $result = [
        "name" => "GET 400",
        "method" => "GET",
        "endpoint" => "/events_rsvp",
        "queryParams" => $query,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing userId or eventId"
    ];

    return $result;
}




/* ---------- POST ---------- */


// 201
function testPost_201() {
    $expected = [
        "status" => 201,
        "body" => [
                "id" => "ID",
                "eventId" => "ID",
                "userId" => "ID",
                "date" => "YYYY-MM-DD",
                "isGoing" => "VALUE",
                "reminder" => true
        ]
    ];
    
    $body = [
        "eventId" => "65e10aa11c002",
        "userId" => "65e10aa11a003",
        "isGoing" => "yes",
        "reminder" => true
    ];

    $actual = runRequest(
        method: "POST", 
        endpoint: "/events_rsvp",
        data: $body
    );

    $result = [
        "name" => "POST 201",
        "method" => "POST",
        "endpoint" => "/events_rsvp",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Creates a new RSVP"
    ];
    
    return $result;
}




// 400
function testPost_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
        ]
    ];
    
    $body = [
        "eventId" => "65e10aa11c002",
        "userId" => "65e10aa11a003",
        "isGoing" => "yes"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/events_rsvp",
        data: $body
    );

    $result = [
        "name" => "POST 400",
        "method" => "POST",
        "endpoint" => "/events_rsvp",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Required fields missing"
    ];
    
    return $result;
}


// 409
function testPost_409()
{
    $expected = [
        "status" => 409,
        "body" => [
            "error" => "RSVP already exists"
        ]
    ];
    
    $body = [
        "eventId" => "65e10aa11c001",
        "userId" => "65e10aa11a002",
        "isGoing" => "maybe",
        "reminder" => true
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/events_rsvp",
        data: $body
    );

    $result = [
        "name" => "POST 409",
        "method" => "POST",
        "endpoint" => "/events_rsvp",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Duplicate RSVP"
    ];
    
    return $result;
}




/* ---------- PATCH ---------- */

// 200
function testPatch_200(){
    $expected = [
        "status" => 200,
        "body" => [
            "id" => "ID",
            "eventId" => "ID",
            "userId" => "ID",
            "date" => "YYYY-MM-DD",
            "isGoing" => "VALUE",
            "reminder" => true
        ]
    ];
    
    $body = [
        "eventId" => "65e10aa11c003",
        "userId" => "65e10aa11a005",
        "isGoing" => "no",
        "reminder" => false
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/events_rsvp",
        data: $body
    );

    $result = [
        "name" => "PATCH 200",
        "method" => "PATCH",
        "endpoint" => "/events_rsvp",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Updates RSVP"
    ];
    
    return $result;
}




// 400
function testPatch_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
        ]
    ];
    
    $body = [
        "eventId" => "65e10aa11c003",
        "userId" => "65e10aa11a005",
        "isGoing" => "yes"
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/events_rsvp",
        data: $body
    );

    $result = [
        "name" => "PATCH 400",
        "method" => "PATCH",
        "endpoint" => "/events_rsvp",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing required fields"
    ];
    
    return $result;
}



// 404
function testPatch_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "RSVP not found"
        ]
    ];
    
    $body = [
        "eventId" => "65e10aa11c009",
        "userId" => "65e10aa11a009",
        "isGoing" => "yes",
        "reminder" => true
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/events_rsvp",
        data: $body
    );

    $result = [
        "name" => "PATCH 404",
        "method" => "PATCH",
        "endpoint" => "/events_rsvp",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "No RSVP to update"
    ];
    
    return $result;
}




/* ---------- DELETE ---------- */

// 200
function testDelete_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            "id" => "ID",
            "eventId" => "ID",
            "userId" => "ID",
            "date" => "YYYY-MM-DD",
            "isGoing" => "VALUE",
            "reminder" => true
        ]
    ];
    
    $body = [
        "eventId" => "65e10aa11c008",
        "userId" => "65e10aa11a007"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/events_rsvp",
        data: $body
    );

    $result = [
        "name" => "DELETE 200",
        "method" => "DELETE",
        "endpoint" => "/events_rsvp",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Deletes RSVP"
    ];
    
    return $result;
}



// 400
function testDelete_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
        ]
    ];
    
    $body = [
        "eventId" => "65e10aa11c008"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/events_rsvp",
        data: $body
    );

    $result = [
        "name" => "DELETE 400",
        "method" => "DELETE",
        "endpoint" => "/events_rsvp",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing userId or eventId"
    ];
    
    return $result;
}


// 404
function testDelete_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "RSVP not found"
        ]
    ];
    
    $body = [
        "eventId" => "65e10aa11c004",
        "userId" => "65e10aa11a001"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/events_rsvp",
        data: $body
    );

    $result = [
        "name" => "DELETE 404",
        "method" => "DELETE",
        "endpoint" => "/events_rsvp",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "No RSVP to delete"
    ];
    
    return $result;
}



/* ---------- RUN ALL TESTS ---------- */

function runTests()
{
    return [
        testGet_200(),
        testGet_404(),
        testGet_400(),

        testPost_201(),
        testPost_400(),
        testPost_409(),

        testPatch_200(),
        testPatch_400(),
        testPatch_404(),

        testDelete_200(),
        testDelete_400(),
        testDelete_404()
    ];
}

echo json_encode(["tests" => runTests()], flags: JSON_PRETTY_PRINT);
