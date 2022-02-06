<?php
    require_once('conexao.php');

    $mybody = json_decode(file_get_contents('php://input'), true);
    if (!$mybody) {
        echo json_encode(array('error' => "Não foi possível obter dados do usuário!"));
        exit();
    }
    $user_id = $mybody['user_id'];

    $sql = "SELECT * FROM orders WHERE client_id = ? ORDER BY data DESC;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = mysqli_num_rows($result);
    if($row != 0) {
        $data = array();
        while ($registro = mysqli_fetch_array($result)) {
            $data[] = $registro;
        }
        echo json_encode($data);
        exit();
    } else {
        echo json_encode(array('error' => "Você não tem nenhum pedido!"));
        exit();
    }