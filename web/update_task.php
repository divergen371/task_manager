<?php
require 'config.php';

// POSTデータの存在確認
if (!isset($_POST['id']) || !isset($_POST['completed'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    exit;
}

$id = $_POST['id'];
$completed = $_POST['completed'] === 'true' ? 'true' : 'false';

try {
    $sql = 'UPDATE tasks SET completed = :completed WHERE id = :id';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['completed' => $completed, 'id' => $id]);
    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
