
<?php

require_once __DIR__ . "/../services/CalendarsMSGService.php";
class CalendarsMSGController {

    /* -- RESPONSES -- */
    static function bubbleError($exc, $sender){
        
        // Check exc msg (set from services and catched or thrown w/exc in controller) to set correct response code 
        switch ($exc->getMessage()) {

            case "Missing attributes":
                $responseCode = 400;
                break;

            case "Calendar messages not found":
            case "Invalid calendar":
            case "Message not found":
            case "Messages not found":
                $responseCode = 404;
                break;

            case "Message already sent":
                $responseCode = 409;
                break;

            // Not an error, valid
            case "No changes made":
                $response = $exc; // Eller vad ska jag sätta här?
                $status = 409;
                return self::bubbleMessage($response, $status);

            default:
                $positionMsg = " (Thrown at: " . $sender . "), bubbled at: bubbleError ";
                return self::bubbleDefault($positionMsg, 400);
        }

        // After cases
        http_response_code($responseCode);
        echo json_encode(["error" => $exc->getMessage()]);
        exit;
    }

    static function bubbleMessage($response, $responseCode)
    {
        http_response_code($responseCode);

        // Hanterar arrays eller exc
        if (is_array($response)) {
            echo json_encode($response);
            exit;
        }

        echo json_encode(["message" => $response->getMessage()]);
        exit;
    }

    static function bubbleData($data, $status)
    {
        http_response_code($status);
        echo json_encode($data);
        exit;
    }

    static function bubbleDefault($position, $status)
    {

        // Se över **
        $production = false;
        if ($production) {
            // var_dump("Default bubble at: " . $position . " ----- EventsRSVP.php ----- ");
        }

        http_response_code($status);
        echo json_encode(new Exception("Something went wrong"));
        exit;
    }


    /* -- HANDLER -- */
    public static function handle($method, $input)
    {

        if ($method == "GET") {

            try {

                $result = CalendarsMSGService::getAll($input);
                return self::bubbleData($result, 200);

            } catch (Exception $exc) {

                return self::bubbleError($exc, "GET/ catch-block");

            }
        }


        if ($method == "POST") {

            try {
                 
                $result = CalendarsMSGService::create($input);
                return self::bubbleMessage($result, 201);

            } catch (Exception $exc) {
                
                return self::bubbleError($exc, "POST /catch-block");

            }


        }

        if ($method == "PATCH") {

            try {
                    
                $result = CalendarsMSGService::update($input);
                return self::bubbleMessage($result, 200);

            } catch (Exception $exc) {

                return self::bubbleError($exc, "PATCH /catch-block");

            }

        }

        if ($method == "DELETE") {

            try {
                    
                $result = CalendarsMSGService::delete($input);
                return self::bubbleMessage($result, 200);

            } catch (Exception $exc) {

                return self::bubbleError($exc, "DELETE /catch-block");

            }
        }

    }

}