<?php
namespace MatrixHive;
use \MatrixHive\Api;
use \MatrixHive\Session;
class Quotation{
    public static function getQuotation(){
        global $wp_session;
        $response = ['type' => 'error' , 'message' => 'Invalid Credentials'];
        $params = ['page'=>$_GET['page']];
        
        $result = Api::get('api/list_quotations',$params);
        // //var_dump(json_decode($result['response'],true));exit;
        $result = json_decode($result['response'],true);
        if(!empty($result['success']) && $result['success']){
            $response = ['type' => 'success'];
        }
        $response['result'] = $result;              
        
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($response);        
        exit;
    }
    
}