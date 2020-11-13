<?php 
class User {
    private $username;
    private $hashed_password;
    private $email;
    private $height;
    private $weight;
    
    function __construct($username, $email, $hashed_password, $height, $weight){
        $this->username = $username;
        $this->email = $email;
        $this->hashed_password = $hashed_password;
        $this->height = $height;
        $this->weight = $weight;
        
    }
    function __toString()
    {
        return $this->getHeight();
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

    public function getHeight(){
        return $this->height;
    }

    public function getWeight(){
        return $this->weight;
    }
}
?>