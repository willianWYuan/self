<?php
    $arr = [
        [
            'type' => 'fruit',
            'has' => [
                'apple',
                'pear',
                'banana'
            ]
        ],
        [
            'type' => 'phone',
            'has' => [
                'iphone',
                'suming',
                'mi',
                'oppo',
                'vivo'
            ]
        ],
        [
            'type' => 't',
            'has' => [
                'bcd'
            ]
        ]
    ];





    if (isset($_SERVER["QUERY_STRING"]['len'])){
        $para = $_SERVER["QUERY_STRING"]['len'];
    } else{
        $para = 3;
    }
    

    foreach($arr as $x=>$val){
        if (strlen($val['type']) > $para) {
            $newArr[$x] = $val;
        }
    };

    // var_dump($newArr)
    echo json_encode($newArr);
?>