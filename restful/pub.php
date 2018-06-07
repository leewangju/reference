<?php if ( ! defined('BASEPATH')) exit ('No direct script access allowed');
/**
 * pub Main Class
 *
 * @author   : jings
 * @date     : 2016. 12. 6.
 * @desc     :
 * @link     : http://dev-eng.dangi.co.kr/pub
 */
class Main extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->head = array(
        	'is_left' => TRUE, // 레프트 메뉴 여부
        	'is_top' => TRUE, // 상단 메뉴 여부
        	'css' => array(
        		'common/common.css',
        	),
        	'mb_name' => $mb_name,
        	'js' => array(
        		'common/site.js',
        		'lecture/lecture.js'
        	),
        	'title' => '',
        	'meta-keywords' => '',
        	'meta-description' => '',
        	'body_type' => 'wide',
        );

        $this->tail = array(
        	'is_footer' => TRUE, //footer 내용 표시 여부
        	'js' => array(

        	),
        	//tgnb
        	'my_class' => FALSE,
        	'tgnb_open_tab_call' => '1',
        	'tgnb_tab_open' => 'eng',
        	'tgnb_focus_name' => 'lan'
        );
    }

    public function index()
    {
    	$exception = $this->input->get('exception', true);
    	$path = (uri_string() === 'pub' OR uri_string() === 'pub/m')?'pub/tutorial':uri_string();
        $searchName = 'automation/';
    	if (( ! empty($exception) && ($exception === 'head' OR $exception === 'all')) OR $path === 'pub/tutorial' )
    	{
    		// do not include the header file.
    	}
        else if (  strpos($path,$searchName) !== false)
        {
             // do not include the header file.
        }
    	else
    	{
	    	$head = $this->commondata->setHeaderData($this->head);
	    	$this->load->view('common/header', $head);
    	}

    	if ($path){$this->load->view($path);}

    	if (( ! empty($exception) && ($exception === 'foot' OR $exception === 'all')) OR $path === 'pub/tutorial' OR strpos($path,'pub/automation/') == true )
    	{
    		// do not include the footer file.
    	}
         else if (  strpos($path,$searchName) !== false)
        {
             // do not include the header file.
        }
    	else
    	{
	    	$tail = $this->commondata->setFooterData($this->tail);
	    	$this->load->view('common/footer', $tail);
    	}
    }

    public function m()
    {
    	$exception = $this->input->get('exception', true);
//     	$path = (uri_string() === 'pub/m')?'pub/tutorial':uri_string(); // routing에 의해 index에 걸리기때문에 의미없음
    	$path = uri_string();
    	if (( ! empty($exception) && ($exception === 'head' OR $exception === 'all')) OR $path === 'pub/tutorial'  )
    	{
    		// do not include the header file.
    	}
    	else
    	{
	    	widget::run('m/head_v2', $head);
    	}

    	if ($path){$this->load->view($path);}

    	if (( ! empty($exception) && ($exception === 'foot' OR $exception === 'all')) OR $path === 'pub/tutorial' )
    	{
    		// do not include the footer file.
    	}
    	else
    	{
	    	widget::run('m/tail_v2', $tail);
    	}
    }
}