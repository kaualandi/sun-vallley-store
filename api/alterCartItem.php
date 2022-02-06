<?php
    require_once('conexao.php');

    $mybody = json_decode(file_get_contents('php://input'), true);
    if (!$mybody) {
        echo json_encode(array('error' => "Não foi possível obter dados da requisição!"));
        exit();
    }

    $user_id = trim($mybody['user_id']);
    $cart_id = trim($mybody['cart_id']);
    $state = trim($mybody['state']);

    if(!$user_id || !$cart_id || !$state) {
        echo json_encode(array('error' => "Preencha todos os campos!"));
        exit();
    }

    $sql = "SELECT qtd FROM cart WHERE client_id = ? AND cart_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ii', $user_id, $cart_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = mysqli_fetch_array($result);
    if($row == 0) {
        echo json_encode(array('error' => "Não consegui encontrar esse produto em seu carrinho!"));
        exit();
    } else {
        $currentQtd = $row['qtd'];

            if ($state == '+') {
                $newQtd = $currentQtd + 1;
            } else {
                $newQtd = $currentQtd - 1;
            }
            if ($newQtd <= 0) {
                echo json_encode(array('error' => "Não é possível diminuir a quantidade, tente excluir o produto!"));
                exit();
            } else {
            $sql = "UPDATE cart SET qtd = ? WHERE client_id = ? AND cart_id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('iii', $newQtd, $user_id, $cart_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $stmt->affected_rows;
            if($row == 0) {
                echo json_encode(array('error' => "Não foi possível alterar a quantidade do produto!"));
                exit();
            } else {
                echo json_encode(array('success' => "Quantidade alterada com sucesso!"));
                exit();
            }
        }
    }
