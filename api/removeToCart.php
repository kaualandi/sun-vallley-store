<?php
    require_once("conexao.php");

    $mybody = json_decode(file_get_contents('php://input'), true);

    if (!$mybody) {
        echo json_encode(array('error' => "Não foi possível obter dados do usuário!"));
        exit();
    }

    $user_id = trim($mybody['user_id']);
    $cart_id = trim($mybody['cart_id']);

    if(!$user_id) {
        echo json_encode(array('error' => "Entre em sua conta primeiro!"));
        exit();
    }
    if(!$cart_id) {
        echo json_encode(array('error' => "Não foi possível obter dados do produto!"));
        exit();
    }

    $cart_id = intval($cart_id);

    $sql = "DELETE FROM cart WHERE cart_id = ? AND client_id = ?;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $cart_id, $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $stmt->affected_rows;
    if($row != 0) {
        echo json_encode(array('success' => "Removido do carrinho!"));
        exit();
    } else {
        echo json_encode(array('error' => "Não conseguimos remover!"));
        exit();
    }