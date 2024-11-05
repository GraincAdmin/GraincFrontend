import '../static/css/Footer.css'; // Adjust the path based on the directory structure
import { Link } from 'react-router-dom';

import { ReactComponent as CompanyLogo } from '../static/assets/CompanyLogo/NavLogoLight.svg'


function Footer({marginOption}) {
    return (
        <footer className={`sellreports_footer_main_frame ${marginOption ? 'marginOption' : null}`}>
            <div className="sellreports_footer_frame">
                <div className="sellreports_footer_logo_navigation_link_frame">
                    <CompanyLogo style={{height: '25px', width: 'auto'}}/>
                    <div className="sellreports_footer_navigation_link_frame">
                        <Link className="sellreports_footer_navigation_link Pre_KR_Normal" to={'/announcement/main'}>공지사항</Link>
                        <Link className="sellreports_footer_navigation_link Pre_KR_Normal" style={{ width: "55px" }} to={'/inquiry'}>1:1 문의</Link>
                        <Link className="sellreports_footer_navigation_link Pre_KR_Normal" to={'/company_policy'}>이용약관</Link>
                        <Link className="sellreports_footer_navigation_link Pre_KR_Normal" to={'/privacy_policy'} >개인정보 처리방침</Link>
                    </div>
                </div>
                <div className="sellreports_footer_company_information">
                    <div className="sellreports_footer_company_basic_info_frame">
                        <span className="sellreports_footer_company_information_text Pre_KR_Normal">
                            (주)그레인크
                        </span>
                        <span className="sellreports_footer_company_information_text Pre_KR_Normal">
                            |
                        </span>
                        <span className="sellreports_footer_company_information_text Pre_KR_Normal">
                            sellreports@sellreports.com
                        </span>
                    </div>
                    <div className="sellreports_footer_company_additional_info_frame">
                        <span className="sellreports_footer_company_information_text Pre_KR_Normal">
                            인천광역시 연수구 인천타워대로 323, 에이동 20층 2001호
                        </span>
                        <span className="sellreports_footer_company_information_text footer_information_divider Pre_KR_Normal">
                            |
                        </span>
                        <span className="sellreports_footer_company_information_text Pre_KR_Normal">
                            사업자 등록번호: 330-86-03504
                        </span>
                    </div>
                </div>
                <span className="sellreports_footer_company_information_text Pre_KR_Normal" style={{marginTop:'16px'}}>
                    셀리포트은 통신판매중개자이며, 통신판매의 당사자가 아니며, 판매자가 등록한 상품정보 및 거래에 셀리포트는 책임을 지지 않습니다.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
