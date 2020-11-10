<?php
    require_once "autoload.php";
    session_start();

    $username = $_POST["username"];
    $password = $_POST["password"];
    $errors = array();
    $dao = new UserDAO();

    if (empty($username)){
        array_push($errors, "Username is required.");
    }

    if (empty($password)){
        array_push($errors, "Password is required.");
    }

    $user_exist = $dao->usernameExist($username);
    
    if (!$user_exist){
        array_push($errors, "User is not registered!");
    }

    if (empty($errors)){
        $hashed = $dao->getHashedPassword($username);
        $verified = password_verify($password, $hashed);

        if($verified) {
            $_SESSION["user"] = $username;
            echo "Successful Login";
        }
        else {
            $_SESSION["error"] = "Failed Login";
            header("Location: login.php?username=$username");
        }

    }
    else{
        foreach($errors as $error){
            echo $error. "<br>";
        }
    }
    // $hashed = $dao->getHashedPassword($username);

    // $status = password_verify($password,$hashed);
    // if($status) {
    //     session_start();
    //     $_SESSION["user"] = $username;
    //     echo "Successful Login";
    // }
    // else {
    //     session_start();
    //     $_SESSION["error"] = "Failed Login";
    //     header("Location: login.php?username=$username");
    // }
?>