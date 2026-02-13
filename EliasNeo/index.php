<?php
    require_once "handler.php";
    handler($_SERVER["REQUEST_URI"], $_SERVER["REQUEST_METHOD"]);
?>