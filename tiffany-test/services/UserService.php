
<!-- Validera input, sätt business logic -->
<!-- Returnera till controller -->
 
<?php
class UserService {
    public static function getAllUsers() {
        return DBAcess::getUsers();
    }

    public static function getUsers($input){

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
    
    public static function createUser($input) {
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
                return $input;
            }
        }
    
    }
    
}