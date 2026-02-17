
<!-- Validera input, sätt business logic -->
<!-- Returnera till controller -->
 
<?php
class UserService {
    public static function getAllUsers() {
        return DBAcess::getUsers();
    }

    public static function getUsers($input){

        $dbInstance = DBAccess("User");
        $dbTable = $dbInstance->getAll();

        if(!$input["userId"] > 1){
            http_response_code(400);
            echo json_encode(["error" => "UserId is not positive!"]);
            exit();
        } else if(!ctype_upper($input["userName"][0])){
            http_response_code(400);
            echo json_encode(["error" => "Username has no capital!"]);
            exit();
        } else if(!str_contains($input["password"], "%") && !strlen($input["password"] > 5)){
            http_response_code(400);
            echo json_encode(["error" => "Password is to short and not containing special character!"]);
            exit();
        } else if(!str_contains($input["email"], "@")){
            http_response_code(400);
            echo json_encode(["error" => "Email is not including @!"]);
            exit();
        }

        if(count($input) > 1){
            foreach($dbTable as $dbParameter => $dbObjectValue){
                foreach($requestInput as $requestParamter => $requestObjectValue){
                    if(isset($dbObjectValue[$requestParamter]) && $dbObjectValue[$requestParamter] == $requestObjectValue){
                        return $dbObjectValue;
                    }
                }
            }
        } else {
            foreach($dbTable as $dbParameter => $dbObjectValue){
                foreach($requestInput as $requestParamter => $requestObjectValue){
                    if(isset($dbObjectValue[$requestParamter]) && $dbObjectValue[$requestParamter] == $requestObjectValue){
                        return $requestObjectValue;
                    }
                }
            }
            
        }

    }   
    
    public static function createUser($input) {

        $dbInstance = DBAccess("User");
        $dbTable = $dbInstance->getAll();
    
    
        if(!ctype_upper($input["userName"][0])){
            http_response_code(400);
            echo json_encode(["error" => "Username has no capital!"]);
            exit();
        } else if(!str_contains($input["password"], "%") && !strlen($input["password"] > 5)){
            http_response_code(400);
            echo json_encode(["error" => "Password is to short and not containing special character!"]);
            exit();
        } else if(!str_contains($input["email"], "@")){
            http_response_code(400);
            echo json_encode(["error" => "Email is not including @!"]);
            exit();
        }
            
        if(count($input) > 1){
            $countObjects = 0;
            foreach($dbTable as $dbParameter => $dbObjectValue){
                foreach($requestInput as $requestParamter => $requestObjectValue){
                    if(isset($dbObjectValue[$requestParamter])){
                        $countObjects++;
                    }
                    
                }
                if($countObjects == count($input)){
                    return $input;
                }
            }
        }
    
    }

    public static function patchUser($input){

        $dbInstance = DBAccess("User");
        $dbTable = $dbInstance->getAll();

        if(!ctype_upper($input["userName"][0])){
            http_response_code(400);
            echo json_encode(["error" => "Username has no capital!"]);
            exit();
        } else if(!str_contains($input["password"], "%") && !strlen($input["password"] > 5)){
            http_response_code(400);
            echo json_encode(["error" => "Password is to short and not containing special character!"]);
            exit();
        } else if(!str_contains($input["email"], "@")){
            http_response_code(400);
            echo json_encode(["error" => "Email is not including @!"]);
            exit();
        }

        foreach($dbTable as $dbParameter => $dbObjectValue){
           if($dbParameter == $input["userId"]){
                foreach($requestInput as $requestParamter => $requestObjectValue){
                    if($requestParamter != "userId"){
                        return $db["User"][$dbParameter][$requestParamter] = $requestObjectValue;
                    }
                }
            }
        }

    }


    public static function deleteUser($input){

        $dbInstance = DBAccess("User");
        $dbTable = $dbInstance->getAll();

        if(!ctype_upper($input["userName"][0])){
            http_response_code(400);
            echo json_encode(["error" => "Username has no capital!"]);
            exit();
        } else if(!str_contains($input["password"], "%") && !strlen($input["password"] > 5)){
            http_response_code(400);
            echo json_encode(["error" => "Password is to short and not containing special character!"]);
            exit();
        } else if(!str_contains($input["email"], "@")){
            http_response_code(400);
            echo json_encode(["error" => "Email is not including @!"]);
            exit();
        }

        if(count($input) > 1){
            $countObjects = 0;
            foreach($dbTable as $dbParameter => $dbObjectValue){
                foreach($requestInput as $requestParamter => $requestObjectValue){
                    if(isset($dbObjectValue[$requestParamter]) && $dbObjectValue[$requestParamter] == $requestObjectValue){
                        $countObjects++;
                    }
                }

                if($countObjects == count($input)){
                    return $input;
                }
            }
        }
    }
}


    