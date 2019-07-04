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
        if (!empty($post->email) && !empty($post->password)) {
            print_r(fn_login($link, $post->email, $post->password));
            mysqli_close($link);
            exit;
        } else {
            print_r('empty');
            mysqli_close($link);
            exit;
        }
    } elseif ($mode == 'registration') {

    } elseif ($mode == 'logout') {

    }

//начало проверки токена
    // if (!empty($post->session_token)) {
    //     $result_check = fn_check_session($link, $post->session_token);
    //     if (!$result_check) {
    //         print_r('denied');
    //         return;
    //     }
    // } else {
    //     print_r('denied');
    //     return;
    // }
//конец

    if ($mode == 'get_catalog') {
        $token = $post->session_token;
        $user_data = fn_get_user_data_by_token($link, $token);
        $user_location = fn_get_user_location($link, $user_data);
        $catalog = fn_get_catalog($link, $user_location);
        print_r(json_encode($catalog));
    } elseif ($mode == 'create_order') {
        $order_data = $post->order_data;
        $user_data = $post->user_data;
        $date = $post->date;
        $status_order = fn_create_order($link, $order_data, $user_data, $date);
        print_r($status_order);
    } elseif ($mode == 'get_orders') {
        $token = $post->session_token;
        $user_data = fn_get_user_data_by_token($link, $token);
        $user_location = fn_get_user_location($link, $user_data);
        $order_list = fn_get_order_list($link, $user_data, $user_location);
        print_r(json_encode($order_list));
    } elseif ($mode == 'update_user') {

    } elseif ($mode == 'search_user') {

    }
}
mysqli_close($link);
