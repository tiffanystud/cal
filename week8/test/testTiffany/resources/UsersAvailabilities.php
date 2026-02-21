<?php
error_log("TOP OF FILE REACHED");

function runRequest($method, $endpoint, $data = null)
{
    
    error_log("TOP OF runRequest");

    $url = "http://localhost:8000" . $endpoint;

    // Vid GETT bygg query m params
    if ($method === "GET" && $data !== null) {

        $queryString = http_build_query($data);
        $url = $url . "?" . $queryString;

    }

    error_log("Right before: curlReq = curl_init(url)");
    $curlReq = curl_init($url);
    error_log("Right after: curlReq = curl_init(url)");
    
    
    // Svar som ttext och sätt HTTP metod
    curl_setopt($curlReq, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curlReq, CURLOPT_CUSTOMREQUEST, $method);

    if ($method !== "GET" && $data !== null) {

        $jsonBody = json_encode($data);
        $jsonHeader = ["Content-Type: application/json"];

        // Sätt rättt headers
        error_log("Right before: curl_setopt(curlReq, CURLOPT_POSTFIELDS, jsonBody)");
        curl_setopt($curlReq, CURLOPT_POSTFIELDS, $jsonBody);
        error_log("Right after: curl_setopt(curlReq, CURLOPT_POSTFIELDS, jsonBody)");
        
        error_log("Right before: curl_setopt(curlReq, CURLOPT_HTTPHEADER, jsonHeader)");
        curl_setopt($curlReq, CURLOPT_HTTPHEADER, $jsonHeader);
        error_log("Right after: curl_setopt(curlReq, CURLOPT_HTTPHEADER, jsonHeader)");

    }

    // Kör requesten och hämta datan
    error_log(message: "Right before: responseBody = curl_exec(curlReq);");
    $responseBody = curl_exec($curlReq);
    error_log("Right after: responseBody = curl_exec(curlReq);");

    
    $responseCode = curl_getinfo($curlReq, CURLINFO_HTTP_CODE);
    error_log("Right after: responseCode = curl_getinfo(curlReq, CURLINFO_HTTP_CODE)");


    error_log("Right before: rdecodedBody = json_decode(responseBody, true)");
    
    // Testa som JSON annars Text?
    $decodedBody = json_decode($responseBody, true);
    error_log("Right after: rdecodedBody = json_decode(responseBody, true)");
    
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


/* ------ USERS_AVAILABILITIES ------ */

/* -- GET -- */

// 200
function testGet_200()
{
    error_log("UsersAvailabilities.php test 1 körs");

    $expected = [
        "status" => 200,
        "body" => [
            "id" => "ID",
            "userId" => "ID",
            "date" => "yyyy-mm-dd",
            "isAvailable" => true,
            "calId" => "ID"
        ]
    ];

    error_log("UsersAvailabilities.php innan runRequest när test 1 körs");

    $actual = runRequest(
        method: "GET",
        endpoint: "/users_availabilities",
        data: [
            "userId" => "65e10aa11a001",
            "date" => "2026-03-01"
        ]
    );
    
    error_log("UsersAvailabilities.php efter runRequest när test 1 körs");

    $result = [
        "name" => "GET 200",
        "method" => "GET",
        "endpoint" => "/users_availabilities",
        "queryParams" => [
            "userId" => "65e10aa11a001",
            "date" => "2026-03-01"
        ],
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Returns availability for a specific user on a specific date"
    ];
    
    error_log("UsersAvailabilities.php innan return när test 1 körs");

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
        "method" => "GET",
        "endpoint" => "/users_availabilities",
        "queryParams" => [
            "userId" => "65e10aa11a001",
            "date" => "0000-00-00"
        ],
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "No availability entry exists"
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
        "method" => "GET",
        "endpoint" => "/users_availabilities",
        "queryParams" => [
            "userId" => "65e10aa11a001"
        ],
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "userId or date missing"
    ];
    
    return $result;
    
}



/* -- POST -- */

