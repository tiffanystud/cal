<?php

require_once __DIR__ . "/../services/UsersAvailabilitiesService.php";
class UsersAvailabilities {

    /* -- RESPONSES -- */
    static function bubbleError($exc, $sender) {
    
        $responseCode;
        
        // Check exc msg for response code
        switch ($exc->getMessage()) {
            
            case "Missing attributes":
                $responseCode = 400;
                break;
                
            case "Availability not found":             
            case "User or calendar not found":
                $responseCode = 404;
                break;
                
            case "Availability already exists":
                $responseCode = 409;
                break;
                
            // Not an error, valid
            case "No changes made":
                $response = $exc; // Eller vad ska jag sätta här?
                $status = 204;
                return self::bubbleMessage($response, $status);
                
            default:
                $positionMsg = " (Thrown at: " . $sender . "), bubbled at: bubbleError ";
                return self::bubbleDefault($positionMsg, 400);
        }
    
        http_response_code($responseCode);
        echo json_encode(["error" => $exc->getMessage()]);
        exit;
    }
    
    static function bubbleMessage($response, $responseCode) {
        http_response_code($responseCode);
        echo json_encode(["message" => $response->getMessage()]);
        exit;
    }
    
    static function bubbleDefault($position, $status) {
        
        // Se över **
        $production = false;
        if ($production) {
            var_dump("Default bubble at: " . $position . " ----- UsersAvailabilitiesController.php ----- ");
        }
            
        http_response_code($status);
        echo json_encode(new Exception("Something went wrong"));
        exit;
    }
    
    
    /* -- HANDLER -- */
    public static function handle($method, $input) {

        if ($method == "GET") {
            
            $userId = $_GET["id"] ?? null;
            $date = $_GET["date"] ?? null;
            
            try {
                                   
                if ($userId && $date) {
                    $result = UsersAvailabilitiesService::getAll($userId, $date);
                    return self::bubbleMessage($result, 200);
                }
                
                // Se över ***
                return self::bubbleDefault("GET/ try-block", 500);

            } catch (Exception $exc) {
                  
                return self::bubbleError($exc, "GET/ catch-block");

            }
                                    
        }

        if ($method == "POST") {

            try {

                $userId = $input["id"] ?? null;
                $date = $input["date"] ?? null;
                $isAvailable = $input["isAvailable"] ?? null;
                $calId = $input["calId"] ?? null;
                
                if ($userId && $date && $isAvailable && $calId) {
                    $result = UsersAvailabilitiesService::create($userId, $date, $isAvailable, $calId);
                    return self::bubbleMessage($result, 201);                    
                }
                
                $exc = new ErrorException("Missing attributes");
                return self::bubbleError($exc, "POST /try-block");
                
            } catch (Exception $exc) {
                
                return self::bubbleError($exc, "POST /catch-block");
                
            }
            
            
        }

        if ($method == "PATCH") {

            try {

                $userId = $input["id"] ?? null;
                $date = $input["date"] ?? null;
                $isAvailable = $input["isAvailable"] ?? null;
                $calId = $input["calId"] ?? null;
            
                if ($userId && $date && $isAvailable && $calId) {
                    $result = UsersAvailabilitiesService::update($input);
                    return self::bubbleMessage($result, 200);
                }
                
                $exc = new Exception("Missing attributes");
                return self::bubbleError($exc, "PATCH /try-block");

            } catch (Exception $exc) {
                
                return self::bubbleError($exc, "PATCH /catch-block");
                
            }
            
        }

        if ($method == "DELETE") {

            try {
                
                $userId = $input["id"] ?? null;
                $date = $input["date"] ?? null;
                $calId = $input["calId"] ?? null;
                
                // If input exists
                if ($userId && $date && $calId) {
                    $result = UsersAvailabilitiesService::delete($userId, $date, $calId);
                    return self::bubbleMessage($result, 200);                    
                }
                
                $exc = new ErrorException("Missing attributes");
                return self::bubbleError($exc, "DELETE /try-block");
            
            } catch (Exception $exc) {
                
                return self::bubbleError($exc, "DELETE /catch-block");

            }
        }

    }

}