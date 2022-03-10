<?php 
namespace Matrixhive;
	// Class to hold all settings
	// having singleton pattern so we can use only one instance throug out execution life cycle
	// Never make instance of this class out side
	// Author : Rupesh Patel
	// Date : 27/06/2018

/**
* 
*/
class Session{
	
	static $inst = false;

	public static function init(){
		if (session_status() == PHP_SESSION_NONE) {
    		session_start();
    		$_SESSION['MatrixHive'] = isset($_SESSION['MatrixHive']) ? $_SESSION['MatrixHive'] : [];
		}
	}

	public static function set($key,$value){
		self::init();
		$_SESSION['MatrixHive'][$key] = $value;
	}

	public static function get($key,$default = NULL){
		self::init();
		return  isset($_SESSION['MatrixHive'][$key]) ? $_SESSION['MatrixHive'][$key] : $default;
	}

	public static function unset($key){
		self::init();
		if(isset($_SESSION['MatrixHive'][$key])){
			unset($_SESSION['MatrixHive'][$key]);
		}
	}

    public static function logout(){
        $_SESSION['MatrixHive'] = [];
    }

	public static function generateNewCsrf(){
		self::init();
		$_SESSION['MatrixHive']['csrf_created_at'] = time();
		$_SESSION['MatrixHive']['csrf'] = substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, 50);
	}

	public static function getCsrf(){
		// will always return valid token
		self::init();
		if(isset($_SESSION['MatrixHive']['csrf'])){
			$result = self::validateCsrf($_SESSION['MatrixHive']['csrf'],(3600*0.5));
			// check if it is not expired already and valid till next 5 minutes
			if($result['type'] == 'error'){
				self::generateNewCsrf();
			}
		} else {
			self::generateNewCsrf();
		}
		return $_SESSION['MatrixHive']['csrf'];
	}

	public static function validateCsrf($token,$validSeconds = 0){
		self::init();
		$response = ['type' => 'error', 'message' => 'cms.token_expired_try_refreshing_page'];
		//var_dump($_SESSION['MatrixHive']['csrf'].' = '.$token);
		if(isset($_SESSION['MatrixHive']['csrf']) && $_SESSION['MatrixHive']['csrf'] == $token){
			$response = ['type' => 'success', 'message_key' => 'cms.valid_token'];
			$diff = (time()+$validSeconds) - $_SESSION['MatrixHive']['csrf_created_at'];
			if($diff > (3600*1)){
				$response = ['type' => 'error', 'message' => 'cms.token_expired_try_refreshing_page'];
			}
		}
		return $response;
	}
}