<?php

function usersCalHandler($method, $input) {
    return $method($input);
}

function GET($input) {
    if (isset($input["userId"]) || isset($input["calId"])) {
        return getUsersCals($input);
    } else {
        return getUsersCals();
    }
}

function POST($input) {
    if (!isset($input["userId"]) || !isset($input["calId"])) {
        return ["data" => ["error" => "Missing attributes"], "code" => 400];
    } else {
        return postUserCals($input);
    }
}

function PATCH($input) {
    if (isset($input["userId"])) {
        patchUserOrCal($input, "user");
    } else if (isset($input["calId"])) {
        patchUserOrCal($input, "cal");
    }                          
}

function DELETE($input) {
    if (!isset($input["userId"]) && !isset($input["calId"])) {
        return ["data" => ["error" => "Missing attributes"], "code" => 400];
    } else {
        deleteUserFromCal($input);
    }
}

?>