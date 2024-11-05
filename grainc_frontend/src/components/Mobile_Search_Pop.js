import React, { useEffect, useState } from "react";
import '../static/css/Mobile_Search_Pop.css'
import { Link, useNavigate } from 'react-router-dom';

function MobileSearchPop({ styleToggle, handelStyleToggle, searchHistory, deleteHistory, deleteAllHistory}) {

    // style change
    const [handelMobileSearchPop, setHandelMobileSearchPop] = useState(styleToggle);

    useEffect(() => {
        setHandelMobileSearchPop(styleToggle);
    }, [styleToggle])

    useEffect(() => {
        if (styleToggle) {
            document.body.classList.add('overflow_block_768');
        } else {
            document.body.classList.remove('overflow_block_768');
        }
    }, [styleToggle]);

    // search feature
    const navigate = useNavigate();

    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        const searchKw = event.target.elements.kw.value; // Get the search term from the input field
        handelStyleToggle();
        navigate(`/search?kw=${encodeURIComponent(searchKw)}`); // Programmatically navigate to the /search route with the query parameter
    };


    
    return (
        <div className={`search_pop_frame ${handelMobileSearchPop ? 'open' : ''}`}>
            <form className="search_pop_search_frame" method="get"  onSubmit={handleSearchSubmit}>
                <input 
                    className="search_pop_input Pre_KR_Normal" 
                    name="kw" 
                    placeholder="검색" >
                </input>
                <div className="search_pop_close_button Pre_KR_Medium" onClick={handelStyleToggle}>취소</div>
            </form>
            {/* {searchHistoryStyle ? ( */}
                <div className="search_pop_search_history_main_frame">
                    <div className="search_pop_search_title Pre_KR_Medium">
                        <span>검색기록</span>
                        <div style={{color:'#bbbbbbb', fontSize:'14px', cursor:'pointer'}} onClick={() => deleteAllHistory()}>비우기</div>
                    </div>
                    {searchHistory.length !== 0 ? (
                        searchHistory.map((history, index) => (
                            <div key={index} className="search_pop_search_history_frame">
                                <Link className="search_pop_navigator" to={`/search?kw=${history}`} onClick={handelStyleToggle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <mask id="mask0_1456_249" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                        <rect width="24" height="24" fill="#D9D9D9"/>
                                        </mask>
                                        <g mask="url(#mask0_1456_249)">
                                        <path d="M15.473 16.527L16.527 15.473L12.75 11.696V7H11.25V12.3038L15.473 16.527ZM12.0017 21.5C10.6877 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5ZM12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 9.78333 19.2208 7.89583 17.6625 6.3375C16.1042 4.77917 14.2167 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20Z" fill="#1A1A1B"/>
                                        </g>
                                    </svg>
                                    <span className="search_history_text Pre_KR_Normal">{ history }</span>
                                </Link>
                                <div className="search_history_delete_button" onClick={() => deleteHistory(history)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <mask id="mask0_1456_253" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                        <rect width="24" height="24" fill="#D9D9D9"/>
                                        </mask>
                                        <g mask="url(#mask0_1456_253)">
                                        <path d="M6.40141 18.6532L5.34766 17.5995L10.9477 11.9995L5.34766 6.39945L6.40141 5.3457L12.0014 10.9457L17.6014 5.3457L18.6552 6.39945L13.0552 11.9995L18.6552 17.5995L17.6014 18.6532L12.0014 13.0532L6.40141 18.6532Z" fill="#616161"/>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="search_history_none_mobile">검색기록이 없습니다</div>
                    )}
                </div>
            {/* ) : (
                <div className="search_pop_recommendation_section">
                    <div className="search_pop_recommendation_frame">
                        <span className="search_pop_recommendation_title Pre_KR_Normal">커뮤니티</span>
                        {% for articles in search_pop_community %}
                            <div className="search_pop_community_frame">
                                <div className="search_pop_community_image">
                                    {% for community_preview_images in articles.main_content.html|extract_img_urls %}
                                        <img src="{{ community_preview_images }}" alt="Preview Image">
                                    {% endfor %}
                                </div>
                                <div className="search_pop_community_information_frame">
                                    <div className="search_pop_title Pre_KR_Normal">{{ articles.subject }}</div>
                                    <div className="search_pop_community_additional_information_frame">
                                        <div className="search_pop_community_category_indicator Pre_KR_Medium">
                                            {{ articles.category }}
                                        </div>
                                        <span className="search_pop_community_date_price_text Pre_KR_Normal">{{ articles.create_date|date:"Y-m-d" }}</span>
                                    </div>
                                </div>
                            </div>
                        {% endfor %} 
                        <a className="search_pop_recommendation_seemore_text Pre_KR_Medium" href="{% url 'community:community' %}">모두 보기</a>
                    </div>
                    <div className="search_pop_recommendation_frame">
                        <span className="search_pop_recommendation_title Pre_KR_Normal" style={{marginBottom:'8px'}}>리포트</span>
                        {% for reports in search_pop_reports %}
                            <div className="search_pop_report_frame">
                                <span className="search_pop_title Pre_KR_Medium">{{ reports.subject }}</span>
                                <div className="search_pop_report_additional_information_frame">
                                    <div className="search_pop_community_category_indicator Pre_KR_Medium">
                                        {{ reports.report_category }}
                                    </div>
                                    <span className="search_pop_community_date_price_text Pre_KR_Normal">{{ reports.create_date|date:"Y-m-d" }}</span>
                                    <span className="search_pop_community_date_price_text Pre_KR_Normal">|</span>
                                    <span className="search_pop_community_date_price_text Pre_KR_Normal">{{ reports.price | intcomma }}원</span>
                                </div>
                            </div>
                        {% endfor %}
                        <a className="search_pop_recommendation_seemore_text Pre_KR_Medium" href="{% url 'ReportMarket:report_market_home' %}">모두 보기</a>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default MobileSearchPop