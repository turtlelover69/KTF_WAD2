<?php
    require_once "../login_system/autoload.php";
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="./dashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
</head>
<body>

    <input type="checkbox" id="check">
    <!--header area start-->
    <header>
        <label for="check">
            <i class="fas fa-bars" id="sidebar_btn"></i>
        </label>
        <div class="left_area">
            <h3>Kyung <span>TauFoo</span></h3>
        </div>
        <div class="right_area">
            <a href="../login_system/logout.php" class="logout_btn">Logout</a>
        </div>
    </header>
    <!--header area end-->

    <!--side bar start-->
    <div class="sidebar">
        <center>
            <img src="./ultimateweeb.PNG" alt="" class="profile_image">
            <h4>Ultimate Weeb</h4>
        </center>
        <a href="#"><i class="fas fa-desktop"></i><span>Dashboard</span></a>
        <a href="#"><i class="fas fa-cogs"></i><span>Components</span></a>
        <a href="#"><i class="fas fa-table"></i><span>Tables</span></a>
        <a href="#"><i class="fas fa-th"></i><span>Forms</span></a>
        <a href="#"><i class="fas fa-info-circle"></i><span>About</span></a>
        <a href="#"><i class="fas fa-sliders-h"></i><span>Settings</span></a>
    </div>
    <!--side bar end-->

    <div class="content">
        
    </div>
</body>
</html>

