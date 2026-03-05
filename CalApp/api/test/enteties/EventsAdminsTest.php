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



function testGet_200_all()
{
    $expected = [
        "status" => 200,
        "body" => [
            [
                "eventId" => "65e10aa11c001",
                "canDelete" => true,
                "canEdit" => true,
                "userId" => "65e10aa11a001"
            ]
        ]
    ];

    $actual = runRequest(
        "GET", 
        "/event_admins"
    );

    return [
        "name" => "GET 200 ALL",
        "method" => "GET",
        "endpoint" => "/event_admins",
        "queryParams" => null,
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Returns all event_admins entries"
    ];
}


function testGet_200_userId()
{
    $expected = [
        "status" => 200,
        "body" => [
            [
                "eventId" => "65e10aa11c001",
                "canDelete" => true,
                "canEdit" => true,
                "isCreator" => true,
                "userId" => "65e10aa11a001"
            ]
        ]
    ];

    $actual = runRequest(
        "GET", 
        "/event_admins", 
        ["userId" => "65e10aa11a001"
    ]);

    return [
        "name" => "GET 200 userId",
        "method" => "GET",
        "endpoint" => "/event_admins",
        "queryParams" => ["userId" => "65e10aa11a001"],
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Returns all event_admins entries for a specific userId"
    ];
}


function testGet_200_eventId()
{
    $expected = [
        "status" => 200,
        "body" => [
            [
                "eventId" => "65e10aa11c002",
                "canDelete" => false,
                "canEdit" => true,
                "isCreator" => true,
                "userId" => "65e10aa11a002"
            ]
        ]
    ];

    $actual = runRequest("GET", "/event_admins", [
        "eventId" => "65e10aa11c002"
    ]);

    return [
        "name" => "GET 200 eventId",
        "method" => "GET",
        "endpoint" => "/event_admins",
        "queryParams" => ["eventId" => "65e10aa11c002"],
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Returns all event_admins entries for a specific eventId"
    ];
}

function testGet_200_both()
{
    $expected = [
        "status" => 200,
        "body" => [
            "eventId" => "65e10aa11c003",
            "canDelete" => true,
            "canEdit" => true,
            "isCreator" => true,
            "userId" => "65e10aa11a004"
        ]
    ];

    $actual = runRequest("GET", "/event_admins", [
        "userId" => "65e10aa11a004",
        "eventId" => "65e10aa11c003"
    ]);

    return [
        "name" => "GET 200 BOTH",
        "method" => "GET",
        "endpoint" => "/event_admins",
        "queryParams" => [
            "userId" => "65e10aa11a004",
            "eventId" => "65e10aa11c003"
        ],
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Returns event_admin entry matching both userId and eventId"
    ];
}


function testGet_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "Not found"
        ]
    ];

    $actual = runRequest("GET", "/event_admins", [
        "userId" => "000000000000",
        "eventId" => "000000000000"
    ]);

    return [
        "name" => "GET 404",
        "method" => "GET",
        "endpoint" => "/event_admins",
        "queryParams" => [
            "userId" => "000000000000",
            "eventId" => "000000000000"
        ],
        "requestBody" => null,
        "expected" => $expected,
        "actual" => $actual,
        "info" => "No event_admin entry found"
    ];
}


function testPost_200()
{
    $expected = [
        "status" => 201,
        "body" => [
            
            "id" => "65e10aa143204",
            "eventId" => "65e10aa11c004",
            "userId" => "65e10aa11a003",
            "canDelete" => false,
            "canEdit" =>true,
            "isCreator" => true,
            ]
        
    ];

    $actual = runRequest("POST", "/event_admins", [
        "eventId" => "65e10aa11c006",
        "canDelete" => true,
        "canEdit" => false,
        "isCreator" => false,
        "userId" => "65e10aa11a005",
        "sessionId" => "65e10aa11a001" // creator of event 65e10aa11c001
    ]);

    return [
        "name" => "POST 201",
        "method" => "POST",
        "endpoint" => "/event_admins",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "65e10aa11c006",
            "canDelete" => true,
            "canEdit" => false,
            "isCreator" => false,
            "userId" => "65e10aa11a005",
            "sessionId" => "65e10aa11a001"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Creates a new event_admin connection"
    ];
}

