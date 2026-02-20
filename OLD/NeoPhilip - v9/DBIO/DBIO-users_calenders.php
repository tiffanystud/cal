<?php

function getUsersCals($input = null) {
    if ($input === null) {
        //returnera hela users_cals arrayen
    } else if (isset($input["userId"]) && isset($input["calId"])) {
        //hämta alla objekt där både userId och calId stämmer, returnera
    } else if (isset($input["userId"])) {
        //hämta alla objekt där userId stämmer, returnera
    } else if (isset($input["calId"])) {
        //hämta alla objekt där calId stämmer, returnera
    }
}

function postUserCals($input) {
    $data = ["userId" => $input["userId"], "calId" => $input["calId"]];
    //kolla om userId och calId finns, returera error annars
    //skapa nytt id, och lägga till $data i db, returnera $data
}

function patchUserOrCal($input, $key) {
    if ($key === "user") {
        //ta bort alla objekt där userId stämmer överens med $input["userId"].
        //Tänkt att köras främst när en användare raderas, så raderas även alla connections
        //med calenders
    } else if ($key === "cal") {
        //ta bort alla objekt där calId stämmerr överens med $input["calId"].
        //Tänkt att köras när calender raderas, så raderas även alla connections
        //med users
    } else {
        return ["data" => ["error" => "Bad request"], "code" => 400];
    }
}

function deleteUserFromCal($input) {
    $data = ["userId" => $input["userId"], "calId" => $input["calId"]];
    //Kontrollera om userId frinns
    //Ta bort ETT objekt från users_calender där userId och calId stämmer
    //Används endast när exempelvis en användare lämnar / blir kickad från en grupp
}

?>