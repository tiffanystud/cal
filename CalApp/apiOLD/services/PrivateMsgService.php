<?php
    require_once __DIR__ . "/../repository/DBAccess.php";

    class PrivateMsgService {
        public static function getAllPrivateMsg() {
            $db = new DBAccess("private_msg");
            $result = $db->getAll();
            return $result;
        }
        public static function createNewPrivMsg($input) {
            $db = new DBAccess("users");
            $result = $db->findById($input["receiverId"]);
            if($result === null) {
                return ["error" => "The receiver doesn't exist"];
            } else {
                $db = new DBAccess("private_msg");
                $newMsg = [
                    "id" => uniqid(),
                    "senderId" => $input["userId"],
                    "receiverId" => $input["receiverId"],
                    "date" => date("Y-m-d"),
                    "time" => date("H:i:s"),
                    "content" => $input["content"],
                    "hasChange" => false

                ];
                $result = $db ->postData($newMsg);
                return $result;
            }
        }
        public static function changePrivMsg($input) {
            $db = new DBAccess("private_msg");
            $result = $db->findById($input["privMsgId"]);
            if($result === null) {
                return ["error" => "The message couldn't be found"];
            } else {
                $id = $input["privMsgId"];
                $data = [
                    "content" => $input["content"],
                    "hasChange" => true

                ];
                $result = $db->patchData($id, $data);
                return $result;
            }

        }
        public static function deletePrivMsg($id) {
            $db = new DBAccess("private_msg");
            $result = $db->findById($id);
            if($result === null) {
                return ["error" => "The message couldn't be found"];
            } else {
                $result = $db->deleteData($id);
                return ["message" => "The message has succesfully deleted"];;
            }
        }
    }

?>
