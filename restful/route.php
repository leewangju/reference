<?
$route['default_controller'] = 'main/renew/main/main';
$route['teaser'] = "landing/teaser/main_teaser";
//$route['nis'] = "landing/nis_teaser";
$route['nis'] = "landing/nis_synthesize";
$route['404_override'] = '';
$route['pub/(:any)'] = "/pub/index/index";

/* 윈도우팝업 전용 */
$route['pop/(:any)'] = "pop/index/$1";
/* */
?>