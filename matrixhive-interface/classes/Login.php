<?php
namespace MatrixHive;
use \MatrixHive\Api;
use \MatrixHive\Session;
class Login{
    public static function login(){
        global $wp_session;
        $response = ['type' => 'error' , 'message' => 'Invalid Credentials'];
        if(isset($_POST['username']) && isset($_POST['password'])){
            $params = [
                'email' => $_POST['username'],
                'password' => $_POST['password']
            ];
            $result = Api::post('api/login',$params);
            //var_dump(json_decode($result['response'],true));exit;
            $result = json_decode($result['response'],true);
            
            if(!empty($result['success']) && $result['success'] && !empty($result['token'])){
                $wp_session['estimate_token'] = $result['token'];
                Session::set('token',$result['token']);
                $response = ['type' => 'success' , 'message' => 'Login successful'];
            }
            $response['result'] = $result;
        }
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($response);
        exit;
    }

    public static function isLoggedIn(){
        return  Session::get('token',false) ? true : false;
    }
}