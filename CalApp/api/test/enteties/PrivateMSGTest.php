<?php

function runRequest($method, $endpoint, $data = null)
{
    $url = "http://localhost:8000" . $endpoint;

    if ($method === "GET" && $data !== null) {
        $queryString = http_build_query($data);
        $url = $url . "?" . $queryString;
    }

    $curlReq = curl_init($url);

    curl_setopt($curlReq, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlReq, CURLOPT_CUSTOMREQUEST, $method);

    if ($method !== "GET" && $data !== null) {
        $jsonBody = json_encode($data);
        $jsonHeader = ["Content-Type: application/json"];
        curl_setopt($curlReq, CURLOPT_POSTFIELDS, $jsonBody);
        curl_setopt($curlReq, CURLOPT_HTTPHEADER, $jsonHeader);
    }

    $responseBody = curl_exec($curlReq);
    $responseCode = curl_getinfo($curlReq, CURLINFO_HTTP_CODE);

    $decodedBody = json_decode($responseBody, true);

    if ($decodedBody === null && $responseBody !== "") {
        $decodedBody = $responseBody;
    }
    if ($responseBody === "") {
        $decodedBody = null;
    }

    return [
        "status" => $responseCode,
        "body" => $decodedBody
    ];
}


/* ---------- GET ---------- */

// 200
function testPrivMsgGet_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            [
                "id" => "ID",
                "senderId" => "ID",
                "receiverId" => "ID",
                "date" => "YYYY-MM-DD",
                "time" => "HH:MM:SS",
                "content" => "VALUE",
                "hasChange" => true
            ]
        ]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/private_msg",
        data: null
    );

    return [
        "name" => "GET 200",
        "method" => "GET",
        "endpoint" => "/private_msg",
        "queryParams" => null,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Fetches all private messages"
    ];
}


/* ---------- POST ---------- */

// 200
function testPrivMsgPost_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            "message" => "Message is send to receiver"
        ]
    ];

    $body = [
        "userId" => "65e10aa11a001",
        "receiverId" => "65e10aa11a002",
        "content" => "Hello!"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/private_msg",
        data: $body
    );

    return [
        "name" => "POST 200",
        "method" => "POST",
        "endpoint" => "/private_msg",
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Sends a private message"
    ];
}


// 400
function testPrivMsgPost_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Bad request"
        ]
    ];

    $body = [
        "userId" => "65e10aa11a001",
        "content" => "Missing receiver"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/private_msg",
        data: $body
    );

    return [
        "name" => "POST 400",
        "method" => "POST",
        "endpoint" => "/private_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing required fields"
    ];
}


// 404
function testPrivMsgPost_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "The receiver doesn't exist"
        ]
    ];

    $body = [
        "userId" => "65e10aa11a001",
        "receiverId" => "000000000000",
        "content" => "Hello?"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/private_msg",
        data: $body
    );

    return [
        "name" => "POST 404",
        "method" => "POST",
        "endpoint" => "/private_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Receiver does not exist"
    ];
}



/* ---------- PATCH ---------- */

// 200
function testPrivMsgPatch_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            "message" => "Successfully update message"
        ]
    ];

    $body = [
        "privMsgId" => "65e10aa152001",
        "content" => "Updated content"
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/private_msg",
        data: $body
    );

    return [
        "name" => "PATCH 200",
        "method" => "PATCH",
        "endpoint" => "/private_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Updates a private message"
    ];
}


// 400
function testPrivMsgPatch_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Bad request"
        ]
    ];

    $body = [
        "content" => "Missing ID"
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/private_msg",
        data: $body
    );

    return [
        "name" => "PATCH 400",
        "method" => "PATCH",
        "endpoint" => "/private_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing privMsgId or content"
    ];
}


// 404
function testPrivMsgPatch_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "The message couldn't be found"
        ]
    ];

    $body = [
        "privMsgId" => "000000000000",
        "content" => "Hello?"
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/private_msg",
        data: $body
    );

    return [
        "name" => "PATCH 404",
        "method" => "PATCH",
        "endpoint" => "/private_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Message does not exist"
    ];
}



/* ---------- DELETE ---------- */

// 200
function testPrivMsgDelete_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            "message" => "The message successfully deleted"
        ]
    ];

    $body = [
        "privMsgId" => "65e10aa152001"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/private_msg",
        data: $body
    );

    return [
        "name" => "DELETE 200",
        "method" => "DELETE",
        "endpoint" => "/private_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Deletes a private message"
    ];
}


// 400
function testPrivMsgDelete_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Bad request"
        ]
    ];

    $body = [];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/private_msg",
        data: $body
    );

    return [
        "name" => "DELETE 400",
        "method" => "DELETE",
        "endpoint" => "/private_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing privMsgId"
    ];
}


// 404
function testPrivMsgDelete_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "The message couldn't be found"
        ]
    ];

    $body = [
        "privMsgId" => "000000000000"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/private_msg",
        data: $body
    );

    return [
        "name" => "DELETE 404",
        "method" => "DELETE",
        "endpoint" => "/private_msg",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Message does not exist"
    ];
}



/* ---------- ALL TESTS ---------- */

function runTests()
{
    $tests = [];

    // GET
    $tests[] = testPrivMsgGet_200();

    // POST
    $tests[] = testPrivMsgPost_200();
    $tests[] = testPrivMsgPost_400();
    $tests[] = testPrivMsgPost_404();

    // PATCH
    $tests[] = testPrivMsgPatch_200();
    $tests[] = testPrivMsgPatch_400();
    $tests[] = testPrivMsgPatch_404();

    // DELETE
    $tests[] = testPrivMsgDelete_200();
    $tests[] = testPrivMsgDelete_400();
    $tests[] = testPrivMsgDelete_404();

    return [
        "resource" => "private_msg",
        "tests" => $tests
    ];
}

echo json_encode(runTests(), JSON_PRETTY_PRINT);

