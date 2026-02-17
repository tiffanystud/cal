<?php
class UsersController {

    public static function handle($method, $input){
        if ($method === "GET") {
            if(empty($input["userName"])){
                http_response_code(400);
                echo json_encode(["error" => "Username is missing!"]);
                exit();
            } else if(empty($input["password"])){
                http_response_code(400);
                echo json_encode(["error" => "Password is missing!"]);
                exit();
            } else if(empty($input["email"])){
                http_response_code(400);
                echo json_encode(["error" => "Email is missing"]);
                exit();
            }

            return UsersService::getUsers($input);

        }
        
        if ($method === "POST") {
            if(empty($input["userName"])){
                http_response_code(400);
                echo json_encode(["error" => "Username is missing!"]);
                exit();
            } else if(empty($input["password"])){
                http_response_code(400);
                echo json_encode(["error" => "Password is missing!"]);
                exit();
            } else if(empty($input["email"])){
                http_response_code(400);
                echo json_encode(["error" => "Email is missing"]);
                exit();
            }

            return UsersService::createUser($input);
        }

        if ($method === "PATCH") {
            if(empty($input["userName"])){
                http_response_code(400);
                echo json_encode(["error" => "Username is missing!"]);
                exit();
            } else if(empty($input["password"])){
                http_response_code(400);
                echo json_encode(["error" => "Password is missing!"]);
                exit();
            } else if(empty($input["email"])){
                http_response_code(400);
                echo json_encode(["error" => "Email is missing"]);
                exit();
            }

            return UsersService::patchUser($input);
            /* return UsersService::getAllUsers(); */
        }

        if ($method === "DELETE") {
            if(empty($input["userName"])){
                http_response_code(400);
                echo json_encode(["error" => "Username is missing!"]);
                exit();
            } else if(empty($input["password"])){
                http_response_code(400);
                echo json_encode(["error" => "Password is missing!"]);
                exit();
            } else if(empty($input["email"])){
                http_response_code(400);
                echo json_encode(["error" => "Email is missing"]);
                exit();
            }

            return UsersService::deleteUser($input);
        }

    }
}