<?php
require_once "./DBAccess-users.php";
require_once "./DBAccess-calenders.php";
require_once "./DBAccess-users_calenders.php";


function handler() {
    $allowedMethods = ["GET", "POST", "PATCH", "DELETE"];
    $method = $_SERVER["REQUEST_METHOD"];
    $url = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
    $input = null;
    if ($method === "GET") {
        $input = $_GET;
    } else {
        $input = file_get_contents("php://input");
    }

    header("Access-Control-Allow-Origin: *");
    if ($method === "OPTIONS") {
        header("Access-Control-Allow-Headers: *");
        header("Access-Control-Allow-Methods: *");
        exit();
    }

    if (!in_array($method, $allowedMethods)) {
        sendJSONResponse(["error" => "Method not allowed"], 405);
    }

    if ($url === "/users") {
        //resp struktur: ["data" => [Associativ array]/sträng, "code" => int];
        $resp = userHandler($method, $input);
        sendJSONResponse($resp["data"], $resp["code"]);
    } else if ($url === "/calenders") {
        $resp = calHandler($method, $input);
        sendJSONResponse($resp["data"], $resp["code"]);
    } else if ($url === "/users_calendars") {
        $resp = usersCalHandler($method, $input);
        sendJSONResponse($resp["data"], $resp["code"]);
    } else {
        sendJSONResponse(["error" => "Bad request"], 400);
    }
}

function sendJSONResponse($resp, $code) {
    http_response_code($code);
    header("Content-Type: application/json");
    echo json_encode($resp);
    exit();
}

?>