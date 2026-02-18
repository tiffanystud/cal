<?php
require_once "DBAccess.php";
/* Importera users/grooups handlerer */

function urlHandler($requestUrl){   

    $db = readDB("DB.json");
    $urlPath = parse_url($requestUrl, PHP_URL_PATH);
    $path = ltrim($urlPath, "/");

    if(isset($path)){
        return requestHandler($_SERVER["REQUEST_METHOD"]);
    }

    return;

}


class HTTPHandler {
    public static function handler() {
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
            http_response_code(400);
            return json_encode(["error" => "Content-Type not set, must be JSON"]);
        } else if ($_SERVER["CONTENT_TYPE"] !== "application/json") {
            http_response_code(400);
            return json_encode(["error" => "Unexpected Content-Type, must be JSON"]);
        }

        if (!in_array($method, $allowedMethods)) {
            http_response_code(405);
            return json_encode(["error" => "Method not allowed"]);
        }

        if ($method === "GET") {
            return json_encode(DBAccess::getHandler());
        } else if ($method === "POST") {
            $input = file_get_contents("php://input");
            return json_encode(DBAccess::postHandler(json_decode($input, true)));
        } else if($method === "PATCH") {
            $input = file_get_contents("php://input");
            return json_encode(DBAccess::patchHandler(json_decode($input, true)));
        } else if($method === "DELETE") {
            $input = file_get_contents("php://input");
            return json_encode(DBAccess::deleteHandler(json_decode($input, true)));
        }
    }
}