<?php
//JAG SKCIKAR PHP      (data)
//NEO SKICKAR PHP      (URL, METOD, INPUT) han ska ha


    require_once "DBAccess.php";

    function sendJSON($responeData, $statusCode) {
        header("Content-Type: application/json");
        http_response_code($statusCode);
        $json = json_encode($responeData); // php -> json
        echo $json;
        exit();
    }

    function handler($url, $method) {
        $allowedMethods = ["GET", "POST", "PATCH", "DELETE"];

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
            sendJSON($data, 400);

        } else if ($_SERVER["CONTENT_TYPE"] !== "application/json") {
            $data = ["error" => "Content-Type must be JSON"];
            sendJSON($data, 400);
        }
        if (!in_array($method, $allowedMethods)) {
            $data = ["error" => "Method not allowed"];
            sendJSON($data, 400);
        }
       

        $input = file_get_contents("php://input");

        if($method === "GET") {
           $input = $_GET; // Hämta alla parameters

        } else {
            $input = json_decode($input, true);
        }
        $data = methodHandler($method, $input, $url);
        if(isset($data["error"])) {
            sendJSON($data, 400);
        } else {
            sendJSON($data, 200);
        }
    }
?>


