<?php
include "DBIO.php";

$db = DBIO::readDb();
$newData = [
    "id" => 6,
    "userName" => "test",
    "pwd" => 123,
    "email" => "mail@mail.com"
];
array_push($db["users"], $newData);
print_r($db["users"]);
// if (DBIO::writeToDb($db)) {
//     echo "Success! (maybe)";
// }