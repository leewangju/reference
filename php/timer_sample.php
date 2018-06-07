
<?
$new_date = $this->input->get('date',true)?$this->input->get('date',true):"20170905";
$crr_date = $this->input->get('crr_date',true)?$this->input->get('crr_date',true):date('Ymd');
$start_date = new DateTime(date('Y-m-d'));
$end_date = new DateTime(date("Y-m-d",strtotime("next Monday", time())));

$diff = date_diff($start_date,$end_date)->days;
if($diff==7) $diff = 0;

$banner_floating = $this->m_banner->banner_list(2002,2003); //플로팅 배너
$line_banner = $this->m_banner->banner_list(2002,2005); //띠배너
$sky_banner = $this->m_banner->banner_list(2002,2027); //띠배너
$notice_floating = create_banner2('2002', "floating");

$test_yn = $this->input->get('test_yn',true);
if($test_yn == 'y') $crr_date = '20170905';
?>

html 타이머걸기
<?if($crr_date<$new_date):?>
<?else:?>
<?endif;?>