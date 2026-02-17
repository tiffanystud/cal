<?php

  
    // $request = new Request($_SERVER["REQUEST_METHOD"]); 




    if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    }

    if($_SERVER["REQUEST_METHOD"] == "DELETE"){
        
    }

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>


    <form action="index.php" method="GET">
        <input type="text" name="userName">
        <input type="text" name="password">
        <input type="text" name="email">
        <button type="submit"></button>
    </form>


    <pre>
    <?php

    require_once "HTTPHandler.php";


    if($_SERVER["REQUEST_METHOD"] == "GET"){
        $request = new Request($_SERVER["REQUEST_METHOD"]);
        var_dump($request);
    }
    
    ?>
    </pre>


</body>
</html>