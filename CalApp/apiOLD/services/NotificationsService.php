<?php
require_once "repository/DBAccess.php";
require_once "services/UsersNotificationsService.php";
require_once "services/eventsService.php";
require_once "services/PrivateMsgService.php";
require_once "services/CalendarsMSGService.php";
require_once "services/calendarsService.php";
require_once "services/UsersCalendarsService.php";


class NotificationsService {
    //GET
    public static function getAll() {
        $db = new DBAccess("notifications");
        return $db->getAll();
    }

    public static function getWithParams($notiId, $userId) {
        $db = new DBAccess("notifications");
        $connectionsDb = new DBAccess("users_notifications");

        if ($notiId) {
            return $db->findById($notiId);
        } else if ($userId) {
            $connections = array_values(array_filter($connectionsDb->getAll(), fn($x) => $x["userId"] === $userId));
            $notis = [];
            foreach($connections as $x) {
                $noti = $db->findById($x["notiId"]);
                array_push($notis, $noti);
            }

            return $notis;
        }
    }

    //POST
    public static function postNoti($input) {
        $notiContent = $input["notiContent"] ?? null;
        $msgId = $input["messageId"] ?? null;
        $eventId = $input["eventId"] ?? null;
        $sessionId = $input["sessionID"] ?? null;

        if ($eventId && $msgId) {
            throw new Exception("Not acceptable, both event and msg set");
        }

        if ((!$notiContent || !$type || !$sessionId) || (!$msgId && !$eventId)) {
            throw new Exception("Missing attributes");
        }

        $db = new DBAccess("notifications");
        $connectionsDb = new DBAccess("users_notifications");

        $type = null;
        if ($eventId) {
            $type = "event";
        } else if ($msgId) {
            $type = "message";
        }
        $noti = [
            "id" => uniqid(),
            "type" => $type,
            "notiContent" => $notiContent,
            "messageId" => $msgId,
            "eventId" => $eventId,
            "read" => false
        ];
        $createdNoti = $db->postData($noti);
        
        //Skapa connection med alla users som är med i calendar (eventId och msgId(calendarMsg))
        //Eller till en user (msgId = privateMsg)
        if ($eventId) {
            $event = EventsService::getEventById($eventId);
            $cal = CalendarsService::calendarsGetById(["id" => $event["calId"]]);
            $usersCalendars = UsersCalendarsService::getAllRelationsByCalId($cal["id"]);
            foreach($usersCalendars as $usrCal) {
                UsersNotificationsService::postUserNoti(["notiId" => $createdNoti["id"], "userId" => $usrCal["userId"]]);
            }

            return $createdNoti;
        } else if ($msgId) {
            $privateMsg = array_find(PrivateMsgService::getAllPrivateMsg(), fn($x) => $x["id"] === $msgId);
            $calMsgs = new DBAccess("calendar_msg");
            $calMsg = array_find($calMsgs->getAll(), fn($x) => $x["id"] === $msgId);

            if ($privateMsg) {
                UsersNotificationsService::postUserNoti(["notiId" => $createdNoti["id"], "userId" => $privateMsg["receiverId"]]);
                return $createdNoti;
            } else if ($calMsg) {
                $cal = CalendarsService::calendarsGetById(["id" => $calMsg["calId"]]);
                $usersCalendars = UsersCalendarsService::getAllRelationsByCalId($cal["id"]);
                foreach($usersCalendars as $usrCal) {
                    UsersNotificationsService::postUserNoti(["notiId" => $createdNoti["id"], "userId" => $usrCal["userId"]]);
                }
                return $createdNoti;
            }
        }
    }

    //PATCH
    public static function patchNoti($input) {
        $db = new DBAccess("notifications");
        $connectionsDb = new DBAccess("users_notifications");

        if ((!$input["userId"] && !$input["notiId"]) || !$input["read"]) {
            throw new Exception("Missing attributes");
        }

        if ($input["userId"]) {
            $connections = array_values(array_filter($connectionsDb->getAll(), fn($x) => $x["userId"] === $userId));
            if (count($connections) === 0) {
                throw new Exception("Not found");
            }
            $notis = [];
            foreach($connections as $x) {
                array_push($db->findById($x["notiId"]));
            }

            foreach($notis as $noti) {
                $db->patchData($noti["id"], ["read" => $input["read"]]);
            }

            return ["success" => "All notifications marked as read"];
        } else if ($input["notiId"]) {
            $db->patchData($input["notiId"], ["read" => $input["read"]]);

            return ["success" => "Notification read"];
        }
    }

    //DELETE
    public static function deleteNoti($input) {
        $notiId = $input["notiId"] ?? null;
        $userId = $input["userId"] ?? null;
        $db = new DBAccess("notifications");

        if (!$notiId && !$userId) {
            throw new Exception("Missing attributes");
        }

        $noti = array_find($db->getAll(), fn($x) => $x["id"] === $notiId);
        if (!$noti) {
            throw new Exception("Not found");
        }

        $db->deleteData($noti["id"]);
        return ["success" => "Notification deleted"];
    }
}
?>