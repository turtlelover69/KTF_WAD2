<?php
session_start();
if ( !isset($_SESSION["user"]) ) {
    // No session variable "user" =>no login
   
    $_SESSION["error"] = "You have not logged in";
    
    // redirect to login page
    header("Location: login.php"); 
    exit;
}
?>
