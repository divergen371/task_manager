<?php
require 'config.php';

// エラーログを表示
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// POSTデータの存在確認
if (!isset($_POST['title']) || !isset($_POST['description'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    exit;
}

$title = $_POST['title'];
$description = $_POST['description'];
$completed = 'false'; // デフォルトでfalseに設定

try {
    $sql = 'INSERT INTO tasks (title, description, completed) VALUES (:title, :description, :completed)';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['title' => $title, 'description' => $description, 'completed' => $completed]);
    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}