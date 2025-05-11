<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $_SESSION['name'] = $_POST['name'];
    $_SESSION['department'] = $_POST['department'];
    $_SESSION['start_time'] = time();

    // Redirect to the built React app
    header("Location: /train_sim_sunr/index.html");
    exit();
}
