<?php

header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit();
    }


function readDB($dbName){
    $db = json_decode(file_get_contents($dbName), true);

    return $db;
}

function sendDB($dbName, $data){
    $jsonData = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($dbName, $jsonData);
}

function urlHandler($requestUrl){   

    $db = readDB("DB.json");
    $urlPath = parse_url($requestUrl, PHP_URL_PATH);
    $path = ltrim($urlPath, "/");

    if(isset($path)){
        return requestHandler($_SERVER["REQUEST_METHOD"]);
    }

    return;

    // foreach($db as $tableName){
    //     if($tableName == )
    // }

    // Sedan här ska man kontrollera om det är menat till databasen eller till en annan php fil, så det kan exempelvis
    // Vara en tabell som skickas som request först i url och då måste vi kontrollera om det är det eller inte osv, som
    // Sedan anropas requesthandler för tabellen eller bara echoar den filen

}

function requestHandler($requestMethod){

    $phpInput = json_decode(file_get_contents("php://input"), true);

    if ($requestMethod == "GET") {
        getRequest($_GET);
    } else if ($requestMethod == "POST") {
        postRequest($phpInput);
    } else if ($requestMethod == "DELETE") {
        deleteRequest($phpInput);
    }

}

function getRequest($requestInput){
    $db = readDB("DB.json");

    // Gör foreach looparna till någon typ av funktion då de används mer, eller använd någon typ av array filter.
    if(count($requestInput) > 1){
        foreach($db as $dbArrays){
            foreach($dbArrays as $dbParameter => $dbObjectValue){
                foreach($requestInput as $requestParamter => $requestObjectValue){
                    if(isset($dbObjectValue[$requestParamter]) && $dbObjectValue[$requestParamter] == $requestObjectValue){
                        return sendRequest($dbArrays);
                    }
                }
            }
        }
    } else {
        foreach($db as $dbArrays){
            foreach($dbArrays as $dbParameter => $dbObjectValue){
                foreach($requestInput as $requestParamter => $requestObjectValue){
                    if(isset($dbObjectValue[$requestParamter]) && $dbObjectValue[$requestParamter] == $requestObjectValue){
                        return sendRequest($requestInput);
                     }
                 }
            }
        }
    }

}

function postRequest($requestInput){
    $db = readDB("DB.json");

    if(count($requestInput) > 1){
        foreach($db as $arrayKey => $dbArrays){
            $countObjects = 0;
            foreach($dbArrays as $dbParameter => $dbObjectValue){
                foreach($requestInput as $requestParamter => $requestObjectValue){
                    if(isset($dbObjectValue[$requestParamter])){
                        $countObjects++;
                    }
                }
            }
            if($countObjects == count($requestInput)){
                array_push($db[$arrayKey], $requestInput);
                sendDB("DB.json", $db);
                sendRequest("Succes, user posted!");
        
            }
        }

        
        


    }


}

function deleteRequest($requestInput){
    $db = readDB("DB.json");
    $updatedDb = [];

    if(count($requestInput) > 1){
        foreach($db as $arrayKey => $dbArrays){
            $countObjects = 0;
            foreach($dbArrays as $dbParameter => $dbObjectValue){
                foreach($requestInput as $requestParamter => $requestObjectValue){
                    if(isset($dbObjectValue[$requestParamter]) && $dbObjectValue[$requestParamter] == $requestObjectValue){
                        $countObjects++;
                    }
                }
            }
            if($countObjects == count($requestInput)){
                $db[$arrayKey] = array_filter($db[$arrayKey], fn($tableObject) => $tableObject != $requestInput);
                sendDB("DB.json", $db);
                sendRequest("Succes, user deleted!");
        
            }
        }

    

    }

}

    
function sendRequest($data){
    header("Content-Type: application/json");
    http_response_code(200);
    echo json_encode($data);
    exit();
}


urlHandler($_SERVER["REQUEST_URI"]);




?>