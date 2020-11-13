<?php
    require_once "autoload.php";
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password1 = $_POST["password1"];
    $password2 = $_POST["password2"];
    $height = $_POST["height"];
    $weight = $_POST["weight"];
    $errors = array();

    $dao = new UserDAO();
    $user_exist = $dao->usernameExist($username);
    $email_exist = $dao->emailExist($email);

    if ($user_exist){
        array_push($errors, "Username has already been taken!");
    }

    if ($email_exist){
        array_push($errors, "Email has already been taken");
    }

    if ($password1 != $password2){
        array_push($errors, "Passwords do not match!");
    }

    if (empty($username)) { 
		array_push($errors, "Username is required"); 
    }
    
	if (empty($email)) { 
		array_push($errors, "Email is required"); 
    }
    
	if (empty($password1)) { 
		array_push($errors, "Password is required"); 
    }
    if ($height > 300 || $height < 50) {
        array_push($errors, "Height is not humanly possible!");
    }

    if (empty($errors)){
        $hashed = password_hash($password1, PASSWORD_DEFAULT);

        $user = new User($username, $email, $hashed, $height, $weight);
        $dao = new UserDAO();
        $status = $dao->add($user);
        
        echo "Successfully registered!";
    }
    else{
        foreach($errors as $error){
            echo $error. "<br>";
        }
    }
?>