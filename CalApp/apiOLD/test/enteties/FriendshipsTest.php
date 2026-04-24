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

/* ---------------- FRIENDSHIPS ---------------- */


function testGet_200()
{
    $expected = [
        "status" => 200,
        "body" => [[
            "id" => "id",
            "name" => "name"
        ]]
    ];
    $query=[
        "userId" => "65e10aa11a001"
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/friendships",
        data: $query
    );

    $result = [
        "name" => "GET 200",
        "method" => "GET",
        "endpoint" => "/friendships",
        "queryParams" => $query,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Returns all friends of user."
    ];

    return $result;
};

function testPost_200()
{
    $expected = [
        "status" => 201,
        "body" => [
            "id" => "ID",
            "userId1" => "ID",
            "userId2" => "ID"
        ]
    ];

    $body = [
        "userId1" => "65e10aa11a001",
        "userId2" => "65e10aa11a00a"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/friendships",
        data: $body
    );

    $result = [
        "name" => "POST 200",
        "method" => "POST",
        "endpoint" => "/friendships",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Friendship created."
    ];

    return $result;

};


function testPost_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "User not found!"
        ]
    ];

    $body = [
        "userId1" => "6001",
        "userId2" => "65e10aa11a00a"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/friendships",
        data: $body
    );

    $result = [
        "name" => "POST 404",
        "method" => "POST",
        "endpoint" => "/friendships",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "User not found."
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
        "userId1" => "65e10aa11a001",
        "userId2" => "65e10aa11a00a"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/friendships",
        data: $body
    );

    $result = [
        "name" => "DELETE 200",
        "method" => "DELETE",
        "endpoint" => "/friendships",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Friendship deleted."
    ];

    return $result;
};

function testDelete_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes."
        ]
    ];

    $body = [
        "userId1" => "65e10aa11a001"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/friendships",
        data: $body
    );

    $result = [
        "name" => "DELETE 400",
        "method" => "DELETE",
        "endpoint" => "/friendships",
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
        "userId1" => "dsjgh01",
        "userId2" => "65e10aa11a00a"

    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/friendships",
        data: $body
    );

    $result = [
        "name" => "DELETE 404",
        "method" => "DELETE",
        "endpoint" => "/friendships",
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
    $tests[] = testPost_200();
    $tests[] = testPost_404();


    // DELETE
    $tests[] = testDelete_200();
    $tests[] = testDelete_400();
    $tests[] = testDelete_404();

    return $tests;
}



echo json_encode(["tests" => runTests()], JSON_PRETTY_PRINT);
