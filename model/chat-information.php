<?php
	include "BD.php";

	$bd = new BD();

	session_start();

	$space = $_SESSION["space"];

	$bd->getMessageJSON($space);
?>