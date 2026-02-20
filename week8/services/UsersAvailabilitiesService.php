<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class UsersAvailabilitiesService
{
    /* ---- GET ---- */
    public static function getAll($userId = null, $date = null)
    {
        
        $db = new DBAccess("users_availabilities");
        $items = $db->getAll();
        
        
        if (!$userId && !$date) {
                throw new Exception("Missing parameters");
 
        }
        if ($userId) {
            
            $filtered = [];

            foreach ($items as $item) {
                if ($item["userId"] == $userId) {
                    $filtered[] = $item;
                }
            }

            if (!$date) {
                throw new Exception("No groups found");
 
            }
            
        }

        
        // filtrera med datum
    }

    public static function getById($id)
    {

    }

    public static function getByName($name)
    {

    }



    /* --- POST ---- */
    public static function create($input)
    {

    }

    /* --- PATCH ---- */
    public static function update($input)
    {


    }


    /* --- DELETE ---- */
    public static function delete($input)
    {

    }


}