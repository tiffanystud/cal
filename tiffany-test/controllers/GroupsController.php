<!-- GroupsController.php -->
 
<?php
class GroupsController {
   public static function handler($method, $input): void {
        if ($method === "GET") {
            GroupService::getHandler();
        } else if ($method === "POST") {
            GroupService::postHandler();
        } else if($method === "PATCH") {
            GroupService::patchHandler();
        } else if($method === "DELETE") {
            GroupService::deleteHandler();
        }
   }

}
