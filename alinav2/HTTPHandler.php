<?php
require_once "DBAccess.php";

function sendJSON($data, $statusCode = "200"){
    header("Content-Type: application/json");
    http_response_code($statusCode);
    $json = json_encode($data, JSON_UNESCAPED_UNICODE);
    echo $json;
    exit();
}

function action($method, $data) {
    $handlers = [
        'GET' => fn() => DBAccess::getHandler(),
        'POST' => fn($d) => DBAccess::postHandler(),
        'PATCH' => fn() => DBAccess::patchHandler(),
        'DELETE' => fn() => DBAccess::deleteHandler()
    ];

    if (!isset($handlers[$method])){
        $data = ["error" => "Method not allowed."];
        sendJSON($data, 405);
    }

    $result = json_encode($handlers[$method]($data));
    sendJSON($result);

}

function handleReq() {
    $method = $_SERVER["REQUEST_METHOD"];
    header("Content-Type: application/json");
    if ($method === "OPTIONS") {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: *");
        header("Access-Control-Allow-Methods: *");
        exit();
    } else {
        header("Access-Control-Allow-Origin: *");
    }

    $bodyMethods = ["POST", "PATCH", "DELETE"];
    if (in_array($method, $bodyMethods)){
        if (!isset($_SERVER["CONTENT_TYPE"])) {
            $data = ["error" => "Content-Type not set, must be JSON"];
            sendJSON($data, 400);
        } else if ($_SERVER["CONTENT_TYPE"] !== "application/json") {
            $data = ["error" => "Unexpected Content-Type, must be JSON"];
            sendJSON($data, 400);
        }
    }

    $raw = file_get_contents("php://input");
    $input = $raw ? json_decode($raw, true) : null;


    action($method, $input);
}
