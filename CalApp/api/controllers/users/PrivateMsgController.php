<?php
    require_once __DIR__ . "/../../services/PrivateMsgService.php";
    require_once __DIR__ . "/../sendJSON.php";

    class PrivateMsgController {
        public static function handle($method, $input) { 
            try {
                if($method === "GET") { 
                    if(isset($input["senderId"]) && isset($input["receiverId"])) {
                        $data = PrivateMsgService::getByParams($input);
                        sendJSON([$data],200);
                    }
                } elseif($method === "POST") {
                    if(!isset($input["userId"]) || !isset($input["receiverId"]) || !isset($input["content"])) {
                        throw new Exception("Bad request");
                    }
                    $data = PrivateMsgService::post($input);
                    sendJSON([$data],200);
                } elseif($method === "PATCH") {
                    if(!isset($input["privMsgId"]) || !isset($input["content"])) {
                        throw new Exception("Bad request");
                    }
                    $data = PrivateMsgService::patch($input);
                    sendJSON([$data],200);

                } elseif($method == "DELETE") {
                    if(!isset($input["privMsgId"])) {
                        throw new Exception("Bad request");
                    }
                    $data = PrivateMsgService::delete($input);
                    sendJSON([$data],200);
                }
            } catch(Exception $error) {
                self::errorHandler($error);
            }

        }
        public static function errorHandler($error) {
            $message = $error->getMessage(); 

            //GET PARAM
            if($message === "No messages found") {
                sendJSON(["error" => $message], 404);
            } 

            //POST
            if($message === "Bad request") {
                sendJSON(["error" => $message], 400);
            } 
            if($message === "The receiver or sender doesn't exist") {
                sendJSON(["error" => $message], 404);
            }
            //PATCH
            if($message === "Bad request") {
                sendJSON(["error" => $message], 400);
            } 
            if($message === "The message couldn't be found") {
                sendJSON(["error" => $message], 404);
            }
            //DELETE
            if($message === "Bad request") {
                sendJSON(["error" => $message], 400);
            } 
            if($message === "The message couldn't be found") {
                sendJSON(["error" => $message], 404);
            }


            


        }
    }
?>