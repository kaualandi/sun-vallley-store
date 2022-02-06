<?php
    header('Content-Type: application/json');

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
    $pass = sha1(trim($mybody['password']));

    if(!$email || !$pass) {
        echo json_encode(array('error' => "Preencha todos os campos!"));
        exit();
    }

    $sql = "SELECT id, name, function, status FROM users WHERE email = ? AND pass = ?;";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $pass);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = mysqli_fetch_array($result);
    if($row != 0) {
        if($row['status'] == 0) {
            echo json_encode(array('error' => "Conta banida!"));
            exit();
        } else {
            $_SESSION['user_id'] = $row['id'];
            $user_id = $row['id'];
            echo json_encode(array('success' => 'Logado com sucesso!', "user_id" => $user_id, "user_name" => $row['name'], "user_function" => $row['function']));
        }
    } else {
        echo json_encode(array('error' => "Usuário ou senha inválidos!"));
    }
exit();