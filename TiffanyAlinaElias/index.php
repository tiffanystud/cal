<?php

    require_once __DIR__ . "/controllers/router.php";
    router($_SERVER["REQUEST_URI"]);
?>