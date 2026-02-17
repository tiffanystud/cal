<?php
class UsersController {

    public static function handle($method, $input){
        if ($method === "GET") {
            $db = UsersService::getAllUsers(); 

            if(count($input) > 1){
                foreach($db["User"] as $dbParameter => $dbObjectValue){
                    foreach($requestInput as $requestParamter => $requestObjectValue){
                        if(isset($dbObjectValue[$requestParamter]) && $dbObjectValue[$requestParamter] == $requestObjectValue){
                            return $dbObjectValue;
                        }
                    }
                }
            } else {
                foreach($db["User"] as $dbParameter => $dbObjectValue){
                    foreach($requestInput as $requestParamter => $requestObjectValue){
                        if(isset($dbObjectValue[$requestParamter]) && $dbObjectValue[$requestParamter] == $requestObjectValue){
                            return $requestObjectValue;
                        }
                    }
                }
            }
        }
        
        if ($method === "POST") {
            $db = UsersService::getAllUsers(); 

            if(count($input) > 1){
                $countObjects = 0;
                foreach($db["User"] as $dbParameter => $dbObjectValue){
                    foreach($requestInput as $requestParamter => $requestObjectValue){
                        if(isset($dbObjectValue[$requestParamter])){
                            $countObjects++;
                        }
                    }
                }
                if($countObjects == count($input)){
                    array_push($db[$arrayKey], $input);
                    return $db;
                }
            }
        }

        if ($method === "PATCH") {
            /* return UsersService::getAllUsers(); */
        }
        if ($method === "DELETE") {
            $db = UsersService::getAllUsers(); 

            if(count($input) > 1){
                $countObjects = 0;
                foreach($db["User"] as $dbParameter => $dbObjectValue){
                    foreach($requestInput as $requestParamter => $requestObjectValue){
                        if(isset($dbObjectValue[$requestParamter]) && $dbObjectValue[$requestParamter] == $requestObjectValue){
                            $countObjects++;
                        }
                    }

                    if($countObjects == count($input)){
                        $db[$arrayKey] = array_filter($db[$arrayKey], fn($tableObject) => $tableObject != $input);
                        return $db;
                    }
                }
            }
        }

    }
}