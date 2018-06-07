public function toeic() {
        $this->load->library('validate');

        $this->load->model('cont/m_main');

        $data = array();
        $params = array();
        $data['params'] = &$params;

        $params['type'] = $this->validate->string($this->input->get_post('type', true), 'html');

        $head = array(
            'is_top' => TRUE, // 상단 메뉴 여부
            'is_sub_main' => true, //서브 메인 여부
            'gnb_tab_status' => true, //header gnb tab 활성화여부
            'first_banner_open' => 'toeic', //상단 1등 배너 출력 여부

            'css' => array(
                'common/common.css',
                'board/board.css',
                'mydangi/mydangi.css',
                'colorbox/colorbox.css',
            ),
            'js' => array(
                'common/site.js'
            ),
            'title' => '토익',
            'meta-keywords' => '토익, 토익500, 기초독해, RC, 기초토익인강추천, 무료기초영어, 토익모의, 인터넷토익강좌, 토익인강, 텝스, TEPS, 영어단어, LC, 토익접수, 신토익, 토익기출문제, 토익모의고사, 토익만점, 토익700, 영어단어잘외우는법, 영단어, 영어초보, 영어단어빨리외우는법,토익인강추천, 기초영어, 모의토익, 토익독학, 토익600, 토익단어, 토익공부법, 토익시험, TOEIC, TOEIC RC, TOEIC LC, TOEIC독학, 토익기본서, 토익책',
            'meta-description' => '토익, 취업, 자격증 등 20개 프리패스를 단 1개 가격에!, 영단기 프리패스 킹, 2년 무제한 수강!, 목표달성시 전액환급!',
            'body_type' => 'wide',
            'main_active' => '',
            'ti_code'=>'17474',
            'teacher_bttm_banner_id' => '1878',
            'free_lec_banner_id' => '1885',
            'commu_left_banner_id'  => '1913',
            'event_banner_id' => '1892',
            'workbook_banner_id' => '1899',
            'top_main_banner_id' => '1906'
        );
        $tail = array(
            'is_left' => TRUE, // 레프트 메뉴 여부
            'is_footer' => TRUE, //footer 내용 표시 여부
            'js' => array(
            ),
            //tgnb
            'my_class' => FALSE,
            'tgnb_open_tab_call' => '0',
            'tgnb_tab_open' => 'toeic',
            'tgnb_focus_name' => 'lan',
            //tgnb
            'heatmap_yn' => 'on',
            'ti_code' => '17474'
        );
        $data['head'] = $this->commondata->setHeaderData($head);
        $data['tail'] = $this->commondata->setFooterData($tail);

        $tmp = $this->m_main->toeic_dataset_201705();
        $data = array_merge($data, $tmp);

        shuffle ($data['banners']['719']);
        shuffle ($data['head']['banners']['1885']);
        shuffle ($data['head']['banners']['1899']);
        shuffle ($data['head']['banners']['1913']);
        shuffle ($data['head']['banners']['1892']);

        $data['dt_now'] = new Datetime();
        $data['today'] = $data['dt_now']->format("Y-m-d");


        if ($params['type']=='json'){
            $this->output->set_content_type("application/json")->set_output(json_encode($data));return;
        } else {

            $this->load->view('common/header', $data['head']);
            $this->load->view('toeic/main/main', $data);
            $this->load->view('common/footer', $data['tail']);
        }
    }