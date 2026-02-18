<?php

require_once __DIR__ . "/../services/GroupsService.php";

class GroupsController
{
    public static function handle($method, $input): void
    {

        if ($method === "GET") {
            try {
                // Get id from query, else set (no logic) null
                $id = $_GET["id"] ?? null;
                $name = $_GET["name"] ?? null;

                if ($id) {
                    $result = GroupsService::getById($id);
                } elseif ($name) {
                    $result = GroupsService::getByName($name);
                } else {
                    $result = GroupsService::getAll();
                }

                http_response_code(200);
                echo json_encode($result);
                return;

            } catch (Exception $exc) {
                // Return errors, thrown from services, (HTTP)
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
                return;
            }

        } else if ($method === "POST") {

            try {

                $result = GroupsService::createGroup($input);

                http_response_code(201);
                echo json_encode($result);
                return;

            } catch (Exception $exc) {
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
                return;
            }

        } else if ($method === "PATCH") {
            
            try {
                
                $result = GroupsService::updateGroup($input); 
                
                http_response_code(200);
                echo json_encode($result);
                return;
                
            } catch (Exception $exc) {
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
                return;
            }

        } else if ($method === "DELETE") {

            try {

                $result = GroupsService::deleteGroup($input);

                http_response_code(200);
                echo json_encode($result);
                return;

            } catch (Exception $exc) {

                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
                return;

            }
        }
    }

}
