<?php
require_once "DBIO.php";
resetDb();

function testGET($url, $i) {
    //"Öppnar" en ny cURL request till $url, URL kan sättas senare med curl_setopt
    //Skapar en ny cURL session, som behandlar requesten
    $req = curl_init($url);

    //Gör om responsen till en sträng, istället för att printa ut den direkt
    //Gör även så att responsen returneras vid curl_exec så att den kan sparas i variabel
    curl_setopt($req, CURLOPT_RETURNTRANSFER, true);
    //Sätter headers
    curl_setopt($req, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
    ]);
    //$resp = json_decode(curl_exec($req), true); //Gör om strängen till json

    //exekverar själva requesten, skickar en HTTP request till $url med de headers eller
    //andra options vi lagt till
    $resp = curl_exec($req);
    $status = curl_getinfo($req, CURLINFO_HTTP_CODE);

    if ($resp === false) {
        echo curl_error($req);
    }

    echo "<p style='background-color: lime'>GET Test $i: to url: $url<br>Response: $resp<br>Status: $status<br><br></p>";
}

function testPOST($url, $i, $reqBody) {
    $req = curl_init($url);

    curl_setopt($req, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($req, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json"
    ]);
    curl_setopt($req, CURLOPT_POST, true);
    curl_setopt($req, CURLOPT_POSTFIELDS, json_encode($reqBody));

    $resp = curl_exec($req);
    $status = curl_getinfo($req, CURLINFO_HTTP_CODE);
    if ($resp === false) {
        echo curl_error($req);
    }

    $body = json_encode($reqBody);
    echo "<p style='background-color: lime'>POST Test $i: to url: $url with body: $body<br>Response: $resp<br>Status: $status<br><br></p>";
}

function testPATCH($url, $i, $reqBody) {
    $req = curl_init($url);

    curl_setopt($req, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($req, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json"
    ]);
    curl_setopt($req, CURLOPT_CUSTOMREQUEST, "PATCH");
    curl_setopt($req, CURLOPT_POSTFIELDS, json_encode($reqBody));

    $resp = curl_exec($req);
    $status = curl_getinfo($req, CURLINFO_HTTP_CODE);
    if ($resp === false) {
        echo curl_error($req);
    }

    $body = json_encode($reqBody);
    echo "<p style='background-color: lime'>PATCH Test $i: to url: $url with body: $body<br>Response: $resp<br>Status: $status<br><br></p>";
}

function testDELETE($url, $i, $reqBody) {
    $req = curl_init($url);

    curl_setopt($req, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($req, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json"
    ]);
    curl_setopt($req, CURLOPT_CUSTOMREQUEST, "DELETE");
    curl_setopt($req, CURLOPT_POSTFIELDS, json_encode($reqBody));

    $resp = curl_exec($req);
    $status = curl_getinfo($req, CURLINFO_HTTP_CODE);
    if ($resp === false) {
        echo curl_error($req);
    }

    $body = json_encode($reqBody);
    echo "<p style='background-color: lime'>DELETE Test $i: to url: $url with body: $body<br>Response: $resp<br>Status: $status<br><br></p>";
}

$getTestURLs = ["http://localhost:8001/users?id=1", "http://localhost:8001/groups?id=1", "http://localhost:8001/users", "http://localhost:8001/groups", "http://localhost:8001/users_groups", "http://localhost:8001/users_groups?userID=1", "http://localhost:8001/users_groups?groupID=1", "http://localhost:8001/users?id=7", "http://localhost:8001/test"];
for ($i=0; $i<count($getTestURLs); $i++) {
    testGET($getTestURLs[$i], $i + 1);
}

$postTestURLs = ["http://localhost:8001/users", "http://localhost:8001/groups", "http://localhost:8001/users_groups", "http://localhost:8001/users", "http://localhost:8001/test"];
$postTestBodies = [
    ["userName" => "test", "pwd" => 123, "email" => "mail@mail.com"],
    ["name" => "Coola gruppen"],
    ["userID" => 1, "groupID" => 3, "isAdmin" => false],
    ["userName" => "test2", "pwd" => 123],
    []
];
for ($i=0; $i<count($postTestURLs); $i++) {
    testPOST($postTestURLs[$i], $i + 1, $postTestBodies[$i]);
}

$patchTestURLs = ["http://localhost:8001/users", "http://localhost:8001/groups", "http://localhost:8001/test", "http://localhost:8001/users"];
$patchTestBodies = [
    ["id" => 6, "pwd" => 456],
    ["groupID" => 4, "name" => "Coolare gruppen"],
    [],
    ["userName" => "newName"]
];
for ($i=0; $i<count($patchTestURLs); $i++) {
    testPATCH($patchTestURLs[$i], $i + 1, $patchTestBodies[$i]);
}

$deleteTestURLs = ["http://localhost:8001/users", "http://localhost:8001/groups", "http://localhost:8001/users_groups", "http://localhost:8001/users", "http://localhost:8001/groups", "http://localhost:8001/test"];
$deleteTestBodies = [
    ["id" => 6, "pwd" => 456],
    ["id" => 4, "name" => "Coolare gruppen"],
    ["userID" => 1, "groupID" => 3],
    ["id" => 1, "pwd" => "fel"],
    ["id" => 2],
    []
];
for ($i=0; $i<count($deleteTestURLs); $i++) {
    testDELETE($deleteTestURLs[$i], $i + 1, $deleteTestBodies[$i]);
}