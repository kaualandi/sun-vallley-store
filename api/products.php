<?php
    require_once("conexao.php");

    $sql = "SELECT * FROM products";
    $stmt = $conn->prepare($sql);
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
        echo json_encode(array('error' => "Não conseguimos recuperar a lista de produtos!"));
        exit();
    }
