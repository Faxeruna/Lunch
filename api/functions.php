<?php

function fn_login($link, $email, $password)
{
    $result = 'bad';
    $query ="SELECT * FROM users WHERE login = '$email' AND password = '$password'";
    $_result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
    while ($row_catalog = mysqli_fetch_array($_result, MYSQLI_ASSOC)) {
        $result = $row_catalog;
    }
    if ($result !== 'bad') {
        $result['password'] = '*';
        $result['token'] = fn_start_session($link, $result['id']);
    }   
    return $result;
}

function fn_get_catalog($link)
{
    $result = false;
    $query_catalog ="SELECT id_category as id_category, name as name FROM categories";
    $_catalog = mysqli_query($link, $query_catalog) or die("Ошибка " . mysqli_error($link));
    while ($row_catalog = mysqli_fetch_array($_catalog, MYSQLI_ASSOC)) {
        $catalogs[] = $row_catalog;
    }

    foreach ($catalogs as &$catalog) {
        $product = array();
        $id_category = $catalog['id_category'];
        $query_product ="SELECT * FROM products WHERE id_category = '$id_category'";
        $_product = mysqli_query($link, $query_product) or die("Ошибка " . mysqli_error($link));
        while ($row_product = mysqli_fetch_array($_product, MYSQLI_ASSOC)) {
            $product[] = $row_product;
        }
        if ($product) {
            $catalog['products'] = $product;
            $finaly_catalog[] = $catalog;          
        }
    }

    return $finaly_catalog;    
}

function fn_create_order($link, $order_data, $user_data, $date)
{
    $result = false;

    if (!$order_data) {
        return $result;
    };

    $query_create_order = "INSERT INTO orders (date, id_user, id_location) values('$date', '$user_data->id_user', '$user_data->id_location')";
    $_order = mysqli_query($link, $query_create_order) or die("Ошибка " . mysqli_error($link));
    if ($_order) {
        $result = true;
        $id_order = mysqli_insert_id($link);
        foreach ($order_data as $key => $item) {
            if ($item) {
                $query_create_detail = "INSERT INTO order_details (id_order, id_product, count) values('$id_order', '$key', '$item->count')";
                $detail = mysqli_query($link, $query_create_detail) or die("Ошибка " . mysqli_error($link));
            }
        }
    };

    return $result;    
}

function fn_get_user_data_by_token($link, $token)
{
    $result = false;

    $query = "SELECT * FROM sessions WHERE token = '$token'";
    $_user_data = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    while ($row_catalog = mysqli_fetch_array($_user_data, MYSQLI_ASSOC)) {
        $user_data = $row_catalog;
        return $user_data;
    }

    return $result;    
}

function fn_get_user_location($link, $user_data)
{
    $result = false;
    $user_id = $user_data['user_id'];
    $query = "SELECT id_location FROM users WHERE id = '$user_id'";
    $_user_location = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    while ($row_catalog = mysqli_fetch_array($_user_location, MYSQLI_ASSOC)) {
        $user_location = $row_catalog;
        return $user_location;
    }

    return $result;    
}

function fn_get_order_list($link, $user_data, $user_location)
{
    $result = false;
    $id_location = $user_location['id_location'];
    $location_data = fn_get_location_by_id($link, $id_location);
    $query_order = "SELECT * FROM orders WHERE id_location = '$id_location'";
    $_list_orders = mysqli_query($link, $query_order) or die("Ошибка " . mysqli_error($link));
    while ($row_catalog = mysqli_fetch_array($_list_orders, MYSQLI_ASSOC)) {
        $_row_catalog = $row_catalog;
        $_row_catalog['city'] = $location_data['city'];
        $_row_catalog['number'] = $location_data['location_name'];
        $order_detail = fn_get_order_detail($link, $_row_catalog['id_order']);
        $_row_catalog['ordercontent'] = $order_detail;        
        $list_orders[] = $_row_catalog;
    }
    return $list_orders;
    return $result;    
}

function fn_get_location_by_id($link, $id_location)
{
    $result = false;
    $query = "SELECT * FROM locations WHERE id_location = '$id_location'";
    $_location = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    while ($row_catalog = mysqli_fetch_array($_location, MYSQLI_ASSOC)) {
        $location = $row_catalog;
    }

    $id_city = $location['id_city'];
    $query_city = "SELECT * FROM city WHERE id_city = '$id_city'";
    $_city = mysqli_query($link, $query_city) or die("Ошибка " . mysqli_error($link));
    while ($row_catalog = mysqli_fetch_array($_city, MYSQLI_ASSOC)) {
        $city = $row_catalog;
        $location['city'] = $city['city'];
        return $location;
    }

    return $result;    
}

function fn_get_order_detail($link, $id_order)
{
    $result = false;
    $query = "SELECT * FROM order_details WHERE id_order = '$id_order'";
    $_order_detail = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    while ($row_catalog = mysqli_fetch_array($_order_detail, MYSQLI_ASSOC)) {
        $_row_catalog = $row_catalog;
        $product_name = fn_get_product_name($link, $_row_catalog['id_product']);
        $_row_catalog['name'] = $product_name;
        $order_detail[] = $_row_catalog;
    }
    if ($order_detail) {
        return $order_detail;
    };
    return $result;    
}

function fn_get_product_name($link, $id_product)
{
    $result = false;
    $query = "SELECT product FROM products WHERE id_product = '$id_product'";
    $_product_name = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    while ($row_catalog = mysqli_fetch_array($_product_name, MYSQLI_ASSOC)) {
        $product_name = $row_catalog;
        return $product_name['product'];
    }
    return $result;    
}

function fn_start_session($link, $user_id)
{
    $result = false;

    if (!$user_id) {
        return $result;
    };
    $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    $token =  substr(str_shuffle($permitted_chars), 0, 16);
    $date  = (new DateTime('+1 day'))->format('Y-m-d');
    $query_create_session = "REPLACE INTO sessions (token, expire, user_id) values('$token', '$date', '$user_id')";
    $_order = mysqli_query($link, $query_create_session) or die("Ошибка " . mysqli_error($link));
    if ($_order) {
        $result = $token;
    };

    return $result;    
}

function fn_check_session($link, $token)
{
    $result = false;
    $query = "SELECT user_id FROM sessions WHERE token = '$token'";
    $_user_id = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    while ($row_catalog = mysqli_fetch_array($_user_id, MYSQLI_ASSOC)) {
        $result = true;
    }
    return $result;    
}
