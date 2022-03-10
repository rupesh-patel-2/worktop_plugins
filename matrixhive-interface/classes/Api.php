<?php
namespace MatrixHive;
class Api{

    static $inst = null;

	public function __construct(){
		$this->baseUrl = get_option('estimate_admin_url');
	}
    public static function inst(){
		if(self::$inst == false){
			self::$inst = new self();
		}
		return self::$inst;
	}

	public function getBaseApiUrl(){
		return $this->baseUrl;
	}

    public static function get($endpoint, $params=[],array $headers = [] , $baseUrl = false){
		$result = [];
		$paramsStr = http_build_query($params);
		$baseUrl =  $baseUrl === false ? self::inst()->getBaseApiUrl() : $baseUrl;
		$url = $baseUrl.'/'.$endpoint;
		if(!empty($params)){
			$url = $baseUrl.'/'.$endpoint.'?'.$paramsStr;
		}
		
		$headersArray = array(
			'Content-Type:application/json',
		);
        $headers = array_merge($headersArray,$headers);
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_URL, $url);
        $result['response'] = curl_exec($ch);
		$result['http_status'] = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		$result['curl_errno']= curl_errno($ch);
		
		return $result;
	}
	
	public static function post($endpoint,$params = [],array $headers = []){
		$result = [];
		$paramsStr = http_build_query($params);
		$baseUrl = self::inst()->getBaseApiUrl();
		$url = $baseUrl.'/'.$endpoint;
		//var_dump($url);exit;
		$headersArray = array(
			'Content-Type:application/json',
		);
        $headers = array_merge($headersArray,$headers);
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($params));
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $result['response'] = curl_exec($ch);
		$result['http_status'] = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		$result['curl_errno']= curl_errno($ch);
		
		return $result;
	}
	
	public static function put($endpoint,$params = [],array $headers = []){
		$result = [];
		$paramsStr = http_build_query($params);
		$baseUrl = self::inst()->getBaseApiUrl();
		$url = $baseUrl.'/'.$endpoint;
		if(!empty($params)){
			$url = $baseUrl.'/'.$endpoint.'?'.$paramsStr;
		}
		
		$headersArray = array(
			'Content-Type:application/json',
		);
        $headers = array_merge($headersArray,$headers);
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($params));
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $result['response'] = curl_exec($ch);
		$result['http_status'] = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		$result['curl_errno']= curl_errno($ch);
		
		return $result;
	}
}