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
    
    // Stäng curl
    curl_close($curlReq);

    $response = ["status" => $responseCode, "body" => $responseBody]; 
    return $response;
    
}


/* ------ USERS_AVAILABILITIES ------ */

/* -- GET -- */

// 200
function testGet_200()
{
    $expected = [
        "status" => 200,
        "body" => ["message" => "whatever your service returns"]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "65e10aa11a001",
            "date" => "2026-03-01"
        ]
    );

    $result = [
        "name" => "GET 200",
        "expected" => $expected,
        "actual" => $actual
    ];
    
    return $result;
    
}


// 404
function testGet_404()
{
    $expected = [
        "status" => 404,
        "body" => ["error" => "Availability not found"]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "65e10aa11a001",
            "date" => "0000-00-00"
        ]
    );

    $result = [
        "name" => "GET 404",
        "expected" => $expected,
        "actual" => $actual
    ];
    
    return $result;
}


// 400
function testGet_400()
{
    $expected = [
        "status" => 400,
        "body" => ["error" => "Missing attributes"]
    ];

    $actual = runRequest(
        method: "GET",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "65e10aa11a001"
        ]
    );

    $result = [
        "name" => "GET 400",
        "expected" => $expected,
        "actual" => $actual
    ];
    
    return $result;
    
}



/* -- POST -- */

// 201
function testPost_201()
{
    $expected = [
        "status" => 201,
        "body" => ["message" => "created"]
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "65e10aa11a00a",
            "date" => "2026-03-20",
            "isAvailable" => false,
            "calId" => "65e10aa11b005"
        ]
    );

    $result = [
        "name" => "POST 201",
        "expected" => $expected,
        "actual" => $actual
    ];
    
    return $result;
}


// 400
function testPost_400()
{
    $expected = [
        "status" => 400,
        "body" => ["error" => "Missing attributes"]
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "65e10aa11a00a",
            "date" => "2026-03-20",
            "isAvailable" => false
        ]
    );

    $result = [
        "name" => "POST 400",
        "expected" => $expected,
        "actual" => $actual
    ];
    
    return $result;
    
}


// 404
function testPost_404()
{
    $expected = [
        "status" => 404,
        "body" => ["error" => "User or calendar not found"]
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "65e10aa11a00a",
            "date" => "2026-03-20",
            "isAvailable" => false,
            "calId" => "000000000000"
        ]
    );

    $result = [
        "name" => "POST 404",
        "expected" => $expected,
        "actual" => $actual
    ];
    
    return $result;
    
}


// 409
function testPost_409()
{
    $expected = [
        "status" => 409,
        "body" => ["error" => "Availability already exists"]
    ];

    $actual = runRequest(
        method: "POST",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "65e10aa11a001",
            "date" => "2026-03-01",
            "isAvailable" => false,
            "calId" => "65e10aa11b001"
        ]
    );

    $result = [
        "name" => "POST 409",
        "expected" => $expected,
        "actual" => $actual
    ];
    
    return $result;
    
}



/* -- PATCH -- */

// 201
function testPatch_201()
{
    $expected = [
        "status" => 200,
        "body" => ["message" => "updated"]
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "65e10aa11a001",
            "date" => "2026-03-01",
            "isAvailable" => false,
            "calId" => "65e10aa11b001"
        ]
    );

    $result = [
        "name" => "PATCH 201",
        "expected" => $expected,
        "actual" => $actual
    ];
    
    return $result;
    
}


// 204
function testPatch_204()
{
    $expected = [
        "status" => 204,
        "body" => null
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "65e10aa11a001",
            "date" => "2026-03-01",
            "isAvailable" => false,
            "calId" => "65e10aa11b001"
        ]
    );

    $result = [
        "name" => "PATCH 204",
        "expected" => $expected,
        "actual" => $actual
    ];
    
    return $result;
    
}


// 400
function testPatch_400()
{
    $expected = [
        "status" => 400,
        "body" => ["error" => "Missing attributes"]
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "65e10aa11a00a",
            "date" => "2026-03-20",
            "isAvailable" => false
        ]
    );

    $result = [
        "name" => "PATCH 400",
        "expected" => $expected,
        "actual" => $actual
    ];
    
    return $result;
    
}


// 404
function testPatch_404()
{
    $expected = [
        "status" => 404,
        "body" => ["error" => "Availability not found"]
    ];

    $actual = runRequest(
        method: "PATCH",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "65e10aa11a00a",
            "date" => "0000-00-00",
            "isAvailable" => false,
            "calId" => "65e10aa11b005"
        ]
    );

    $result = [
        "name" => "PATCH 404",
        "expected" => $expected,
        "actual" => $actual
    ];
    
    return $result;
    
}



/* -- DELETE -- */

// 200
function testDelete_200()
{
    
    $expected = [
        "status" => 200,
        "body" => ["message" => "deleted"]
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "65e10aa11a00a",
            "date" => "2026-03-20",
            "calId" => "65e10aa11b005"
        ]
    );

    $result = [
        "name" => "DELETE 200",
        "expected" => $expected,
        "actual" => $actual
    ];
    
    return $result;
    
}


// 400
function testDelete_400()
{
    $expected = [
        "status" => 400,
        "body" => ["error" => "Missing attributes"]
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "65e10aa11a00a",
            "date" => "2026-03-20"
        ]
    );

    $result = [
        "name" => "DELETE 400",
        "expected" => $expected,
        "actual" => $actual
    ];
    
    return $result;

}


// 404
function testDelete_404()
{
    $expected = [
        "status" => 404,
        "body" => ["error" => "Availability not found"]
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "000000000000",
            "date" => "2026-03-20",
            "calId" => "65e10aa11b005"
        ]
    );

    $result = [
        "name" => "DELETE 404",
        "expected" => $expected,
        "actual" => $actual
    ];
    
    return $result;
}


/* ------ ALL TESTS ------ */

function runTests()
{
    $results = [];

    // GET
    $results[] = testGet_200();
    $results[] = testGet_404();
    $results[] = testGet_400();

/*     // POST
    $results[] = testPost_201();
    $results[] = testPost_400();
    $results[] = testPost_404();
    $results[] = testPost_409();

    // PATCH
    $results[] = testPatch_201();
    $results[] = testPatch_204();
    $results[] = testPatch_400();
    $results[] = testPatch_404();

    // DELETE
    $results[] = testDelete_200();
    $results[] = testDelete_400();
    $results[] = testDelete_404();
 */
    return $results;
}

echo json_encode(runTests(), JSON_PRETTY_PRINT);
