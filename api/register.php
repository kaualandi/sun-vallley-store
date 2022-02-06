<?php

    require_once("conexao.php");


    $mybody = json_decode(file_get_contents('php://input'), true);
    if(isset($_SESSION['user_id'])) {
        echo json_encode(array('error' => "Usuário já logado"));
        exit();
    }
    if (!$mybody) {
        echo json_encode(array('error' => "Não foi possível obter dados do usuário!"));
        exit();
    }
    $name = trim($mybody['name']);
    $phone = trim($mybody['phone']);
    $email = trim($mybody['email']);
    $pass = sha1(trim($mybody['password']));
    $phone = preg_replace('/[^0-9]+/', '', $phone);

    if(!$name || !$phone || !$email || !$pass) {
        echo json_encode(array('error' => "Preencha todos os campos!"));
        exit();
    }

    $sql = "SELECT id FROM users WHERE email = ?;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = mysqli_fetch_array($result);
    if($row != 0) {
        echo json_encode(array('error' => "O email já pertence a usuário!"));
        exit();
    } else {
        $sql = "SELECT id FROM users WHERE phone = ?;";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $phone);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = mysqli_fetch_array($result);
        if($row != 0) {
            echo json_encode(array('error' => "O número de telefone já pertence a usuário!"));
            exit();
        } else {
            $sql = "INSERT INTO users (name, phone, email, pass) VALUES (?, ?, ?, ?);";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssss", $name, $phone, $email, $pass);
            $stmt->execute();
            $user_id = $stmt->insert_id;
            if($user_id != 0) {
                echo json_encode(array('success' => 'Cadastrado com sucesso!'));
            } else {
                echo json_encode(array('error' => "Não foi possível cadastrar!"));
            }
        }
    }
exit();