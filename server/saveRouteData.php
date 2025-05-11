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

// Database connection
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
if (isset($_POST['name'], $_POST['department'], $_POST['state'], $_POST['route'], $_POST['line'])) {
    $name = $conn->real_escape_string($_POST['name']);
    $department = $conn->real_escape_string($_POST['department']);
    $state = $conn->real_escape_string($_POST['state']);
    $route = $conn->real_escape_string($_POST['route']);
    $line = $conn->real_escape_string($_POST['line']);

    // SQL query to insert data into the database
    $sql = "INSERT INTO route_data1 (name, department, state, route, line) 
            VALUES ('$name', '$department', '$state', '$route', '$line')";

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