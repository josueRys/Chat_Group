<?php
    session_start();

    if(empty($_SESSION["user"])){
        header("Location:../");
    }else{
        include "../view/html/chat-view.html";
    }
?>