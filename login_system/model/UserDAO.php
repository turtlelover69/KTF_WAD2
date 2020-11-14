<?php
    spl_autoload_register(function($class){
        require_once $class . ".php";
    });

    class UserDAO{
        
        function add($user) {
            $conn_manager = new ConnectionManager();
            $pdo = $conn_manager->getConnection();

            $username = $user->getUsername();
            $hashed_password = $user->getHashedPassword();
            $email = $user->getEmail();
            
            $sql = "insert into users (username, email, hashed_password) values (:username, :email, :hashed_password)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":username",$username, PDO::PARAM_STR);
            $stmt->bindParam(":hashed_password",$hashed_password, PDO::PARAM_STR);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $status = $stmt->execute();

            $stmt->closeCursor();
            $pdo = null;
            return $status;
        }

        function getHashedPassword($username){
            $conn_manager = new ConnectionManager();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select * from users where username= :username";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":username", $username, PDO::PARAM_STR);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            
            $stmt->execute();
            if($row = $stmt->fetch()){
                
               $hashed_password = $row["hashed_password"];

            } else {
                $hashed_password = FALSE;
            }

            $stmt->closeCursor();
            $pdo = null;

            return $hashed_password;
        }

        function usernameExist($username){
            $conn_manager = new ConnectionManager();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select * from users where username= :username";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":username", $username, PDO::PARAM_STR);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            
            $stmt->execute();
            if($row = $stmt->fetch()){
                
                $exist = TRUE;

            } 
            else {
                $exist = FALSE;
            }

            $stmt->closeCursor();
            $pdo = null;

            return $exist;
        }

        function emailExist($email){
            $conn_manager = new ConnectionManager();
            $pdo = $conn_manager->getConnection();
            
            $sql = "select * from users where email= :email";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->setFetchMode(PDO::FETCH_ASSOC);
            
            $stmt->execute();
            if($row = $stmt->fetch()){
                
                $exist = TRUE;

            } 
            else {
                $exist = FALSE;
            }

            $stmt->closeCursor();
            $pdo = null;

            return $exist;
        }
    }
?>