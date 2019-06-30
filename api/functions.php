<?php

function fn_login($link)
{
    $token['id'] = 'dewd23e2d2d23d'; //token for frontend and api
    $token['type'] = 'admin34'; //admin or user
    var_dump($token);
    $query ="SELECT * FROM users";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
    if($result) {
        echo "Выполнение запроса прошло успешно";
    }    
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
