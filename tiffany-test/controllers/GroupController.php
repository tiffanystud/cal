<?php

require_once __DIR__ . "/../services/GroupService.php";

class GroupController {
    public static function handler($method, $input): void {

        if ($method === "GET") {
            try {
                // Get id from query, else set (no logic) null
                $id = $_GET["id"] ?? null; 
                $name = $_GET["name"] ?? null; 
                
                if ($id) {
                    $result = GroupService::getById(id: $id);
                } elseif ($name) {
                    $result = GroupService::getByName($name);
                } else {
                    $result = GroupService::getAll();         
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
                
                $result = GroupService::createGroup($input); 
                
                http_response_code(201);
                echo json_encode($result);
                return;
                
            } catch (Exception $exc) {
                http_response_code(400);
                echo json_encode(["error" => $exc->getMessage()]);
                return;
            }
            
        /* GroupService::getHandler(); */
        
        } else if ($method === "PATCH") {

        /* GroupService::getHandler(); */
        
        } else if ($method === "DELETE") {
        
        /* GroupService::getHandler(); */
        }
    }

}
