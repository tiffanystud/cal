<?php

    require_once __DIR__ . "/../../services/UserService.php";

    class UserController {
        public static function handle($method, $input) {
            if($method === "GET") {
                if(isset($input["id"])){
                    $result = UserService::getSpecUser($input["id"]);
                    if(isset($result["error"])) {
                        http_response_code(404);
                        echo json_encode($result);
                        return;
                    } else {
                        http_response_code(200);
                        echo json_encode($result);
                        return;
                    }
                } else if (isset($input["calId"])){
                    try {
                        $result = UserService::getUsersInCal($input["calId"]);
                        http_response_code(200);
                        echo json_encode($result);
                        return;
                    } catch (Exception $exc) {
                        http_response_code(404);
                        echo json_encode(["error" => $exc->getMessage()]);
                        return;
                    }
                    
                }
                $result = UserService::getAllUsers();
                http_response_code(200);
                echo json_encode($result);
                return;
            }
            if($method === "POST") {
                if(isset($input["name"]) && isset($input["email"]) && isset($input["pwd"])) {
                    $result = UserService::createNewUser($input); //new user
                    if(isset($result["error"])) {
                        http_response_code(409);
                        echo json_encode($result);
                        return;
                    } else {
                        http_response_code(201);
                        echo json_encode($result);
                        return;
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Missing fields"]);
                    return;
                }
                
            }
            if($method === "PATCH") {
                if(isset($input["id"])){
                    $name = $input["name"] ?? null;
                    $pwd =  $input["pwd"] ?? null;
                    $email = $input["email"] ?? null;

                    $data = [                      
                        "name" => $name,
                        "pwd" => $pwd,
                        "email" => $email                       
                    ];
                    $result = UserService::changeUser($input["id"], $data);
                    if(isset($result["error"])) {
                        http_response_code(404);
                        echo json_encode($result);
                        return;
                    } else {
                        http_response_code(200);
                        echo json_encode(["message" => "Update OK"]);
                        return;
                    }
                    
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Missing user id parameter"]);
                    return;
                }

            }
            if($method === "DELETE") {
                if(isset($input["id"])){
                    if(isset($input["email"]) && isset($input["pwd"])) {
                        $result = UserService::deleteUser($input);
                        if($result === ["error" => "User not found"]){ 
                            http_response_code(404);
                            echo json_encode($result);
                            return;
                        } elseif($result === ["error" => "Invalid email or password"]) {
                            http_response_code(403);
                            echo json_encode($result);
                            return;
                        } elseif(["message" => "User succesfully deleted"] ) {
                            http_response_code(200);
                            echo json_encode(["message" => "User succesfully deleted"]);
                            return;
                        }
                    } else {
                        http_response_code(400);
                        echo json_encode(["error" => "Missing fields"]);
                        return;
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Missing userId"]);
                    return;
                }
            }

        }



    }


?>


