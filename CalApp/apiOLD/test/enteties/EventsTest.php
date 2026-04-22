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

function testGetAll_200() {
    $expected = [
        "status" => 200,
        "body" => [
            [
                "id" => "ID",
                "type" => "type",
                "name" => "name",
                "description" => "description",
                "location" => "location",
                "needsConfirmation" => false,
                "participationLimits" => null,
                "tags" => null,
                "calId" => "ID"
            ]
        ]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/events",
        data: null
    );

    $result = [
        "name" => "GET 200 (all events)",
        "method" => "GET",
        "endpoint" => "/events",
        "queryParams" => null,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Returns all events"
    ];

    return $result;
}

function testGetOne_200() {
    $expected = [
        "status" => 200,
        "body" => [
            "id" => "ID",
            "type" => "type",
            "name" => "name",
            "description" => "description",
            "location" => "location",
            "needsConfirmation" => false,
            "participationLimits" => null,
            "tags" => null,
            "calId" => "ID"
        ]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/events",
        data: [
            "eventId" => "699c6d0e23afe"
        ]
    );

    $result = [
        "name" => "GET 200",
        "method" => "GET",
        "endpoint" => "/events",
        "queryParams" => [
            "eventId" => "699c6d0e23afe"
        ],
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Returns a specific event depending on ID in param"
    ];

    return $result;
}

function testGetOne_404() {
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "Event not found"
        ]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/events",
        data: [
            "eventId" => "fakeId"
        ]
    );

    $result = [
        "name" => "GET 404 - Event not found",
        "method" => "GET",
        "endpoint" => "/events",
        "queryParams" => [
            "eventId" => "fakeId"
        ],
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "If not event was found for param ID"
    ];

    return $result;
}

function testPost_201() {
    $expected = [
        "status" => 201,
        "body" => [
            "id" => "ID",
            "type" => "type",
            "name" => "name",
            "date" => "date",
            "time" => "time",
            "description" => "description",
            "location" => "location",
            "needsConfirmation" => false,
            "participationLimits" => null,
            "tags" => null,
            "calId" => "ID"
        ]
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/events",
        data: [
            "type" => "Test",
            "name" => "Test event",
            "date" => "2026-03-10",
            "time" => "12:00",
            "description" => "Bleh bleh bleh",
            "location" => "Saudi",
            "needsConfirmation" => true,
            "calId" => "65e10aa11b001"
        ]
    );

    $result = [
        "name" => "POST 201 (Create new event)",
        "method" => "POST",
        "endpoint" => "/events",
        "queryParams" => null,
        "requestBody" => [
            "type" => "Test",
            "name" => "Test event",
            "description" => "Bleh bleh bleh",
            "location" => "Saudi",
            "needsConfirmation" => true
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Create new event"
    ];

    return $result;
}

function testPost_400() {
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
        ]
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/events",
        data: [
            "type" => "Test",
            "name" => "Test event",
            "description" => "Bleh bleh bleh",
            "needsConfirmation" => true
        ]
    );

    $result = [
        "name" => "POST 400 (Missing attributes)",
        "method" => "POST",
        "endpoint" => "/events",
        "queryParams" => null,
        "requestBody" => [
            "type" => "Test",
            "name" => "Test event",
            "description" => "Bleh bleh bleh",
            "needsConfirmation" => true
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing attributes when trying to create event"
    ];

    return $result;
}

function testPost_404() {
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "Cal not found"
        ]
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/events",
        data: [
            "type" => "Test",
            "name" => "Test event",
            "description" => "Bleh bleh bleh",
            "location" => "Saudi",
            "needsConfirmation" => true,
            "calId" => "fakeId"
        ]
    );

    $result = [
        "name" => "POST 404 (Not found)",
        "method" => "POST",
        "endpoint" => "/events",
        "queryParams" => null,
        "requestBody" => [
            "type" => "Test",
            "name" => "Test event",
            "description" => "Bleh bleh bleh",
            "location" => "Saudi",
            "needsConfirmation" => true,
            "calId" => "fakeId"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "No caldendar found with provided calId"
    ];

    return $result;
}