function testPost_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
        ]
    ];

    $actual = runRequest("POST", "/event_admins", [
        "eventId" => "65e10aa11c006",
        "canDelete" => true,
        "canEdit" => false,
        "userId" => "65e10aa11a005"
    ]);

    return [
        "name" => "POST 400",
        "method" => "POST",
        "endpoint" => "/event_admins",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "65e10aa11c006",
            "canDelete" => true,
            "canEdit" => false,
            "userId" => "65e10aa11a005"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing required attributes"
    ];
}


function testPost_403()
{
    $expected = [
        "status" => 403,
        "body" => [
            "error" => "Not permitted"
        ]
    ];

    $actual = runRequest("POST", "/event_admins", [
        "eventId" => "65e10aa11c001",
        "canDelete" => true,
        "canEdit" => false,
        "isCreator" => false,
        "userId" => "65e10aa11a005",
        "sessionId" => "65e10aa11a002" // NOT creator
    ]);

    return [
        "name" => "POST 403",
        "method" => "POST",
        "endpoint" => "/event_admins",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "65e10aa11c001",
            "canDelete" => true,
            "canEdit" => false,
            "isCreator" => false,
            "userId" => "65e10aa11a005",
            "sessionId" => "65e10aa11a002"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "User not permitted to create event_admin"
    ];
}


function testPost_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "Not Found"
        ]
    ];

    $actual = runRequest("POST", "/event_admins", [
        "eventId" => "000000000000",
        "canDelete" => true,
        "canEdit" => false,
        "isCreator" => true,
        "userId" => "000000000000",
        "sessionId" => "65e10aa11a001"
    ]);

    return [
        "name" => "POST 404",
        "method" => "POST",
        "endpoint" => "/event_admins",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "000000000000",
            "canDelete" => true,
            "canEdit" => false,
            "isCreator" => true,
            "userId" => "000000000000",
            "sessionId" => "65e10aa11a001"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "eventId, userId or sessionId not found"
    ];
}

function testPatch_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            
            "id" => "65e10aa143204",
            "eventId" => "65e10aa11c004",
            "userId" => "65e10aa11a003",
            "canDelete" => false,
            "canEdit" =>true,
            "isCreator" => true,
            ]
        
    ];

    $actual = runRequest("PATCH", "/event_admins", [
        "eventId" => "65e10aa11c004",
        "userId" => "65e10aa11a003",
        // "sessionId" => "65e10aa11a003",
        "canEdit" => false,
    ]);

    return [
        "name" => "PATCH 200",
        "method" => "PATCH",
        "endpoint" => "/event_admins",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "65e10aa11c004",
            "userId" => "65e10aa11a003",
            "sessionId" => "65e10aa11a003",
            "canEdit" => false,
            "canDelete" => true
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Changes permissions for event_admin"
    ];
}

function testPatch_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
        ]
    ];

    $actual = runRequest("PATCH", "/event_admins", [
        "eventId" => "65e10aa11c004",
        "userId" => "65e10aa11a003"
    ]);

    return [
        "name" => "PATCH 400",
        "method" => "PATCH",
        "endpoint" => "/event_admins",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "65e10aa11c004",
            "userId" => "65e10aa11a003",
            "canEdit" => true
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing required attributes"
    ];
}

function testPatch_403()
{
    $expected = [
        "status" => 403,
        "body" => [
            "error" => "Not permitted"
        ]
    ];

    $actual = runRequest("PATCH", "/event_admins", [
        "eventId" => "65e10aa11c004",
        "userId" => "65e10aa11a003",
        "sessionId" => "65e10aa11a002", // NOT creator
        "canEdit" => true,
        "canDelete" => false
    ]);

    return [
        "name" => "PATCH 403",
        "method" => "PATCH",
        "endpoint" => "/event_admins",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "65e10aa11c004",
            "userId" => "65e10aa11a003",
            "sessionId" => "65e10aa11a002",
            "canEdit" => true,
            "canDelete" => false
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "User not permitted to modify permissions"
    ];
}

