<?php
class Main extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->library('validate');
        $this->load->library('vd');
        $this->load->library('/sapi/my_conects/feed/ST_sapi_feed', array('encode'=>'UTF-8') );

        define("USER_ID", $this->session->userdata('ss_mb_id'));

        $this->dataset = array();
        $this->dataset['head'] = array(
            'is_top' => true, // 상단 메뉴 여부
            'css' => array(
                '/css/price/price.css'
            ),
            'js' => array(
            ),
            'title' => '',
            'body_type' => 'wide',
            'common_css_use' => true
        );
        $this->dataset['tail'] = array(
            'is_left' => TRUE, // 레프트 메뉴 여부
            'is_footer' => true, //footer 내용 표시 여부
            'js' => array(
                'colorbox/min/jquery.colorbox-min.js',
                'common/blocksit.js',
                'extra/min/jquery-ui.min.js',
            ),
        );
    }
    public function index()
    {
        $date = ""; //날짜 구분 없이 전체 데이터
        $head = $this->commondata->setHeaderData($this->dataset['head']);
        $tail = $this->commondata->setFooterData($this->dataset['tail']);
        $data = array(
            'date' => $date,
        );
    	$this->load->view('common/header', $head);
        $this->load->view('/price/main', $data);
        $this->load->view('common/footer', $tail);
    }

     public function get_price_data()
     {
        $code = $this -> input -> get('code',true);
        $this->load->view('/pub/price/'.$code, $data );
     }
}