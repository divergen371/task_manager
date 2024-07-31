<?php
require 'config.php';

$sql = 'SELECT * FROM tasks ORDER BY created_at DESC';
$stmt = $pdo->prepare($sql);
$stmt->execute();
$tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($tasks);
