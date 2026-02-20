<?php

require_once __DIR__ . "/../services/UsersService.php";

class UsersController {

    public static function handle($method, $input){
        
        if ($method === "GET") {
            
            try {
                
                if (empty($input["userName"])) {
                    var_dump($input);
                    http_response_code(400);
                    echo json_encode(["error" => "Username is missing!"]);
                    exit();
                    
                } else if (empty($input["pwd"])) {
                    http_response_code(400);
                    echo json_encode(["error" => "Password is missing!"]);
                    exit();
                    
                } else if (empty($input["email"])) {
                    http_response_code(400);
                    echo json_encode(["error" => "Email is missing"]);
                    exit();
                }
                
                if (isset($input["id"])) {
                    $result = UsersService::getById($input["id"]);
                } else {
                    $result = UsersService::getAll();
                }

                http_response_code(200);
                echo json_encode($result);
                return;

            } catch (Exception $error){
                
                http_response_code(500);
                echo json_encode($error->getMessage());
                exit();
            }
        }
        
        if ($method === "POST") {
            
            try {
                
                if (empty($input["userName"])) {
                    http_response_code(400);
                    echo json_encode(["error" => "Username is missing!"]);
                    exit();
                    
                } else if (empty($input["pwd"])){
                    http_response_code(400);
                    echo json_encode(["error" => "Password is missing!"]);
                    exit();
                    
                } else if (empty($input["email"])){
                    http_response_code(400);
                    echo json_encode(["error" => "Email is missing"]);
                    exit();
                }

                $result = UsersService::createUser($input);
                http_response_code(201);
                echo json_encode($result);
                return;

            } catch (Exception $error) {
                
                http_response_code(500);
                echo json_encode($error->getMessage());
                exit();
                
            }

        }

        if ($method === "PATCH") {

            try {
                if (!isset($input["id"])) {
                    http_response_code(400);
                    echo json_encode(["error" => "Id is missing"]);
                    exit();
                }

                $result = UsersService::updateUser($input);

                http_response_code(200);
                echo json_encode($result);
                return;

            } catch (Exception $error) {

                http_response_code(400);
                echo json_encode(["error" => $error->getMessage()]);
                exit();
            }
        }

        if ($method === "DELETE") {
            
            try {
                
                if (empty($input["userName"])) {
                    http_response_code(400);
                    echo json_encode(["error" => "Username is missing!"]);
                    exit();
                    
                } else if (empty($input["pwd"])) {
                    http_response_code(400);
                    echo json_encode(["error" => "Password is missing!"]);
                    exit();
                    
                } else if (empty($input["email"])) {
                    http_response_code(400);
                    echo json_encode(["error" => "Email is missing"]);
                    exit();
                    
                }

                $result = UsersService::deleteUser($input);
                echo json_encode($result);
                return;

            } catch (Exception $error) {
                
                http_response_code(500);
                echo json_encode($error->getMessage());
                exit();
            }

        }

    }
}