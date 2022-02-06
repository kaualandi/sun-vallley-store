<?php
    require_once('conexao.php');
    
    $mybody = json_decode(file_get_contents('php://input'), true);
    if (!$mybody) {
        echo json_encode(array('error' => "Não foi possível obter dados do usuário!"));
        exit();
    }

    $user_id = trim($mybody['user_id']);
    $currentPass = sha1(trim($mybody['currentPass']));
    $newPass = sha1(trim($mybody['newPass']));
    $reNewPass = sha1(trim($mybody['reNewPass']));

    if(!$user_id || !$currentPass || !$newPass || !$reNewPass) {
        echo json_encode(array('error' => "Preencha todos os campos!"));
        exit();
    }

    if($newPass != $reNewPass) {
        echo json_encode(array('error' => "As senhas não coincidem!"));
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
        if($pass != $currentPass) {
            echo json_encode(array('error' => "Senha incorreta!"));
            exit();
        } else {
            $sql = "UPDATE users SET pass = ? WHERE (id = ?);";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $newPass, $user_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $stmt->affected_rows;
            echo var_dump($row);
            if($row != 0) {
                echo json_encode(array('success' => "Senha alterada com sucesso!"));
                exit();
            } else {
                echo json_encode(array('error' => "Não consegui alterar sua senha, tente novamente!"));
                exit();
            }
        }
    } else {
        echo json_encode(array('error' => "Não conseguimos conferir se sua senha está correta!"));
        exit();
    }