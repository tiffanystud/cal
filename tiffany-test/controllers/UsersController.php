<?php
class UsersController {

    public static function handle($method, $input){
        if ($method === "GET") {
            try {
                if(empty($input["userName"])){
                    http_response_code(400);
                    echo json_encode(["error" => "Username is missing!"]);
                    exit();
                } else if(empty($input["pwd"])){
                    http_response_code(400);
                    echo json_encode(["error" => "Password is missing!"]);
                    exit();
                } else if(empty($input["email"])){
                    http_response_code(400);
                    echo json_encode(["error" => "Email is missing"]);
                    exit();
                }
    
                return UserService::getUsers($input);

            } catch(Exception $error){
                http_response_code(500);
                echo json_encode($error->getMessage());
                exit();
            }
        }
        
        if ($method === "POST") {
            try {
                if(empty($input["userName"])){
                    http_response_code(400);
                    echo json_encode(["error" => "Username is missing!"]);
                    exit();
                } else if(empty($input["pwd"])){
                    http_response_code(400);
                    echo json_encode(["error" => "Password is missing!"]);
                    exit();
                } else if(empty($input["email"])){
                    http_response_code(400);
                    echo json_encode(["error" => "Email is missing"]);
                    exit();
                }

                return UsersService::createUser($input);

            } catch(Exception $error){
                http_response_code(500);
                echo json_encode($error->getMessage());
                exit();
            }

        }

        if ($method === "PATCH") {
            try {
                if(empty($input["userName"])){
                    http_response_code(400);
                    echo json_encode(["error" => "Username is missing!"]);
                    exit();
                } else if(empty($input["pwd"])){
                    http_response_code(400);
                    echo json_encode(["error" => "Password is missing!"]);
                    exit();
                } else if(empty($input["email"])){
                    http_response_code(400);
                    echo json_encode(["error" => "Email is missing"]);
                    exit();
                }

                return UsersService::patchUser($input);

            } catch(Exception $error){
                http_response_code(500);
                echo json_encode($error->getMessage());
                exit();
            }

            /* return UsersService::getAllUsers(); */
        }

        if ($method === "DELETE") {
            try {
                if(empty($input["userName"])){
                    http_response_code(400);
                    echo json_encode(["error" => "Username is missing!"]);
                    exit();
                } else if(empty($input["pwd"])){
                    http_response_code(400);
                    echo json_encode(["error" => "Password is missing!"]);
                    exit();
                } else if(empty($input["email"])){
                    http_response_code(400);
                    echo json_encode(["error" => "Email is missing"]);
                    exit();
                }

                return UsersService::deleteUser($input);

            } catch(Exception $error){
                http_response_code(500);
                echo json_encode($error->getMessage());
                exit();
            }

        }

    }
}