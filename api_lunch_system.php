<?php
require_once './api/connection.php';
require_once './api/functions.php';

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
mysqli_set_charset($link, "utf8");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $post = json_decode(file_get_contents("php://input"));
    $mode = $_REQUEST['mode'];

    if ($mode == 'login') {
        $catalog = fn_get_catalog($link);
        //echo(json_encode($catalog));
        print_r($catalog);
    } 
//здесь проверка авторизационного токена


    if ($mode == 'get_catalog') { 
        $catalog = fn_get_catalog($link);
        print_r(json_encode($catalog));
    } elseif ($mode == 'update_order') {

    } elseif ($mode == 'search_order') { 

    } elseif ($mode == 'create_user') { 

    } elseif ($mode == 'update_user') { 

    } elseif ($mode == 'search_user') { 

    }
}
mysqli_close($link);