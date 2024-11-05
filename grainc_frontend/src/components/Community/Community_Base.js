import React from 'react';
import { Link } from 'react-router-dom';
import '../../static/css/Community/Community_Base.css'

// community page
import Community_Main from './Community_Main/Community_Main';
import CategoryNav from '../CategoryNav';
import MembershipAd from '../SellReportsBase/GlobalAd/MembershipAd';

function Community() {
    
    return (
        <>
            <CategoryNav />
            <div className="community_base_main_frame">
                <div className="community_main_content_section">
                    <div className="community_main_response_new_article_frame">
                        <Link to={`/community_article_upload/${'new'}`} className="community_main_response_new_article_button Pre_KR_Medium">
                            글쓰기
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 25 24" fill="none">
                                <mask id="mask0_976_9292" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                                <rect x="0.5" width="24" height="24" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_976_9292)">
                                <path d="M5.09802 20.4619C4.78019 20.5324 4.50652 20.4529 4.27702 20.2234C4.04752 19.9939 3.96802 19.7202 4.03852 19.4024L4.87502 15.3869L9.11352 19.6254L5.09802 20.4619ZM9.11352 19.6254L4.87502 15.3869L16.0943 4.16764C16.4391 3.82281 16.866 3.65039 17.375 3.65039C17.884 3.65039 18.3109 3.82281 18.6558 4.16764L20.3328 5.84464C20.6776 6.18947 20.85 6.61639 20.85 7.12539C20.85 7.63439 20.6776 8.06131 20.3328 8.40614L9.11352 19.6254ZM17.1635 5.22164L6.93852 15.4369L9.06352 17.5619L19.2788 7.33689C19.3364 7.27922 19.3653 7.20714 19.3653 7.12064C19.3653 7.03397 19.3364 6.96181 19.2788 6.90414L17.5963 5.22164C17.5386 5.16397 17.4664 5.13514 17.3798 5.13514C17.2933 5.13514 17.2212 5.16397 17.1635 5.22164Z" fill="white"/>
                                </g>
                            </svg>
                        </Link>
                    </div>
                    <Community_Main />
                </div>
                <div className='community_base_ad_section'>
                    <MembershipAd />
                </div>
            </div>
        </>
    );
};

export default Community;
