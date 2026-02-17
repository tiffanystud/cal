<!-- HTTP, routing, CORS -->
<!-- Ta emot REQ, skicka RESP -->

<?php
require_once "DBAccess.php";
class Request{

    private $request_method;

    public function __construct($request_method){
        $this->request_method = $request_method;
        Request::handle_request($this->request_method);
    }

    public static function handle_request($method){

        if($method == "GET"){
            $data = $_GET;
            var_dump($_GET);
            // Nån typ av anropning till handle_response efter validate är true typ kanske?
            $values = new Validate($data);
            $values->check_get();
        }



    }

    public static function handle_response(){

    }


}

?>