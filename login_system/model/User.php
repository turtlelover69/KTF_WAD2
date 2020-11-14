<?php 
class User {
    private $username;
    private $hashed_password;
    private $email;
    
    function __construct($username, $email, $hashed_password){
        $this->username = $username;
        $this->email = $email;
        $this->hashed_password = $hashed_password;
        
    }

    public function getUsername() {
        return $this->username;
    }

    public function getHashedPassword() {
        return $this->hashed_password;
    }

    public function getEmail(){
        return $this->email;
    }
}
?>