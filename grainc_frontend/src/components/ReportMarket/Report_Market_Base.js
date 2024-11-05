import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../static/css/ReportMarket/Report_Market_Base.css'

//report market

function ReportMarketBase({ handelCategory }) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const reportMarketCategory = queryParams.get('category');
    const [currentCategory, setCurrentCategory] = useState('')

    useEffect(() => {
        setCurrentCategory(reportMarketCategory)
        handelCategory(reportMarketCategory)
    }, [reportMarketCategory]);

    return (
        <div className="report_market_nav_bar">
            <div className="report_market_nav_button_frame">
                {/* <!--unlock when project is successful | hope I can bring positive influence to SouthKorean investors mind on investments--> */}
                {/* <Link className="report_market_nav_button Pre_KR_Medium"  >
                    HOME
                </Link> */}
                <Link className={`report_market_nav_button Pre_KR_Normal ${!currentCategory ? 'selected' : null}`} to={'/report_market?category='}>
                    전체
                </Link>
                <Link className={`report_market_nav_button Pre_KR_Normal ${currentCategory === '국내기업' ? 'selected' : null}`} to={'/report_market?category=국내기업'}>
                    국내기업
                </Link>
                <Link className={`report_market_nav_button Pre_KR_Normal ${currentCategory === '해외기업' ? 'selected' : null}`} to={'/report_market?category=해외기업'}>
                    해외기업
                </Link>
                <Link className={`report_market_nav_button Pre_KR_Normal ${currentCategory === '부동산' ? 'selected' : null}`} to={'/report_market?category=부동산'}>
                    부동산
                </Link>
                <Link className={`report_market_nav_button Pre_KR_Normal ${currentCategory === '암호화폐' ? 'selected' : null}`} to={'/report_market?category=암호화폐'}>
                    암호화폐
                </Link>
                <Link className={`report_market_nav_button Pre_KR_Normal ${currentCategory === '투자전략' ? 'selected' : null}`} to={'/report_market?category=투자전략'}>
                    투자전략
                </Link>
                <Link className={`report_market_nav_button Pre_KR_Normal ${currentCategory === '시장' ? 'selected' : null}`} to={'/report_market?category=시장'}>
                    시장
                </Link>
                <Link className={`report_market_nav_button Pre_KR_Normal ${currentCategory === '산업' ? 'selected' : null}`} to={'/report_market?category=산업'}>
                    산업
                </Link>
                <Link className={`report_market_nav_button Pre_KR_Normal ${currentCategory === '경제' ? 'selected' : null}`} to={'/report_market?category=경제'}>
                    경제
                </Link>
                <Link className={`report_market_nav_button Pre_KR_Normal ${currentCategory === '채권' ? 'selected' : null}`} to={'/report_market?category=채권'}>
                    채권
                </Link>
                <Link className={`report_market_nav_button Pre_KR_Normal ${currentCategory === '파생' ? 'selected' : null}`} to={'/report_market?category=파생'}>
                    파생
                </Link>
            </div>
        </div>
    );
};


export default ReportMarketBase