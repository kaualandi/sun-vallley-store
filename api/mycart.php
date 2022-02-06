<?php
    require_once("conexao.php");

    $mybody = json_decode(file_get_contents('php://input'), true);

    if (!$mybody) {
        echo json_encode(array('error' => "Não foi possível obter dados do usuário!"));
        exit();
    }
    $user_id = trim($mybody['user_id']);

    if(!$user_id) {
        echo json_encode(array('error' => "Entre em sua conta primeiro!"));
        exit();
    }

    $sql = "SELECT * FROM cart INNER JOIN products ON products.id = cart.product_id";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = mysqli_num_rows($result);
    if($row != 0) {
        $rows = array();
        while($r = mysqli_fetch_assoc($result)) {
            if($r['client_id'] == $user_id) {
                $rows[] = $r;
            }
        }
        echo json_encode($rows);
        exit();
    } else {
        echo json_encode(array('error' => "Não há produtos no carrinho!"));
        exit();
    }