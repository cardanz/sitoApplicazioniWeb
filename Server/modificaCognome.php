<?php
require './global.php';
require './connect.php';
require './functions.php';

$token = $_GET['token'];
$me = authenticate($token);
$lastname = $_POST['newlastname'];

$stmt = $mysqli->prepare('SELECT * FROM users WHERE username = ?');
$stmt->bind_param('s', $me['username']);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_rows === 1) {
    $stmt = $mysqli->prepare('UPDATE `users` SET `lastname` = ? WHERE `users`.`username` = ?');
    $stmt->bind_param('ss', $lastname ,  $me['username']);
    $stmt->execute();
    $me = $result->fetch_assoc();
        
    echo json_encode([
        'hasLoggedIn' => true,
        'token' => $token,
        'me' => $me,
      ]);
} else {
    echo json_encode(['hasLoggedIn' => false]);    
    }
?>