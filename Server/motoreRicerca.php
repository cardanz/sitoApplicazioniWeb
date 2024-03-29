<?php

require './global.php';
require './connect.php';
require './functions.php';

$token = $_GET['token'];
$word = $_POST['word'];

$me = authenticate($token);
$stmt = $mysqli->prepare('SELECT * FROM posts WHERE title LIKE ? ORDER BY lastEdit DESC');
$wordLike = "%$word%";
$stmt->bind_param('s', $wordLike);
$stmt->execute();
$result = $stmt->get_result();
$posts = [];
while ($row = $result->fetch_assoc()) {
    array_push($posts, $row);
}
echo json_encode($posts);
