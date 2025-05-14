<?php
// filepath: c:\xampp\htdocs\train_sim_sunr\server\save_route.php

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

file_put_contents("php://stderr", print_r($_POST, true));
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "train_simulation_rjt";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form data is received
if (isset($_POST['name'], $_POST['CLI'], $_POST['route'], $_POST['line'], $_POST['startTime'], $_POST['endTime'], $_POST['totalTime'])) {
    $name = $conn->real_escape_string($_POST['name']);
    $CLI = $conn->real_escape_string($_POST['CLI']);
    $route = $conn->real_escape_string($_POST['route']);
    $line = $conn->real_escape_string($_POST['line']);
    $startTime = $conn->real_escape_string($_POST['startTime']);
    $endTime = $conn->real_escape_string($_POST['endTime']);
    $totalTime = $conn->real_escape_string($_POST['totalTime']);


    // SQL query to insert data into the database
    $sql = "INSERT INTO route_data1 (name, CLI, route, line, start_time, end_time, total_time) 
            VALUES ('$name', '$CLI', '$route', '$line', '$startTime', '$endTime', '$totalTime')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Route data saved successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
}

$conn->close();
?>


<!-- -- Creates the route_data1 table in the train_sim_rjt database
CREATE TABLE route_data1 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    CLI VARCHAR(255) NOT NULL,
    route VARCHAR(255) NOT NULL,
    line VARCHAR(255) NOT NULL,
    start_time VARCHAR(50) NOT NULL,
    end_time VARCHAR(50) NOT NULL,
    total_time VARCHAR(50) NOT NULL
); -->