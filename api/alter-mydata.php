<?php
    require_once("conexao.php");

    $mybody = json_decode(file_get_contents('php://input'), true);
    if (!$mybody) {
        echo json_encode(array('error' => "Não foi possível obter dados do usuário!"));
        exit();
    }
    $user_id = trim($mybody['user_id']);
    $name = trim($mybody['name']);
    $email = trim($mybody['email']);
    $phone = trim($mybody['phone']);
    $phone = preg_replace('/[^0-9]+/', '', $phone);
    $confirmpass = sha1(trim($mybody['confirmpass']));

    if(!$user_id || !$name || !$email || !$phone || !$confirmpass) {
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
        if($pass != $confirmpass) {
            echo json_encode(array('error' => "Senha incorreta!"));
            exit();
        } else {
            $sql = "UPDATE users SET email = ?, name = ?, phone = ? WHERE (id = ?);";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssi", $email, $name, $phone, $user_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $stmt->affected_rows;
            if($row != 0) {
                echo json_encode(array('success' => "Dados alterados com sucesso!"));
                exit();
            } else {
                echo json_encode(array('error' => "Não consegui alterar seus dados, tente novamente!"));
                exit();
            }
        }
    } else {
        echo json_encode(array('error' => "Não conseguimos conferir se sua senha está correta!"));
        exit();
    }

    