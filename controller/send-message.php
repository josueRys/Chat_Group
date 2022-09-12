<?php

    include "../model/BD.php";

    $bd = new BD();
    
    session_start();
    
    if(empty($_SESSION["user"])){
        header("Location:controller/chat-user.php");
    }

    $message = $_POST['message'];

    $space = $_SESSION["space"];
    $user = $_SESSION["user"];

    $bd->insertMessage($message,$user,$space);

?>