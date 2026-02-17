<?php

require_once __DIR__ . "/../services/UsersGroupService.php";

class UsersGroupController {
   public static function handler($method, $input): void {
        if ($method === "GET") {
            try {
                $id = $_GET["id"] ?? null;
                $userId = $_GET["userId"] ?? null;
                $groupId = $_GET["groupId"] ?? null;

                if($id) {
                    //Har ingen funktion ännu
                } elseif ($userId){
                    // Har ingen funktion men ev. getGroupOfUser?
                } elseif ($groupId){
                    // Denna funktion bör nog eg. ge en lista på användare.
                    $result = UsersGroupService::getAllUsersInGroup($groupId);
                    http_response_code(200);
                    echo json_encode($result);
                    return;
                } else {
                    // Har ingen funktion, vet inte, varför vill man ha alla users_groups?
                }

            } catch (Exception $exc){
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);

            }

        } else if ($method === "POST") {
            try {
                // addUserToGroup
                $result = UsersGroupService::addUserToGroup($input);
                http_response_code(200);
                echo json_encode($result);
                return;
            } catch (Exception $exc){
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
            }
        } else if($method === "PATCH") {
            try {
                $result = UsersGroupService::makeUserGroupAdmin($input);
                http_response_code(200);
                echo json_encode($result);
                return;
            } catch (Exception $exc){
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
            }
        } else if($method === "DELETE") {
            try {
                $result = UsersGroupService::removeUserFromGroup($input);
                http_response_code(200);
                echo json_encode($result);
                return;
            } catch (Exception $exc){
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
            }
        }
   }

}