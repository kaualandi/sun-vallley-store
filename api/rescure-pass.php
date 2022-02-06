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
    $email = trim($mybody['email']);
    $phone = trim($mybody['phone']);
    $pass = sha1(trim($mybody['password']));
    $phone = preg_replace('/[^0-9]+/', '', $phone);

    if(!$email || !$phone || !$pass) {
        echo json_encode(array('error' => "Preencha todos os campos!"));
        exit();
    }

    $sql = "SELECT id FROM users WHERE email = ? and phone = ?;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $phone);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = mysqli_fetch_array($result);
    if ($row != 0) {
        $sql = "UPDATE users SET pass = ? WHERE (email = ? and phone = ?);";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $pass, $email, $phone);
        $stmt->execute();
        $user_id = $stmt->insert_id;
        if ($user_id != 0) {
            echo json_encode(array('error' => "Desculpe, não foi possível alterar a senha!"));
            exit();
        } else {
            echo json_encode(array('success' => 'Senha alterada com sucesso!'));
            exit();
        }
    } else {
        echo json_encode(array('error' => "Esses dados não pertencem a ninguém ou a mais de uma pessoa!"));
        exit();
    }