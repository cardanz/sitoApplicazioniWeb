<?php

require '../global.php';
require '../connect.php';
require '../functions.php';

$token = $_GET['token'];

$me = authenticate($token);

$stmt = $mysqli->prepare('SELECT * FROM posts ORDER BY lastEdit DESC');
$stmt->execute();

$result = $stmt->get_result();

$posts = [];
while ($row = $result->fetch_assoc()) {
    array_push($posts, $row);
}

echo json_encode($posts);
