<?php
    header('Content-Type: application/json; charset=utf-8');

    session_start();

    $host = "localhost";
    $user = "root";
    $pass = "";
    $db = "sunvalley";
    $conn = mysqli_connect($host, $user, $pass, $db);
    if(!$conn) {
        http_response_code(503);
        echo json_encode(array('error' => 'Não foi possível conectar ao banco de dados!'));
        exit();
    }