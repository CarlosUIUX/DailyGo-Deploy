<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dailygo";

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$correo = $data['correo'];
$pwd = $data['contrasena'];
$hash = hash('sha256', $pwd);
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if($correo == "admin@dailygo.com"){
    $sql = "SELECT * FROM clientes WHERE mail_cli='$correo' AND pw_cli='$hash'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        while($row = $result->fetch_assoc()) {
            if($row['TLF_CLI'] == 0){
                echo "Dentro";
            }else{
                echo "Error1";
            }
        }   
    }else{
        echo "Error2";
    }
} else {
    echo "Error2";
}

$conn->close();
