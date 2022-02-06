<?php
    require_once("conexao.php");

    $mybody = json_decode(file_get_contents('php://input'), true);
    if (!$mybody) {
        echo json_encode(array('error' => "Não foi possível obter dados do produto!"));
        exit();
    }
    $product_id = trim($mybody['product_id']);
    $user_id = trim($mybody['user_id']);
    $quantity = trim($mybody['quantity']);
    
    if(!$product_id) {
        echo json_encode(array('error' => "Não foi possível obter dados do produto!"));
        exit();
    }
    if(!$user_id) {
        echo json_encode(array('error' => "Entre em sua conta primeiro!"));
        exit();
    }
    if(!$quantity) {
        echo json_encode(array('error' => "Quantidade inválida!"));
        exit();
    }

    $sql = "SELECT * FROM cart WHERE client_id = ? AND product_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $user_id, $product_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    if($row) {
        $qtd = $row['qtd'] + $quantity;
        $sql = "UPDATE cart SET qtd = ? WHERE client_id = ? AND product_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iii", $qtd, $user_id, $product_id);
        $stmt->execute();
        echo json_encode(array('success' => "Adicionamos mais ao carrinho!"));
    } else {

        $sql = "INSERT INTO cart (client_id, product_id, qtd) VALUES (?, ?, ?);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iii", $user_id, $product_id, $quantity);
        $stmt->execute();
        $result = $stmt->get_result();
        $cart_id = $stmt->insert_id;
        if($cart_id != 0) {
            echo json_encode(array('success' => "Adicionamos ao carrinho!"));
            exit();
        } else {
            echo json_encode(array('error' => "Não conseguimos adicionar!"));
            exit();
        }
    }