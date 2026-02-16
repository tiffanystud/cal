<?php

function readDb() {
    $db = file_get_contents("db.json");
    return json_decode($db, true);
}
function writeToDb($data) {
    file_put_contents("db.json", json_encode($data, JSON_PRETTY_PRINT));
    return true;
}

function getAllUsers(){
    $db = file_get_contents("db.json");
    return $db["users"];
}

function getUserById($id) {
    $users = getAllUsers();
    foreach ($users as $user){
        if ($user["id"] == $id) {
            return $user;
        }
    }
    return false;
}

function getAllGroups(){
    $groups = readDb()["groups"];
    return $groups;
}

function getGroupById($id){
    $groups = getAllGroups();
    foreach ($groups as $groups){
        if ($group["id"] == $id) {
            return $group;
        }
    }
    return false;
}

function getAllUsersGroups() {
    $usersGroups = readDb()["users_groups"];
    return $usersGroups;
}

function getUsersByGroupId($id){
    $usersInGroup = [];
    $usersGroups = array_filter(getAllUsersGroups(), fn($x) => $x["groupID"] === $id );
    foreach ($usersGroups as $user){
        array_push($usersInGroup, getUserById($user["userID"]));
    }
    return $usersInGroup;
}
?>