function testPatch_200() {
    $expected = [
        "status" => 200,
        "body" => [
            "id" => "ID",
            "type" => "type",
            "name" => "name",
            "description" => "description",
            "location" => "location",
            "needsConfirmation" => false,
            "participationLimits" => null,
            "tags" => null,
            "calId" => "ID"
        ]
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/events",
        data: [
            "eventId" => "699c6d0e23afe",
            "location" => "Saudi",
            "calId" => "65e10aa11b001"
        ]
    );

    $result = [
        "name" => "PTACH 200 (Event patched)",
        "method" => "PATCH",
        "endpoint" => "/events",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "699c6d0e23afe",
            "location" => "Saudi",
            "calId" => "65e10aa11b001"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Event was successfully patched"
    ];

    return $result;
}

function testPatch_400() {
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
         ]
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/events",
        data: [
            "eventId" => "699c6d0e23afe",
            "calId" => "65e10aa11b001"
        ]
    );

    $result = [
        "name" => "PATCH 400 (Missing attributes)",
        "method" => "PATCH",
        "endpoint" => "/events",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "699c6d0e23afe",
            "calId" => "65e10aa11b001"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "PATCH missing attributes"
    ];

    return $result;
}

function testPatch_404() {
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "Not found"
         ]
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/events",
        data: [
            "eventId" => "699c6d0e23afe",
            "location" => "Saudi",
            "calId" => "fakeId"
        ]
    );

    $result = [
        "name" => "PATCH 404 (Not found)",
        "method" => "PATCH",
        "endpoint" => "/events",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "699c6d0e23afe",
            "location" => "Saudi",
            "calId" => "fakeId"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Could not find either cal or event with ids provided"
    ];

    return $result;
}

function testDelete_200() {
    $expected = [
        "status" => 200,
        "body" => [
            "success" => "Event deleted successfully"
         ]
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/events",
        data: [
            "eventId" => "699c6d0e23afe",
            "calId" => "65e10aa11b001"
        ]
    );

    $result = [
        "name" => "DELETE 200 (Event deleted)",
        "method" => "DELETE",
        "endpoint" => "/events",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "699c6d0e23afe",
            "calId" => "65e10aa11b001"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Event was deleted"
    ];

    return $result;
}

function testDelete_400() {
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
         ]
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/events",
        data: [
            "eventId" => "699c6d0e23afe"
        ]
    );

    $result = [
        "name" => "DELETE 400 (Missing attributes)",
        "method" => "DELETE",
        "endpoint" => "/events",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "699c6d0e23afe"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing attributes when trying to delete event"
    ];

    return $result;
}

function testDelete_404() {
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "Not found"
         ]
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/events",
        data: [
            "eventId" => "699c6d0e23afe",
            "calId" => "fakeId"
        ]
    );

    $result = [
        "name" => "DELETE 404 (Not found)",
        "method" => "DELETE",
        "endpoint" => "/events",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "699c6d0e23afe",
            "calId" => "fakeId"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Event not found with provided calId and eventId"
    ];

    return $result;
}

function runTests()
{
    $tests = [];
    
    $tests[] = testGetAll_200(); 
    $tests[] = testGetOne_200();
    $tests[] = testGetOne_404(); 
    
    $tests[] = testPost_201();
    $tests[] = testPost_400();
    $tests[] = testPost_404();
    
    $tests[] = testPatch_200();
    $tests[] = testPatch_400();
    $tests[] = testPatch_404();
    
    $tests[] = testDelete_200();
    $tests[] = testDelete_400();
    $tests[] = testDelete_404();
    
    return $tests;
}

echo json_encode(["tests" => runTests()], JSON_PRETTY_PRINT);
?>