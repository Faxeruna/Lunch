<?php
require_once './connection.php';

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    };
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    };
}

$link = mysqli_connect($host, $user, $password, $database) 
    or die("Ошибка " . mysqli_error($link));

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $post = json_decode(file_get_contents("php://input"));
    $mode = $_REQUEST['mode'];

    if ($mode == 'login') {
        $token['id'] = 'dewd23e2d2d23d'; //token for frontend and api
        $token['type'] = 'admin'; //admin or user
        var_dump($token);
        $query ="SELECT * FROM users";
        $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
        if($result) {
            echo "Выполнение запроса прошло успешно";
        }
        //echo(json_encode($token));
    } elseif ($mode == 'create_order') { //добавить проверку токена

    } elseif ($mode == 'update_order') { //добавить проверку токена

    } elseif ($mode == 'search_order') { //добавить проверку токена

    } elseif ($mode == 'create_user') { //добавить проверку токена

    } elseif ($mode == 'update_user') { //добавить проверку токена

    } elseif ($mode == 'search_user') { //добавить проверку токена

    }
}
mysqli_close($link);