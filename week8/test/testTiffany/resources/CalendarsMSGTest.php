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

/* ---------------- CALENDAR MSG ---------------- */

/* ---------- GET ---------- */

// 200
function testCalMsgGet_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            [
                "id" => "ID",
                "senderId" => "ID",
                "calId" => "ID",
                "date" => "YYYY-MM-DD",
                "time" => "HH:MM:SS",
                "content" => "VALUE",
                "hasChanged" => true
            ]
        ]
    ];

    $query = [
        "senderID" => "65e10aa11a001",
        "calID" => "65e10aa11b001"
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/calendar_msg",
        data: $query
    );

    return [
        "name" => "GET 200",
        "method" => "GET",
        "endpoint" => "/calendar_msg",
        "queryParams" => $query,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Fetches all messages for a calendar"
    ];
}

// 400
function testCalMsgGet_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
        ]
    ];

    $query = [
        "senderID" => "65e10aa11a001"
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/calendar_msg",
        data: $query
    );

    return [
        "name" => "GET 400",
        "method" => "GET",
        "endpoint" => "/calendar_msg",
        "queryParams" => $query,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing senderId or calId"
    ];
}

// 404
function testCalMsgGet_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "Messages not found"
        ]
    ];

    $query = [
        "senderID" => "65e10aa11a999",
        "calID" => "65e10aa11b999"
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/calendar_msg",
        data: $query
    );

    return [
        "name" => "GET 404",
        "method" => "GET",
        "endpoint" => "/calendar_msg",
        "queryParams" => $query,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "No messages found for this calendar"
    ];
}





/* ---------- POST ---------- */


// 201
function testCalMsgPost_201()
{
    $expected = [
        "status" => 201,
        "body" => [
            "id" => "ID",
            "senderId" => "ID",
            "calId" => "ID",
            "date" => "YYYY-MM-DD",
            "time" => "HH:MM:SS",
            "content" => "VALUE",
            "hasChanged" => false
        ]
    ];

    $body = [
        "senderID" => "65e10aa11a001",
        "calID" => "65e10aa11b001",
        "content" => "Hello calendar!"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/calendar_msg",
        data: $body
    );

    return [
        "name" => "POST 201",
        "method" => "POST",
        "endpoint" => "/calendar_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Creates a new calendar message"
    ];
}




// 400
function testCalMsgPost_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
        ]
    ];

    $body = [
        "senderID" => "65e10aa11a001",
        "calID" => "65e10aa11b001"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/calendar_msg",
        data: $body
    );

    return [
        "name" => "POST 400",
        "method" => "POST",
        "endpoint" => "/calendar_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing required fields"
    ];
}

// 404
function testCalMsgPost_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "Invalid calendar"
        ]
    ];

    $body = [
        "senderID" => "65e10aa11a001",
        "calID" => "000000000000",
        "content" => "Hello?"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/calendar_msg",
        data: $body
    );

    return [
        "name" => "POST 404",
        "method" => "POST",
        "endpoint" => "/calendar_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Calendar does not exist"
    ];
}




/* ---------- PATCH ---------- */

// 200
function testCalMsgPatch_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            "id" => "ID",
            "senderId" => "ID",
            "calId" => "ID",
            "date" => "YYYY-MM-DD",
            "time" => "HH:MM:SS",
            "content" => "VALUE",
            "hasChanged" => true
        ]
    ];

    $body = [
        "id" => "65e10aa15c001",
        "content" => "Updated message"
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/calendar_msg",
        data: $body
    );

    return [
        "name" => "PATCH 200",
        "method" => "PATCH",
        "endpoint" => "/calendar_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Updates a calendar message"
    ];
}





// 400
function testCalMsgPatch_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
        ]
    ];

    $body = [
        "content" => "Missing ID"
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/calendar_msg",
        data: $body
    );

    return [
        "name" => "PATCH 400",
        "method" => "PATCH",
        "endpoint" => "/calendar_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing id or content"
    ];
}




// 404
function testCalMsgPatch_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "Message not found"
        ]
    ];

    $body = [
        "id" => "000000000000",
        "content" => "Hello?"
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/calendar_msg",
        data: $body
    );

    return [
        "name" => "PATCH 404",
        "method" => "PATCH",
        "endpoint" => "/calendar_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Message does not exist"
    ];
}




/* ---------- DELETE ---------- */

// 200
function testCalMsgDelete_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            "id" => "ID",
            "senderId" => "ID",
            "calId" => "ID",
            "date" => "YYYY-MM-DD",
            "time" => "HH:MM:SS",
            "content" => "VALUE",
            "hasChanged" => true
        ]
    ];

    $body = [
        "id" => "65e10aa15c001"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/calendar_msg",
        data: $body
    );

    return [
        "name" => "DELETE 200",
        "method" => "DELETE",
        "endpoint" => "/calendar_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Deletes a calendar message"
    ];
}




// 400
function testCalMsgDelete_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
        ]
    ];

    $body = [];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/calendar_msg",
        data: $body
    );

    return [
        "name" => "DELETE 400",
        "method" => "DELETE",
        "endpoint" => "/calendar_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing id"
    ];
}


// 404
function testCalMsgDelete_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "Message not found"
        ]
    ];

    $body = [
        "id" => "000000000000"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/calendar_msg",
        data: $body
    );

    return [
        "name" => "DELETE 404",
        "method" => "DELETE",
        "endpoint" => "/calendar_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Message does not exist"
    ];
}


/* ---------- RUN ALL TESTS ---------- */

function runTests()
{
    return [
        testCalMsgGet_200(),
        testCalMsgGet_400(),
        testCalMsgGet_404(),

        testCalMsgPost_201(),
        testCalMsgPost_400(),
        testCalMsgPost_404(),

        testCalMsgPatch_200(),
        testCalMsgPatch_400(),
        testCalMsgPatch_404(),

        testCalMsgDelete_200(),
        testCalMsgDelete_400(),
        testCalMsgDelete_404()
    ];
}

echo json_encode(["tests" => runTests()], JSON_PRETTY_PRINT);
