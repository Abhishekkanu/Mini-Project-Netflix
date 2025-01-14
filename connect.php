<?php
// Database connection
$conn = new mysqli('localhost', 'root', '', 'test');
if ($conn->connect_error) {
    die('Connection Failed: ' . $conn->connect_error);
}

// Determine if the request is for registration or login
if (isset($_POST['action']) && $_POST['action'] === 'register') {
    // Registration process
    $firstname = $_POST['firstname'] ?? '';
    $lastname = $_POST['lastname'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // Validate inputs
    if (empty($firstname) || empty($lastname) || empty($email) || empty($password)) {
        die("Error: All fields are required.");
    }

    // Check if email already exists
    $checkStmt = $conn->prepare("SELECT email FROM users WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        // Email already exists
        echo "<script>alert('Email already registered.');</script>";
    } else {
        // Insert new record
        $stmt = $conn->prepare("INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $firstname, $lastname, $email, $password);
        $stmt->execute();
        echo "<script>alert('Registration Successful!');</script>";
        $stmt->close();
    }

    $checkStmt->close();
} elseif (isset($_POST['action']) && $_POST['action'] === 'login') {
    // Login process
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // Validate inputs
    if (empty($email) || empty($password)) {
        die("Error: Email and password cannot be empty.");
    }

    // Check if email exists and password matches
    $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Email found, verify password
        $stmt->bind_result($storedPassword);
        $stmt->fetch();

        // Directly compare the stored password with the entered password
        if ($storedPassword === $password) {
            echo "<script>alert('Login Successful!');</script>";
        } else {
            echo "<script>alert('Incorrect password.');</script>";
        }
    } else {
        // Email not found
        echo "<script>alert('user not found.');</script>";
    }

    $stmt->close();
}

$conn->close();
?>