// 201
function testPost_201()
{
    $expected = [
        "status" => 201,
        "body" => ["message" => "Availability created"]
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
        "method" => "POST",
        "endpoint" => "/users_availabilities",
        "queryParams" => null,
        "requestBody" => [
            "userId" => "65e10aa11a00a",
            "date" => "2026-03-20",
            "isAvailable" => false,
            "calId" => "65e10aa11b005"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Creates a new availability entry"
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
        "method" => "POST",
        "endpoint" => "/users_availabilities",
        "queryParams" => null,
        "requestBody" => [
            "userId" => "65e10aa11a00a",
            "date" => "2026-03-20",
            "isAvailable" => false
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Required fields missing"
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
        "method" => "POST",
        "endpoint" => "/users_availabilities",
        "queryParams" => null,
        "requestBody" => [
            "userId" => "65e10aa11a00a",
            "date" => "2026-03-20",
            "isAvailable" => false,
            "calId" => "000000000000"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "FK validation failed"
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
        "method" => "POST",
        "endpoint" => "/users_availabilities",
        "queryParams" => null,
        "requestBody" => [
            "userId" => "65e10aa11a001",
            "date" => "2026-03-01",
            "isAvailable" => false,
            "calId" => "65e10aa11b001"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Duplicate entry for same user+date"
    ];
    
    return $result;
    
}



/* -- PATCH -- */

// 201
function testPatch_201()
{
    $expected = [
        "status" => 200,
        "body" => ["message" => "Availability updated"]
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
        "method" => "PATCH",
        "endpoint" => "/users_availabilities",
        "queryParams" => null,
        "requestBody" => [
            "userId" => "65e10aa11a001",
            "date" => "2026-03-01",
            "isAvailable" => false,
            "calId" => "65e10aa11b001"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Change availability status to yes or maybe. Delete = no."
    ];
    
    return $result;
    
}


// 204
function testPatch_204()
{
    $expected = [
        "status" => 204,
        "body" => ["message" => "No changes made"]
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
        "method" => "PATCH",
        "endpoint" => "/users_availabilities",
        "queryParams" => null,
        "requestBody" => [
            "userId" => "65e10aa11a001",
            "date" => "2026-03-01",
            "isAvailable" => false,
            "calId" => "65e10aa11b001"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Availability was not switched, it was already set to “change”"
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
        "method" => "PATCH",
        "endpoint" => "/users_availabilities",
        "queryParams" => null,
        "requestBody" => [
            "userId" => "65e10aa11a00a",
            "date" => "2026-03-20",
            "isAvailable" => false
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "userId, calId, isAvailable or date missing"
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
        "method" => "PATCH",
        "endpoint" => "/users_availabilities",
        "queryParams" => null,
        "requestBody" => [
            "userId" => "65e10aa11a00a",
            "date" => "0000-00-00",
            "isAvailable" => false,
            "calId" => "65e10aa11b005"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "No entry to patch"
    ];
    
    return $result;
    
}



/* -- DELETE -- */

// 200
function testDelete_200()
{
    
    $expected = [
        "status" => 200,
        "body" => ["message" => "Availability deleted"]
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
        "method" => "DELETE",
        "endpoint" => "/users_availabilities",
        "queryParams" => null,
        "requestBody" => [
            "userId" => "65e10aa11a00a",
            "date" => "2026-03-20",
            "calId" => "65e10aa11b005"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Deletes availability entry"
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
        "method" => "DELETE",
        "endpoint" => "/users_availabilities",
        "queryParams" => null,
        "requestBody" => [
            "userId" => "65e10aa11a00a",
            "date" => "2026-03-20"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "userId or date missing"
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
        "method" => "DELETE",
        "endpoint" => "/users_availabilities",
        "queryParams" => null,
        "requestBody" => [
            "userId" => "000000000000",
            "date" => "2026-03-20",
            "calId" => "65e10aa11b005"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "No entry to delete"
    ];
    
    return $result;
}



/* ------ ALL TESTS (FORMAT B) ------ */

function runTests()
{
    
    $tests = [];

    // GET
    error_log(" BEFORE FIRST TEST IN runTests");
    $tests[] = testGet_200();
    error_log(" AFTER FIRST TEST IN runTests");

    $tests[] = testGet_404();
   /*  $tests[] = testGet_400();

    // POST
    $tests[] = testPost_201();
    $tests[] = testPost_400();
    $tests[] = testPost_404();
    $tests[] = testPost_409();

    // PATCH
    $tests[] = testPatch_201();
    $tests[] = testPatch_204();
    $tests[] = testPatch_400();
    $tests[] = testPatch_404();

    // DELETE
    $tests[] = testDelete_200();
    $tests[] = testDelete_400();
    $tests[] = testDelete_404(); */
    
    $result = [ 
        "resource" => "users_availabilities", 
        "tests" => $tests 
    ];
    
    error_log("BOTTOM OF RUNTESTS REACHED, before return result ");
    return $result;
}

error_log("BOTTOM OF FILE REACHED, before json_Encode");

echo json_encode(runTests(), JSON_PRETTY_PRINT);
