<?php
    require_once __DIR__ . "/../repository/DBAccess.php";

    class PrivateMsgService {
        public static function getByParams($input) {
            $db = new DBAccess("private_msg");
            $all = $db->getAll();
            
            if (!isset($input["senderId"], $input["receiverId"])) throw new Exception("Missing attributes");

            $filter = array_values(array_filter($all, fn($x) => $x["senderId"] === $input["senderId"] && $x["receiverId"] === $input["receiverId"]));
            if (count($filter) === 0) throw new Exception("No messages found");

            return $filter;
        }

        public static function post($input) {
            $users = new DBAccess("users");
            $msgs = new DBAccess("private_msg");
            $all = $users->getAll();
            $allMsgs = $msgs->getAll();

            if (!isset($input["receiverId"], $input["senderId"], $input["content"])) throw new Exception("Bad request");
            $receiver = $users->findById($input["receiverId"]);
            $sender = $users->findById($input["senderId"]);
            if (!$sender || !$receiver) throw new Exception("The receiver or sender doesn't exist");

            $newMsg = [
                "id" => uniqid(),
                "senderId" => $sender["id"],
                "receiverId" => $receiver["id"],
                "date" => date("Y:m:d"),
                "time" => date("H:i:s"),
                "content" => $input["content"],
                "hasChange" => false
            ];

            $msgs->postData($newMsg);
            return ["message" => "Message is send to receiver"];
        }

        public static function patch($input) {
            $db = new DBAccess("private_msg");
            $all = $db->getAll();

            if (!isset($input["privMsgId"], $input["content"])) throw new Exception("Bad request");

            $exists = $db->findById($input["privMsgId"]);
            if (!$exists) throw neW Exception("The message couldn't be found");

            $newContent = [
                "content" => $input["content"]
            ];
            $db->patchData($exists["id"], $newContent);
            return ["message" => "Successfully update message"];
        }


        public static function delete($input) {
            $db = new DBAccess("private_msg");
            $all = $db->getAll();

            if (!isset($input["privMsgId"])) throw new Exception("Bad request");

            $exists = $db->findById($input["privMsgId"]);
            if (!$exists) throw new Exception("The message couldn't be found");

            $db->deleteData($exists["id"]);
            return ["message" => "The message has succesfully deleted"];
        }
    }
?>