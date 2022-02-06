<?php
    require_once("conexao.php");

    $mybody = json_decode(file_get_contents('php://input'), true);
    $user_id = $mybody['user_id'];

    if($user_id != null) {
        $sql = "SELECT `id`, `name`, `function` FROM users WHERE id = ?;";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = mysqli_fetch_array($result);
        if($row != 0) {
            echo json_encode(array("user_id" => $user_id, "user_name" => $row['name'], "user_function" => $row['function']));
            exit();
        }
    } else {
        echo json_encode(array('notloged' => "Usuário não logado!"));
        exit();
    }
