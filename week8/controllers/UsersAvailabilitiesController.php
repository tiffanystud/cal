<?php

require_once __DIR__ . "/../services/UsersAvailabilitiesService.php";
class UsersAvailabilities {

    static function throwExc($exc, $responseCode) {
        http_response_code($responseCode);
        echo json_encode(["error" => $exc->getMessage()]);
        exit;
    }
    
    static function okResponse($response, $responseCode) {
        http_response_code($responseCode);
        echo json_encode(["message" => $response->getMessage()]);
        exit;
    }
    
    public static function handle($method, $input) {

        if ($method == "GET") {
            
            $userId = $_GET["id"] ?? null;
            $date = $_GET["date"] ?? null;
            
            try {
                
                                
                if ($userId && $date) {
                    // Kör getAll($userId)
                    $result = UsersAvailabilitiesService::getAll($userId, $date);
                    return self::okResponse($result, 200);
                }
                    
                if (!$userId && !$date ) {
                    // Kör getAll($userId)
                    
                    return self::okResponse($result, 200);
                }

                    return self::okResponse($result, 201);
                
                
            } catch (Exception $exc) {
                
                switch ($exc->getMessage()) {
                    
                    case "Missing Parameters":
                        return self::throwExc($exc, 400);
                        
                    case "Availability Not Found":
                        return self::throwExc($exc, responseCode: 404);
                        
                    default:
                        return self::throwExc($exc, responseCode: 500);

                }
            }

        }

        if ($method == "POST") {

            try {

                $userId = $input["id"] ?? null;
                $date = $input["date"] ?? null;
                $isAvailable = $input["isAvailable"] ?? null;
                $calId = $input["calId"] ?? null;
                
            } catch (Exception $exc) {

            }
            
        }

        if ($method == "PATCH") {

            try {

            } catch (Exception $exc) {

            }
            
        }

        if ($method == "DELETE") {

            try {

            } catch (Exception $exc) {

            }
            
        }

    }

}