<?php
    session_start();
    
    if(empty($_SESSION["user"])){
        include_once "view/html/register.html";
        if(isset($_POST['register'])){
            $_SESSION["user"] = $_POST['user'];
            $_SESSION["space"] = 'sala_1';
            /* $_SESSION["space"] = $_POST['space']; */
            header("Location:controller/chat-user.php");
        }
    }else{
        header("Location:controller/chat-user.php");
    }
?>