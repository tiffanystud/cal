<!-- Pratar med databasen (uppdatera, läsa osv) -->
<!-- Ingen logik eller validering (görs i DBAccess) -->


<?php 
class Content{

    private $database_name;

    public function __construct($database_name){
        $this->database_name = $database_name;
        
    }

    public static function read_data(){
        $DB_data_json = file_get_contents("DB.json");
        $DB_data = json_decode($DB_data_json, true);
        return $DB_data;
    }

    public function get_db_tables($table_name){
        $DB_data = Content::read_data();

        foreach($DB_data as $tables){
            if($table_name == $tables){
                $json_table = json_decode($tables, true);
                return $json_table;
            }
        }

        echo "No table as name found!";

    }

    public function send_data(){

    }



}

?>