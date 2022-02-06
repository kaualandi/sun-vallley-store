<?php
    require_once('conexao.php');

    $mybody = json_decode(file_get_contents('php://input'), true);
    if (!$mybody) {
        echo json_encode(array('error' => "Não foi possível obter dados do usuário!"));
        exit();
    }

    $user_id = trim($mybody['user_id']);
    $confirmPass = sha1(trim($mybody['confirmPass']));

    if(!$user_id || !$confirmPass) {
        echo json_encode(array('error' => "Preencha todos os campos!"));
        exit();
    }

    $sql = "SELECT pass FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = mysqli_num_rows($result);
    if($row != 0) {
        $row = $result->fetch_assoc();
        $pass = $row['pass'];
        if($pass != $confirmPass) {
            echo json_encode(array('error' => "Senha incorreta!"));
            exit();
        } else {
            $sql = "DELETE FROM orders WHERE (client_id = ?);";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $user_id);
            $stmt->execute();

            $sql = "DELETE FROM cart WHERE (client_id = ?);";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $user_id);
            $stmt->execute();

            $sql = "DELETE FROM users WHERE (id = ?);";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $user_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $stmt->affected_rows;
            echo var_dump($row);
            if($row != 0) {
                echo json_encode(array('success' => "Conta excluída com sucesso!"));
                require_once('logout.php');
                exit();
            } else {
                echo json_encode(array('error' => "Não consegui excluir sua conta, tente novamente!"));
                exit();
            }
        }
    } else {
        echo json_encode(array('error' => "Não conseguimos conferir se sua senha está correta!"));
        exit();
    }