<?php

class UsersGroupController {
   public static function handler($method, $input): void {
        if ($method === "GET") {
            UsersGroupService::getHandler();
        } else if ($method === "POST") {
            UsersGroupService::postHandler();
        } else if($method === "PATCH") {
            UsersGroupService::patchHandler();
        } else if($method === "DELETE") {
            UsersGroupService::deleteHandler();
        }
   }

}