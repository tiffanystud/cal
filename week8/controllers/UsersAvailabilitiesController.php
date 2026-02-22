<?php

require_once __DIR__ . "/../services/UsersAvailabilitiesService.php";
class UsersAvailabilitiesController
{

    /* -- RESPONSES -- */
    static function bubbleError($exc, $sender)
    {

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
                $status = 409;
                return self::bubbleMessage($response, $status);

            default:
                $positionMsg = " (Thrown at: " . $sender . "), bubbled at: bubbleError ";
                return self::bubbleDefault($positionMsg, 400);
        }

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
            // var_dump("Default bubble at: " . $position . " ----- UsersAvailabilitiesController.php ----- ");
        }

        http_response_code($status);
        echo json_encode(new Exception("Something went wrong"));
        exit;
    }


    /* -- HANDLER -- */
    public static function handle($method, $input)
    {

        if ($method == "GET") {

            $userId = $_GET["userId"] ?? null;
            $date = $_GET["date"] ?? null;

            try {

                if (!isset($userId, $date)) {
                    throw new Exception("Missing attributes");
                }

                $result = UsersAvailabilitiesService::getAll($userId, $date);
                return self::bubbleData($result, 200);

            } catch (Exception $exc) {

                return self::bubbleError($exc, "GET/ catch-block");

            }
        }


        if ($method == "POST") {

            try {

                $userId = $input["userId"] ?? null;
                $date = $input["date"] ?? null;
                $isAvailable = $input["isAvailable"] ?? null;
                $calId = $input["calId"] ?? null;

                if (!isset($userId, $date, $isAvailable, $calId)) {
                    $exc = new ErrorException("Missing attributes");
                    return self::bubbleError($exc, "POST /try-block");
                }
                    
                $result = UsersAvailabilitiesService::create($userId, $date, $isAvailable, $calId);
                return self::bubbleMessage($result, 201);

            } catch (Exception $exc) {

                return self::bubbleError($exc, "POST /catch-block");

            }


        }

        if ($method == "PATCH") {

            try {

                $userId = $input["userId"] ?? null;
                $date = $input["date"] ?? null;
                $isAvailable = $input["isAvailable"] ?? null;
                $calId = $input["calId"] ?? null;

                if (!isset($userId, $date, $isAvailable, $calId)) {
                    $exc = new Exception("Missing attributes");
                    return self::bubbleError($exc, "PATCH /try-block");
                }
                    
                $result = UsersAvailabilitiesService::update($input);
                return self::bubbleMessage($result, 200);

            } catch (Exception $exc) {

                return self::bubbleError($exc, "PATCH /catch-block");

            }

        }

        if ($method == "DELETE") {

            try {

                $userId = $input["userId"] ?? null;
                $date = $input["date"] ?? null;
                $calId = $input["calId"] ?? null;

                // If input exists
                if (!isset($userId, $date, $calId)) {
                    $exc = new ErrorException("Missing attributes");
                    return self::bubbleError($exc, "DELETE /try-block");
                }
                    
                $result = UsersAvailabilitiesService::delete($userId, $date, $calId);
                return self::bubbleMessage($result, 200);

            } catch (Exception $exc) {

                return self::bubbleError($exc, "DELETE /catch-block");

            }
        }

    }

}