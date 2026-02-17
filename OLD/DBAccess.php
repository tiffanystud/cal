<!-- Validera och anropa DBIO vid behov (CRUD) -->
<!-- Hanterar ej CORT/HTTTP -->

<?php 
require_once "DBIO.php";
require_once "HTTPHandler.php";
class Validate {

    private $request_data;

    public function __construct($request_data){
        $this->request_data = $request_data;
    }

    // public static function getDB($request_data){
    //     $this->request_data = $request_data;

    // }

    public function check_get(){
        $DB_data = new Content("DB.json");

        if(!count($this->request_data) > 0){
            return "Invalid get request!";
        }

        // Kanske göra en statisk array med alla databas parametrar, eller något som skulle
        // jämföra om det fanns i som get parameter så man kan hämta datan, eller kanske bara en loop över alla db tabeller, kolla det!!n
        
        
        if(is_array($this->request_data)){
            $correct_user_table;
            $correct_usergroup_table;
            $correct_group_table;

            foreach($this->request_data as $request_key){
               if($request_key == "userName" || $request_key == "password" || $request_key == "email"){
                    $correct_user_table = $DB_data.get_db_tables("User");
               }
               if($request_key == "isAdmin"){
                $correct_usergroup_table = $correct_usergroup_table = $DB_data.get_db_tables("User_Group");
               }
               if($request_key == "groupName"){
                $correct_group_table = $correct_group_table = $DB_data.get_db_tables("Group");
               }
            }

            // Kanske ha kontroll för array längden istället, jag tror det är truthy falsy osv.
            if($correct_user_table){
                echo $correct_user_table;
            }

            if($correct_usergroup_table){
                echo $correct_usergroup_table;
            }

            if($correct_group_table){
                echo $correct_group_table;
            }

        }

        //Här jämför jag om det är en sträng

        if($this->request_data == "userId" || $this->request_data == "username" || $this->request_data == "password" || $this->request_data == "email" ||
        $this->request_data == "isAdmin" || $this->request_data == "groupName"){
            $correct_table = $DB_data->get_db_tables($this->request_data);
            echo $correct_table;
        }

        echo "Something is wrong!";

    }

    public function check_post($data){




    }



}



?>