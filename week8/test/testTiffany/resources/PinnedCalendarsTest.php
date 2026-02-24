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
function testPinnedCalendarGet_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            [
                "id" => "ID",
                "userId" => "ID",
                "calId" => "STRING"
            ]
        ]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/users_pinned_calendars",
        data: null
    );

    return [
        "name" => "GET 200",
        "method" => "GET",
        "endpoint" => "/users_pinned_calendars",
        "queryParams" => null,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Fetches all pinned calendars"
    ];
}



// 200 QUERY
function testPinnedCalendarGetQuery_200()
{
    $expected = [
        "status" => 200,
        "body" =>  [
            [
            "id" => "ID",
            "userId" => "ID",
            "calId" => "STRING"
            ]
        ]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/users_pinned_calendars?userId=65e10aa11a002",
        data: null
    );

    return [
        "name" => "GETQUERY 200",
        "method" => "GET",
        "endpoint" => "/users_pinned_calendars",
        "queryParams" => ["userId" => "65e10aa11a002"],
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Fetches pinned calendars for user"
    ];
}

// 404 query
function testPinnedCalendarGetQuery_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "UserId missing"
        ]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/users_pinned_calendars?id",
        data: null
    );

    return [
        "name" => "GETQUERY 404",
        "method" => "GET",
        "endpoint" => "/users_pinned_calendars",
        "queryParams" => ["id"],
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Cant find any pinned calendars for user"
    ];
}




//POST//
// 201
function testPinnedCalendarPost_201()
{
    $expected = [
        "status" => 201,
        "body" => [
            "userId" => "ID",
            "calId" => "STRING"
        ]
    ];

    $body = [
        "userId" => "2",
        "calId" => "3"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/users_pinned_calendars",
        data: $body
    );

    return [
        "name" => "POST 201",
        "method" => "POST",
        "endpoint" => "/users_pinned_calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Creates pinned calendar for users"
    ];
}



// 400
function testPinnedCalendarPost_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Attributes missing"
        ]
    ];

    $body = [
        "calId" => "3"
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/users_pinned_calendars",
        data: $body
    );

    return [
        "name" => "POST 400",
        "method" => "POST",
        "endpoint" => "/users_pinned_calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing attributes"
    ];
}


// // Kolla denna koden i service
// // 409
// function testCalendarPost_409()
// {
//     $expected = [
//         "status" => 409,
//         "body" => [
//             "error" => "User is already in group with same name"
//         ]
//     ];

//     $body = [
//         "name" => "testGroup",
//         "type" => "public"
//     ];

//     $actual = runRequest(
//         method: "POST",
//         endpoint: "/calendars",
//         data: $body
//     );

//     return [
//         "name" => "POST 409",
//         "method" => "POST",
//         "endpoint" => "/calendars",
//         "queryParams" => null,
//         "requestBody" => $body,
//         "expected" => $expected,
//         "actual" => $actual,
//         "info" => ""
//     ];
// }



//DELETE//

//200

function testPinnedCalendarDelete_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            "id" => "ID",
            "userId" => "ID",
            "calId" => "STRING"
        ]
    ];

    $body = [
        "id" => "65e10aa11e003"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/users_pinned_calendars",
        data: $body
    );

    return [
        "name" => "DELETE 200",
        "method" => "DELETE",
        "endpoint" => "/users_pinned_calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Deletes users pinned calendar"
    ];
}

//400

function testPinnedCalendarDelete_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Calendar doesent exist"
        ]
    ];

    $body = [
        "id" => "124"
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/users_pinned_calendars",
        data: $body
    );

    return [
        "name" => "DELETE 400",
        "method" => "DELETE",
        "endpoint" => "/users_pinned_calendars",
        "queryParams" => null,
        "requestBody" => $body,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Users calendar doesent exist"
    ];
}









/* ---------- RUN ALL TESTS ---------- */

function runTests()
{
    return [
        testPinnedCalendarGet_200(),
        // testCalendarGet_400(),

        testPinnedCalendarGetQuery_200(),
        testPinnedCalendarGetQuery_404(),

        testPinnedCalendarPost_201(),
        testPinnedCalendarPost_400(),
        // testCalendarPost_409(),

        testPinnedCalendarDelete_200(),
        testPinnedCalendarDelete_400(),
        // testCalendarDelete_404()
    ];
}

echo json_encode(["tests" => runTests()], JSON_PRETTY_PRINT);
