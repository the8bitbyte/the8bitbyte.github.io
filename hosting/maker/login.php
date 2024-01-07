<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["admin"];
    $password = $_POST["8604265334"];

    // In a real-world scenario, you would perform some basic validation here.

    // For simplicity, let's assume any non-empty values are valid.
    if (!empty($username) && !empty($password)) {
        // Login successful, you can redirect or perform some action.
        echo "Login successful!";
    } else {
        // Login failed, you can display an error message.
        echo "Invalid username or password.";
    }
}
?>
