<?php

require_once __DIR__ . "/../services/GroupsService.php";
class AvailabilitiesController
{

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
    
    public static function handle($method, $input)
    {

        if ($method == "GET") {

            try {
                
                $result = true;    
                
                if (true) {
                    return self::okResponse($result, 200);
                    
                } else if (false) {
                    return self::okResponse($result, 201);
                }
                
            } catch (Exception $exc) {
                
                if (true) {
                    return self::throwExc($exc, 401);
                    
                } else if (false) {
                    return self::throwExc($exc, 400);
                }
            }

        }

        if ($method == "POST") {

            try {

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