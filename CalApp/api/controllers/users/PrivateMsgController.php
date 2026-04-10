<?php
    require_once __DIR__ . "/../../services/PrivateMsgService.php";
    class PrivateMsgController {
        public static function handle($method, $input) {
            if($method === "GET") {
                $result = PrivateMsgService::getAllPrivateMsg();
                if(empty($result)) {
                    http_response_code(404);
                    echo json_encode(["error" => "No private messages found"]);
                    return;
                } else {
                    http_response_code(200);
                    echo json_encode($result);
                    return;
                }
            }
            if($method === "POST") {
                if(isset($input["userId"]) && isset($input["receiverId"]) && isset($input["content"])){
                    $result = PrivateMsgService::createNewPrivMsg($input);
                    if(isset($result["error"])){
                        http_response_code(404);
                        echo json_encode($result);
                        return;
                    } else {
                        http_response_code(200);
                        echo json_encode(["message" => "Message is send to receiver"]);
                        return;
                    }


                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Bad request"]);
                    return;
                }
            }
            if($method === "PATCH") {
                if(isset($input["privMsgId"]) && isset($input["content"])) {
                    $result = PrivateMsgService::changePrivMsg($input);
                    if(isset($result["error"])) {
                        http_response_code(404);
                        echo json_encode($result);
                        return;
                    } else {
                        http_response_code(200);
                        echo json_encode(["message" => "Successfully update message"]);
                        return;
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Bad request"]);
                    return;
                }
            }
            if($method === "DELETE") {
                if(isset($input["privMsgId"])) {
                    $result = PrivateMsgService::deletePrivMsg($input["privMsgId"]);
                    if(isset($result["error"])) {
                        http_response_code(404);
                        echo json_encode($result);
                        return;
                    } else {
                        http_response_code(200);
                        echo json_encode($result);
                        return;
                    }
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Bad request"]);
                    return;
                }

            }

        }
    }
?>