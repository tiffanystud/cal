<?php

    require_once __DIR__ . "/../../services/UserService.php";
    require_once __DIR__ . "/../sendJSON.php";


    class UserController {
        public static function handle($method, $input) {
            try {
                if($method === "GET") {
                    if(empty($input)){
                        $data = UserService::getAll($input);
                        sendJSON([$data],200);
                    }
                    if(isset($input["id"])){
                        $data = UserService::getByParams($input);
                        sendJSON([$data],200);
                    }
                } elseif($method === "POST") {
                    if(!isset($input["name"]) || !isset($input["email"]) || !isset($input["password"])) {
                        throw new Exception("Missing fields");
                    }
                    $data = UserService::post($input);
                    sendJSON([$data],201);
                } elseif($method === "PATCH") {
                    if(!isset($input["userId"])) {
                        throw new Exception("Missing userId parameter");
                    }
                    $data = UserService::patch($input);
                    sendJSON([$data],200);
                } elseif($method === "DELETE") {
                    if(!isset($input["userId"]) || !isset($input["email"]) || !isset($input["password"])) {
                        throw new Exception("Missing fields");
                    }
                    $data = UserService::delete($input);
                    sendJSON([$data],200);
                }

            } catch(Exception $error) {
                self::errorHandler($error);
            }
        }

        public static function errorHandler($error) {
            $message = $error->getMessage(); 

            //GET PARAMS
            if($message === "User not found") {
                sendJSON(["error" => "User not found"], 404);
            }

            //GET

            //POST
            if($message === "Missing fields") {
                sendJSON(["error" => "Missing fields"], 400);
            }
            if($message === "User aldready exists") {
                sendJSON(["error" => "User aldready exists"], 409);
            }


            //PATCH
            if($message === "Missing userId parameter") {
                sendJSON(["error" => "Missing userId parameter"], 400);
            }
            if($message === "User not found") {
                sendJSON(["error" => "User not found"], 404);
            }

            //DELETE
            if($message === "Missing fields") {
                sendJSON(["error" => "Missing fields"], 400);
            }
            if($message === "Invalid email or password") {
                sendJSON(["error" => "Invalid email or password"], 403);
            }
            if($message === "User not found") {
                sendJSON(["error" => "User not found"], 404);
            }


            


        }
    }

    


?>


