<?php
require_once 'protect.php';

$username = $_SESSION['user'];

echo "Hello $username. You are at another page";

echo "<br><a href='logout.php'>Logout</a>";
?>