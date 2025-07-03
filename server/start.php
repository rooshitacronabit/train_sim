<?php
// Database connection
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "train_sim_sunr";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form data is received
if (isset($_POST['user_name']) && isset($_POST['CLI'])) {
    $name = $conn->real_escape_string($_POST['user_name']);
    $CLI = $conn->real_escape_string($_POST['CLI']);

    $sql = "INSERT INTO user_data (name, CLI) VALUES ('$name', '$CLI')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Data received successfully"]);
    } else {
        echo json_encode(["message" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["message" => "Invalid input"]);
}

$conn->close();
?>