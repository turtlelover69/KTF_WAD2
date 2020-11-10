<html>
    

    <body>
        
        <h1>Login</h1>

        <form method="post" action="process_login.php">
            <?php 
                $value = "";
                if(isset($_GET["username"])){
                    $value = "value='" . $_GET["username"] . "'";
                }
            ?>
            
            Username <input type="text" name="username" <?= $value?>/><br/>
            Password <input type="password" name="password"/><br/>
            <input type="submit" value="Login"/>
        </form>

        <?php
            session_start();
            if(isset($_SESSION["error"])){
                echo "<p style='color: red'>" .
                         $_SESSION["error"] .
                      "</p>";
                unset($_SESSION["error"]);
            }
        ?>
    </body>
</html>