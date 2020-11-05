<?php
session_start();

// connect to db
$db = mysqli_connect("localhost", "root", "", "ktf_users");

// declaration of variables
$username = "";
$email = "";
$errors = array();

//call register function if button is clicked
if (isset($_POST["register_btn"])) {
    register();
}

function register(){
    // make these variables global for use
    global $db, $errors, $username, $email;

    //receive all inputs from form. call escape string function
    $username = e($_POST["username"]);
    $email = e($_POST["email"]);
    $password_1 = e($_POST["password_1"]);
    $password_2 = e($_POST["password_2"]);

    //form validation
    if (empty($username)) {
        array_push($errors, "Username is required");
    }
    if (empty($email)) {
        array_push($errors, "Email is required");
    }
    if (empty($password_1)) {
        array_push($errors, "Password is required");
    }
    if ($password_1 != $password_2) {
        array_push($errors, "The two passwords do not match");
    }

    //register user only if no errors
    if (count($errors) == 0){
        // encrypt password
        $hashed_password = password_hash($password_1, PASSWORD_DEFAULT);

        if (isset($_POST["user_type"])) {
            $user_type = e($_POST["user_type"]);
            $query = "INSERT INTO users (username, email, user_type, password)
            VALUES('$username', '$email', '$user_type', '$hashed_password')";
            mysqli_query($db, $query);
            $_SESSION["success"] = "New user successfully created!";
            header("location: home.php");
        }
        else{
            $query = "INSERT INTO users (username, email, user_type, password)
            VALUES('$username', '$email', 'user', '$hashed_password')";
            mysqli_query($db, $query);

            //get id of created user
            $logged_in_user_id = mysqli_insert_id($db);

            $_SESSION["user"] = getUserById($logged_in_user_id);
            $_SESSION["success"] = "You are now logged in";
            header("location: index.php");
        }
    }
}

//return user array from id
function getUserById($id){
    global $db;
    $query = "SELECT * FROM users WHERE id=". $id;
    $result = mysqli_query($db, $query);

    $user = mysqli_fetch_assoc($result);
    return $user;
}

function e($val){
    global $db;
    return mysqli_real_escape_string($db, trim($val));
}

function display_error(){
    global $errors;

    if (count($errors) > 0){
        echo "<div class='error'>";
            // print out the errors detected
            foreach ($errors as $error){
                echo $error ."<br>";
            }
        echo "</div>";
        
    }
}

//Logged in status
function isLoggedIn(){
    if (isset($_SESSION["user"])) {
        return true;
    }
    else{
        return false;
    }
}


//log user out if button is clicked
if (isset($_GET["logout"])) {
    session_destroy();
    unset($_SESSION["user"]);
    header("location: login.php");
}

//call login function when button clicked
if (isset($_POST["login_btn"])){
    login();
}

function login(){
    global $db, $username, $errors;

    // form values
    $username = e($_POST["username"]);
    $password = e($_POST["password"]);

    //form validation
    if (empty($username)) {
        array_push($errors, "Username is required");
    }
    if (empty($password)) {
        array_push($errors, "Password is required");
    }

    //attempt login if no errors
    if (count($errors) == 0) {

        $hashed_password = getHashedPassword($username);
        $verified = password_verify($password, $hashed_password);

        $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password' LIMIT 1";
        $results = mysqli_query($db, $query);

        if (mysqli_num_rows($results) == 1 && $verified ) { //user is found & password verified
            // check user type
            $logged_in_user = mysqli_fetch_assoc($results);
            if ($logged_in_user["user_type"] == "admin"){

                $_SESSION["user"] = $logged_in_user;
                $_SESSION["success"] = "You are now logged in";
                header("location: admin/home.php");
            }
            else{
                $_SESSION["user"] = $logged_in_user;
                $_SESSION["success"] = "You are now logged in";
                header("location: index.php");
            }
        }
        else{
            array_push($errors, "Wrong username/password combination");
        }
    }
}

function getHashedPassword($username){ 
    global $db; 
    $query = "select * from user where username=". $username; 
    $result = mysqli_query($db, $query); 
 
    $hashed = mysqli_fetch_assoc($result); 
    return $hashed; 
 
}

function isAdmin()
{
	if (isset($_SESSION['user']) && $_SESSION['user']['user_type'] == 'admin' ) {
		return true;
	}else{
		return false;
	}
}

?>