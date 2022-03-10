<?php
namespace MatrixHive;
use \MatrixHive\Api;
class Address{
    static $addressApi = 'https://api.getaddress.io/v2/uk/';
    public static function findAddress(){
   
        header('Content-Type: application/json; charset=utf-8');
        $url = self::$addressApi.rawurlencode($_POST['postcode']);
        $result = Api::get('',['api-key' => get_option('getaddress_io_key')],[],$url);
        //var_dump($result['http_status'] ); 
        if($result['http_status'] == 200){
            
            $res = \json_decode($result['response'],true);
            if($res){
                echo \json_encode([
                    'type' => 'success',
                    'addresses' => $res['Addresses']
                ]);
            } else {
                echo \json_encode(['type' => 'error' , 'message' => 'Bad Response: Not able to find Addresses']);
            }
            
        } else {
            echo \json_encode(['type' => 'error' , 'message' => 'Not able to find Addresses for given post code']);
        }
        exit;
    }
}