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
        return sendJSON($data, 405);
    }

    $input = file_get_contents("php://input");
    $data = $input ? json_decode($input, true) : null;

    $result = json_encode($handlers[$method]($data));
    sendJSON($result);

}

function handleReq() {
    $method = $_SERVER["REQUEST_METHOD"];
    $allowedMethods = ["GET", "POST", "PATCH", "DELETE"];
    header("Content-Type: application/json");
    if ($method === "OPTIONS") {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: *");
        header("Access-Control-Allow-Methods: *");
        exit();
    } else {
        header("Access-Control-Allow-Origin: *");
    }
    if (!isset($_SERVER["CONTENT_TYPE"])) {
        $data = ["error" => "Content-Type not set, must be JSON"];
        return sendJSON($data, 400);
    } else if ($_SERVER["CONTENT_TYPE"] !== "application/json") {
        $data = ["error" => "Unexpected Content-Type, must be JSON"];
        return sendJSON($data, 400);
    }

    action($method);
}
