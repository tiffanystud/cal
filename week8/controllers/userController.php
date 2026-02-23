<?php

    require_once __DIR__ . "/../services/UserService.php";

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
                $reqBody = json_decode(file_get_contents("php://input"),true);
                if(isset($input["id"])){
                    $name = $reqBody["name"] ?? null;
                    $pwd =  $reqBody["pwd"] ?? null;
                    $email = $reqBody["email"] ?? null;

                    $data = [
                        "id" => $input["id"],
                        "data" => [
                            "name" => $name,
                            "pwd" => $pwd,
                            "email" => $email
                        ]
                    ];
                    $result = UserService::changeUser($data);
                    
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Missing user id"]);
                    return;
                }

            }

        }



    }


?>


