<?php

function request($method, $endpoint, $data = null)
{
    $url = "http://localhost" . $endpoint;

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);

    if ($data !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: application/json"
        ]);
    }

    $response = curl_exec($ch);

    return $response;
}


/* ================= USERS ================= */

echo request("GET", "/users?id=1");

echo request("POST", "/users", [
    "userName" => "Philip",
    "pwd" => "hejhej%",
    "email" => "philles@"
]);

echo request("PATCH", "/users", [
    "userId" => 1,
    "userName" => "Elias"
]);

echo request("DELETE", "/users", [
    "userId" => 1
]);


/* ================= GROUPS ================= */

echo request("GET", "/groups");

echo request("POST", "/groups", [
    "name" => "Group 4"
]);

echo request("PATCH", "/groups", [
    "id" => 3,
    "name" => "Test group"
]);

echo request("DELETE", "/groups", [
    "id" => 3
]);


/* ================= USERS_GROUPS ================= */

echo request("GET", "/users_groups");

echo request("POST", "/users_groups", [
    "userId" => 6,
    "groupId" => 5,
    "isAdmin" => false
]);

echo request("PATCH", "/users_groups", [
    "id" => 3,
    "isAdmin" => true
]);

echo request("DELETE", "/users_groups", [
    "id" => 3
]);

?>
