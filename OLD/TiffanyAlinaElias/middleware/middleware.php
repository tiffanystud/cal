<?php
    function corsHandle() {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: *");
        header("Access-Control-Allow-Methods: *");
        if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
            exit();
        }
    }

    function contentTypeHandle() {
        if (!isset($_SERVER["CONTENT_TYPE"]) || $_SERVER["CONTENT_TYPE"] !== "application/json") {
            http_response_code(400);
            echo json_encode(["error" => "Content-Type must be application/json"]);
            exit();
        }
    }
?>

