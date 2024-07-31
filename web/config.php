<?php
$host = 'db';
$db = 'task_manager';
$user = 'task';
$pass = 'P@ssword-';

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Could not connect to the database $db : " . $e->getMessage());
}