function testPatch_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "Not Found"
        ]
    ];

    $actual = runRequest("PATCH", "/event_admins", [
        "eventId" => "000000000000",
        "userId" => "000000000000",
        "sessionId" => "65e10aa11a001",
        "canEdit" => true,
        "canDelete" => false
    ]);

    return [
        "name" => "PATCH 404",
        "method" => "PATCH",
        "endpoint" => "/event_admins",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "000000000000",
            "userId" => "000000000000",
            "canEdit" => true,
            "canDelete" => false
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "eventId, userId or sessionId not found"
    ];
}


function testDelete_200()
{
    $expected = [
        "status" => 200,
        "body" => [
            "success" => "Connection successfully deleted"
        ]
    ];

    $actual = runRequest("DELETE", "/event_admins", [
        "eventId" => "65e10aa11c001",
        "userId" => "65e10aa11a005",
    ]);

    return [
        "name" => "DELETE 200",
        "method" => "DELETE",
        "endpoint" => "/event_admins",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "65e10aa11c005",
            "userId" => "65e10aa11a003",
            "sessionId" => "65e10aa11a003"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Deletes event_admin connection"
    ];
}

function testDelete_400()
{
    $expected = [
        "status" => 400,
        "body" => [
            "error" => "Missing attributes"
        ]
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/event_admins",
        data: [
            "eventId" => "65e10aa11c005",
            "userId" => ""
        ]
    );

    return [
        "name" => "DELETE 400",
        "method" => "DELETE",
        "endpoint" => "/event_admins",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "65e10aa11c005",
            "userId" => "65e10aa11a003"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "Missing required attributes"
    ];
}

function testDelete_403()
{
    $expected = [
        "status" => 403,
        "body" => [
            "error" => "Not permitted"
        ]
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/event_admins",
        data: [
            "eventId" => "65e10aa11c005",
            "userId" => "65e10aa11a003",
            "sessionId" => "65e10aa11a002" // NOT creator
        ]
    );

    return [
        "name" => "DELETE 403",
        "method" => "DELETE",
        "endpoint" => "/event_admins",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "65e10aa11c005",
            "userId" => "65e10aa11a003",
            "sessionId" => "65e10aa11a002"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "User not permitted to delete event_admin"
    ];
}

function testDelete_404()
{
    $expected = [
        "status" => 404,
        "body" => [
            "error" => "Not Found"
        ]
    ];

    $actual = runRequest(
        method: "DELETE",
        endpoint: "/event_admins",
        data: [
            "eventId" => "000000000000",
            "userId" => "000000000000",
            "sessionId" => "65e10aa11a001"
        ]
    );

    return [
        "name" => "DELETE 404",
        "method" => "DELETE",
        "endpoint" => "/event_admins",
        "queryParams" => null,
        "requestBody" => [
            "eventId" => "000000000000",
            "userId" => "000000000000",
            "sessionId" => "65e10aa11a001"
        ],
        "expected" => $expected,
        "actual" => $actual,
        "info" => "eventId, userId or sessionId not found"
    ];
}









/* ---------- RUN ALL TESTS ---------- */

function runTests()
{
    return [
        // GET
        testGet_200_all(),
        testGet_200_userId(),
        testGet_200_eventId(),
        testGet_200_both(),
        testGet_404(),

        // POST
        testPost_200(),
        testPost_400(),
        // testPost_403(),
        testPost_404(),

        // PATCH
        testPatch_200(),
        testPatch_400(),
        // testPatch_403(),
        testPatch_404(),

        // DELETE
        testDelete_200(),
        testDelete_400(),
        // testDelete_403(), SessionId 
        testDelete_404(),

    ];
}

echo json_encode(["tests" => runTests()], JSON_PRETTY_PRINT);
