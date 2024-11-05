import React, { useEffect, useState, useContext, useRef } from "react";
import '../../../static/css/ReportMarket/Report_Detail/Report_Detail.css'
import ReportMarketBase from "../Report_Market_Base";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAxios from "../../../axiosAPIClient";
import AuthContext from "../../../context/AuthContext";

// Icon
import { ReactComponent as BookmarkIcon } from '../../../static/assets/GlobalIcon/Bookmark.svg'
import { ReactComponent as PlusWhiteIcon } from '../../../static/assets/GlobalIcon/Add_Plus.svg'
import { ReactComponent as CheckWhiteIcon } from '../../../static/assets/GlobalIcon/Check_White.svg'
import { ReactComponent as RatingBlueIcon } from '../../../static//assets/ReportMarket/Global/Star.svg'
import { ReactComponent as RatingGreyIcon } from '../../../static//assets/ReportMarket/Global/StarGrey.svg'
import { ReactComponent as PolicyDownIcon } from '../../../static/assets/GlobalIcon/Chevron_Right_LG.svg'

// preview component
import ReportPreview from "./Report_Preview";

//review component
import ReportReview from "./Report_Review";

//report component
import ReportProduct from "../Global/ReportProduct";

// report purchase section
import ReportPurchasePage from "./Report_Purchase";

function ReportDetail() {
    const apiClient = useAxios();
    const { user } = useContext(AuthContext);
    const authenticatedUser = user ? user : "unAuthenticated";
    const navigate = useNavigate();


    // for report market nav
    const [category, setCategory] = useState(null)
    const handleReportMarketCategory = (category) => {
        setCategory(category)
    }

    //report detail states
    const [reportDetail, setReportDetail] = useState('');

    // get report id
    const { report_id } = useParams();

    
    
    // get report detail data

    const fetchReportDetail = async () => {
        try {
            const response = await apiClient.get(`/report_detail/${report_id}/`)
            const report_data = response.data
            setReportDetail(report_data)
        } catch(error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchReportDetail()
    }, [report_id]);


    // detail viewer subscription check
    const [userSubscribeStatus, setUserSubscribeStatus] = useState(false)
    const fetchSellerSubscriptionCheck = async () => {
        try {
            const response = await apiClient.get(`/subscribe_status_report_market/${report_id}/${authenticatedUser.user_id}`)
            const data = response.data.subscribe_status
            setUserSubscribeStatus(data)
        } catch (error) {
            console.log(error)
        }
    };

    function checkUserSubscribers() {
        if (authenticatedUser !== 'unAuthenticated' && reportDetail !== '') {
            if (authenticatedUser.user_id !== reportDetail.author_id) {
                fetchSellerSubscriptionCheck();
            } 
        }
    }
    useEffect(() => {
        checkUserSubscribers();
    }, [report_id, authenticatedUser, reportDetail]);


    const handelSubscribe = async () => {
        if (authenticatedUser === 'unAuthenticated') {
            navigate('/login');
        } else {
            try {
                const response = await apiClient.post(`handel_subscribe_report_market/`, {
                    report_id: report_id,
                    user_id: authenticatedUser.user_id
                });
                const data = response.data;
                const status = data.status;
                fetchSellerSubscriptionCheck();
            } catch (error) {
                console.log(error);
            }
        }
    };



    //rating 
    const [positiveStar, setPositiveStar] = useState(1);
    const [negativeStar, setNegativeStar] = useState(1);

    const ratingStartSet = () => {
        if (reportDetail) {
            if (reportDetail.formatted_rating !== 0) {
                const calculated_positive_star =  Math.round(reportDetail.formatted_rating);
                const calculated_negative_star = 5 - calculated_positive_star;
                setPositiveStar(calculated_positive_star);
                setNegativeStar(calculated_negative_star);
            } else if (reportDetail === 0) {
                setPositiveStar(0);
                setNegativeStar(5);
            }
        };
    };

    useEffect(() => {
        ratingStartSet();
    }, [report_id, reportDetail]);

    //recommended reports
    const [authorsReports, setAuthorsReports] = useState([]);
    const [recommendedReports, setRecommendedReports] = useState([]); // same category
    const [allRecommendedReports, setAllRecommendedReports] = useState([]); // all category

    const reportRecommendation = async () => {
        try {
            const response = await apiClient.get(`/report_recommendation_market_detail/${report_id}/`);
            const data = response.data;
            setAuthorsReports(data.author_reports);
            setRecommendedReports(data.category_recommendation);
            setAllRecommendedReports(data.additional_recommendation);
        } catch(error) {
            console.log(error);
        }
    };  

    useEffect(() => {
        reportRecommendation();
    }, [report_id]);


    //Bookmark handel

    const [bookmarkStatus, setBookmarkStatus] = useState(false);
    
    const fetchBookmarkStatus = async () => {
        try {
            const response = await apiClient.get(`/report_bookmark_status/${report_id}/${authenticatedUser.user_id}/`);
            const data = response.data.status
            if (data === 'bookmarked') {
                setBookmarkStatus(true)
            } else if (data === 'not_bookmarked') {
                setBookmarkStatus(false)
            }
        } catch(error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if(authenticatedUser !== 'unAuthenticated') {
            fetchBookmarkStatus();
        }
    }, [report_id]);

    
    const handleBookmark = async () => {
        try {
            if (authenticatedUser !== 'unAuthenticated') {
                const response = await apiClient.post('/report_bookmark/', {
                    report_id: report_id,
                    user_id: authenticatedUser.user_id
                });
                const data = response.data.status;
                if (data === 'bookmark_removed') {
                    setBookmarkStatus(false);
                } else if (data === 'bookmarked') {
                    setBookmarkStatus(true);
                }
            } else if (authenticatedUser === 'unAuthenticated') {
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Report Detail Section Navigator 
    const [activeSection, setActiveSection] = useState('description');
    const descriptionRef = useRef();
    const sellerRef = useRef();
    const reviewRef = useRef();
    const recommendationsRef = useRef();

    const scrollToSection = (ref) => {
        const sellreportNavCoverFrameHeight = document.querySelector('.sellreport_nav_cover_frame').offsetHeight;
        const sectionIndicatorHeight = document.querySelector('.report_detail_section_indicator_main_frame').offsetHeight;
        
        if (ref.current) {
            const sectionTop = ref.current.offsetTop;
            const scrollTop = sectionTop - sellreportNavCoverFrameHeight - sectionIndicatorHeight - 24;
            window.scrollTo({ top: scrollTop, behavior: 'smooth' });
        }
    };

    const handleSectionClick = (section, ref) => {
        setActiveSection(section);
        scrollToSection(ref);
    };

    const handleScroll = () => {
        const windowTop = window.scrollY;
        const sellreportNavCoverFrameHeight = document.querySelector('.sellreport_nav_cover_frame').offsetHeight;
        const sectionIndicatorHeight = document.querySelector('.report_detail_section_indicator_main_frame').offsetHeight;
        
        if (descriptionRef.current && recommendationsRef.current) {
            const adjustedDescriptionTop = descriptionRef.current.offsetTop - sellreportNavCoverFrameHeight - sectionIndicatorHeight - 24;
            const adjustedRecommendationsTop = recommendationsRef.current.offsetTop - sellreportNavCoverFrameHeight - sectionIndicatorHeight - 24;
            const adjustedSellerTop = sellerRef.current.offsetTop - sellreportNavCoverFrameHeight - sectionIndicatorHeight - 24;
            const adjustedReviewTop = reviewRef.current.offsetTop - sellreportNavCoverFrameHeight - sectionIndicatorHeight - 24;
    
            if (windowTop >= adjustedDescriptionTop && windowTop < adjustedSellerTop) {
                setActiveSection('description');
            } else if (windowTop >= adjustedSellerTop && windowTop < adjustedReviewTop) {
                setActiveSection('seller');
            } else if (windowTop >= adjustedReviewTop && windowTop < adjustedRecommendationsTop) {
                setActiveSection('review');
            } else if (windowTop >= adjustedRecommendationsTop) {
                setActiveSection('recommendations');
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Preview Section
    const [previewStyle, setPreviewStyle] = useState(false);
    const handlePreviewStyle = () => {
        if (previewStyle) {
            setPreviewStyle(false)
        } else {
            if (previewImage.length === 0) {
                handleFetchPreviewImage();
            }
            setPreviewStyle(true)
        }
    }

    const [previewLoading, setPreviewLoading] = useState(true);
    const [previewImage, setPreviewImage] = useState([]);

    const handleFetchPreviewImage = async () => {
        setPreviewLoading(true);
        try {
            const response = await apiClient.get(`/get_report_preview_image/${report_id}/`);
            const data = response.data;
            setPreviewImage(data.previews || []);
        } catch(error) {
            console.log(error)
        } finally {
            setPreviewLoading(false);
        }
    };

    // Purchase Section

    const [purchasePopStyle, setPurchasePopStyle] = useState(false);
    const handlePurchasePopStyle = () => {
        if (purchasePopStyle) {
            setPurchasePopStyle(false);
        } else {
            setPurchasePopStyle(true);
        }
    };


    // Refund Policy

    const [refundPolicyStyle, setRefundPolicyStyle] = useState(false);

    const handleRefundPolicyStyle = () => {
        setRefundPolicyStyle(!refundPolicyStyle)
    }


    
    return (
        <div className="Report_Market_Detail_Frame_R">
            <ReportMarketBase handelCategory={handleReportMarketCategory}/>
            <ReportPreview 
                open={previewStyle} 
                loading = {previewLoading}
                openHandle={handlePreviewStyle} 
                reportSubject={reportDetail.subject}
                previewImage={previewImage}
            />
            <ReportPurchasePage 
                popStyle={purchasePopStyle}
                handlePopStyle={handlePurchasePopStyle}
                // Report Detail
                subject={reportDetail.subject}
                category={reportDetail.report_category}
                create_date={reportDetail.report_create_date}
                price={reportDetail.formatted_price}
                author={reportDetail.author_username}
                author_profile_image={reportDetail.author_profile_image}
            />
            <div className="report_detail_purchase_frame_mobile">
                <div className="report_purchase_action_button_frame report_bookmark_button_mobile Pre_KR_Normal" onClick={handleBookmark}>
                    <div className="report_bookmark_icon report_not_bookmarked">
                        {!bookmarkStatus ? (
                            <BookmarkIcon style={{ width: '24px', height: '24px' }}/>
                        ) : (
                            <div style={{ width: '24px', height: '24px' }}/>
                        )}
                    </div>
                </div>
                <div className="report_detail_preview_purchase_button_mobile Pre_KR_Normal" style={{border:'solid 1px #eee'}} onClick={() => handlePreviewStyle()}>미리보기</div>
                <a className="report_detail_preview_purchase_button_mobile Pre_KR_Normal" style={{background:'#0066FF', color:'#fff'}} onClick={() => setPurchasePopStyle(true)}>구매하기</a>
            </div>
            <div className='report_market_main_cover_frame_react'>
                <div className="report_detail_main_content">
                    <div className="report_detail_purchase_section_cover">
                        {/* detail section */}
                        <div className="report_detail_main_cover">
                            <div className="report_main_title_frame">
                                <Link className="report_main_title_author_frame" to={`/profile/${ reportDetail.author_id }`}>
                                    <div className="report_main_title_author_profile_img">
                                        <img src={ reportDetail.author_profile_image }></img>
                                    </div>
                                    <div className="report_main_title_author_username_text Pre_KR_Normal">{ reportDetail.author_username }</div>
                                </Link>
                                <span className="report_main_title_subject_text Pre_KR_Medium">
                                    { reportDetail.subject }
                                </span>
                                <div className="report_detail_rating_price_frame_responded">
                                    <div className="report_detail_rating_frame_responded">
                                        <div className="report_detail_rating_star_frame_responded">
                                            {Array(positiveStar).fill(0).map((_, i) => (
                                                <RatingBlueIcon style={{width:'12px', height: '12px'}}/>
                                            ))}
                                            {Array(negativeStar).fill(0).map((_, i) => (
                                                <RatingGreyIcon style={{width:'12px', height: '12px'}}/>
                                            ))}
                                        </div>
                                        <span className="Pre_KR_SemiBold">{ reportDetail.formatted_rating }</span>
                                        <span className="Pre_KR_Normal">({ reportDetail.rating_count })</span>
                                    </div>
                                    <span className="report_detail_price_responded Pre_KR_Medium">{ reportDetail.formatted_price }원</span>
                                </div>
                            </div>
                            <div className="report_detail_section_indicator_main_frame">
                                <div
                                    className={`report_detail_section_indicator section_indicator_description Pre_KR_Normal ${activeSection === 'description' ? 'active' : ''}`}
                                    onClick={() => handleSectionClick('description', descriptionRef)}
                                >
                                    리포트 설명
                                </div>
                                <div
                                    className={`report_detail_section_indicator section_indicator_seller Pre_KR_Normal ${activeSection === 'seller' ? 'active' : ''}`}
                                    onClick={() => handleSectionClick('seller', sellerRef)}
                                >
                                    판매자 정보
                                </div>
                                <div
                                    className={`report_detail_section_indicator section_indicator_review Pre_KR_Normal ${activeSection === 'review' ? 'active' : ''}`}
                                    onClick={() => handleSectionClick('review', reviewRef)}
                                >
                                    리뷰
                                </div>
                                <div
                                    className={`report_detail_section_indicator section_indicator_recommendations Pre_KR_Normal ${activeSection === 'recommendations' ? 'active' : ''}`}
                                    onClick={() => handleSectionClick('recommendations', recommendationsRef)}
                                >
                                    추천 리포트
                                </div>
                            </div>
                            <div className="report_detail_section_main_frame">
                                <div className="report_detail_additional_information_responded Pre_KR_Normal">
                                    <div className="report_detail_additional_information_frame">
                                        <span>카테고리</span>
                                        <span>{ reportDetail.report_category }</span>
                                    </div>
                                    <div className="report_detail_additional_information_frame">
                                        <span>작성일</span>
                                        <span>{ reportDetail.report_create_date }</span>
                                    </div>
                                </div>
                                <div className="report_detail_description_main_frame" ref={descriptionRef}>
                                    <div className="report_detail_section_title_text Pre_KR_Medium">기본정보</div>
                                    <div className="report_description Pre_KR_light" dangerouslySetInnerHTML={{ __html: reportDetail.report_description }}></div>
                                </div>
                                <div className="report_author_detail_main_frame" ref={sellerRef}>
                                    <div className="report_detail_section_title_text Pre_KR_Medium">판매자 정보</div>
                                    <div className="report_detail_author_information_main_frame">
                                        <div className="report_detail_author_information_frame">
                                            <div className="report_detail_author_profile_frame">
                                                <div className="report_detail_author_profile_image">
                                                    <img src={ reportDetail.author_profile_image }></img>
                                                </div>
                                                <div className="report_detail_author_main_information_frame">
                                                    <div className="report_detail_author_detail_username_text Pre_KR_Medium">{ reportDetail.author_username }</div>
                                                    <div className="report_detail_author_additional_information_frame Pre_KR_Normal">
                                                        <span>좋아요 <span className="Pre_KR_Medium">{ reportDetail.author_likes_count }</span></span>
                                                        <span>구독 <span className="Pre_KR_Medium">{ reportDetail.author_subscribers_count }</span></span>
                                                        <span>리포트 <span className="Pre_KR_Medium">{ reportDetail.author_selling_reports_count }</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                            {reportDetail.author_introduction && (
                                                <div className="report_detail_author_introduction_frame Pre_KR_Normal">
                                                    {reportDetail.author_introduction}
                                                </div>
                                            )}
                                        </div>
                                        {authenticatedUser.user_id === reportDetail.author_id ? (
                                            <Link 
                                                className="report_author_subscribe_button subscribed_button Pre_KR_Normal"  
                                                to={`/profile/${ reportDetail.author_id }`}
                                                style={{paddingLeft: '16px'}}>
                                                내 프로필
                                            </Link>
                                        ) : (
                                            <>
                                                {!userSubscribeStatus ? (
                                                    <div className="report_author_subscribe_button subscribed_button  Pre_KR_Normal" onClick={() => handelSubscribe()}>
                                                        <PlusWhiteIcon />
                                                        구독하기
                                                    </div>
                                                ) : (
                                                    <div className="report_author_subscribe_button unsubscribed_button Pre_KR_Normal" onClick={() => handelSubscribe()}>
                                                        <CheckWhiteIcon />
                                                        구독취소
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="report_detail_recommendation_reports_main_frame">
                                    <div className="report_detail_section_title_text Pre_KR_Medium">판매자의 <br/> 다른 리포트</div>
                                    <div className="report_detail_recommendation_reports_frame">
                                        <ReportProduct reports={authorsReports} customStyleDetail={true}/>
                                    </div>
                                </div>
                                <div className="report_review_main_frame" ref={reviewRef}>
                                    <div className="report_detail_section_title_text Pre_KR_Medium">리뷰</div>
                                    <div className="report_detail_review_overall_rating_frame">
                                        <div className="report_detail_overall_rating_icon_text_frame">
                                            {Array(positiveStar).fill(0).map((_, i) => (
                                                <RatingBlueIcon style={{width:'18px', height: '18px'}}/>
                                            ))}
                                            {Array(negativeStar).fill(0).map((_, i) => (
                                                <RatingGreyIcon style={{width:'18px', height: '18px'}}/>
                                            ))}
                                        </div>
                                        <span className="report_detail_overall_rating_text Pre_KR_Medium" style={{marginLeft: '8px'}}>{ reportDetail.formatted_rating }</span>
                                        <span className="report_detail_overall_rating_text Pre_KR_Medium" style={{color:'#616161', marginLeft:'4px', fontSize:'14px'}}>({ reportDetail.rating_count })</span>
                                    </div>
                                    <ReportReview report_id={report_id} page_type={'detail'}/>
                                </div>
                                <div className="refund_policy_main_frame">
                                    <div className="refund_policy_frame" onClick={() => handleRefundPolicyStyle()}>
                                        <span className="Pre_KR_Medium">취소 및 환불 정책</span>
                                        <PolicyDownIcon className={`policy_dropdown_icon ${refundPolicyStyle ? 'open' : 'close'}`}/>
                                    </div>
                                    <div className={`refund_policy_content_frame ${refundPolicyStyle ? 'open' : null} Pre_KR_Medium`}>
                                        01. 전문가와 의뢰인 간의 상호 협의 후 청약철회가 가능합니다. 
                                    
                                        02. 전문가의 귀책사유로 디자인작업을 시작하지 않았거나 혹은 이에 준하는 보편적인 관점에서 심각하게 잘못 이행한 경우 결제 금액 전체 환불이 가능합니다. 

                                        03. 전문가가 작업 기간 동안 지정된 서비스를 제공하지 못할 것이 확실한 경우 지급받은 서비스 비용을 일할 계산하여 작업물 개수와 작업 기간 일수만큼 공제하고 잔여 금액을 환불합니다. 

                                        04. 서비스 받은 항목을 공제하여 환불하며, 공제 비용은 정가 처리됩니다.
                                        가. 소비자 피해 보상 규정에 의거하여 작업물 원본의 멸실 및 작업 기간 미이행 및 이에 상응하는 전문가 책임으로 인한 피해 발생 시, 전액 환불 
                                        나. 시안 작업 진행된 상품 차감 환불
                                        ⓐ. '디자인'에 대한 금액이 서비스 내 별도 기재가 되지 않았거나, 디자인 상품 패키지 내 수정 횟수가 1회(1회 포함) 이상인 서비스 상품의 시안 or 샘플이 제공된 경우
                                        → 구매금액의 10% 환불(디자인 비용이 별도 기재되어 있는 경우, 해당금액 차감 후 환불)
                                        ※ 시안 제공 및 수정이 추가로 이뤄진 경우 환불 금액내 수정 횟수에 따라 분할하여 환불. 

                                        05. 주문 제작 상품 등 서비스 받은 항목이 없으며, 결제 후 1일 이내 작업이 진행되기 전 시점은 전액 환불 가능. 

                                        06. 다만, 환불이 불가능한 서비스에 대한 사실을 표시사항에 포함한 경우에는 의뢰인의 환불요청이 제한될 수 있습니다. 
                                        가. 고객의 요청에 따라 개별적으로 주문 제작되는 재판매가 불가능한 경우(인쇄, 이니셜 각인, 사이즈 맞춤 등) 
                                        ⓐ. 주문 제작 상품 특성상 제작(인쇄 등) 진행된 경우. 
                                        ⓑ. 인쇄 색상의 차이 : 모니터의 종류에 따라 색상의 차이가 발생하며,인쇄 시마다 합판 인쇄 방법의 특성상 색상 표현의 오차가 발생함. 
                                        ⓒ. 디자인 서비스이며 수정 횟수가 존재하지 않았던 상품일 경우 시안 수령 후 환불 불가
                                    </div>
                                </div>
                            </div>
                            {recommendedReports.length !== 0 && (
                                <div className="report_detail_recommendation_reports_main_frame bottom" ref={recommendationsRef}>
                                    <div className="report_detail_section_title_text Pre_KR_Medium">다른 국내기업 리포트</div>
                                    <div className="report_detail_recommendation_reports_frame">
                                        <ReportProduct reports={recommendedReports} customStyleDetail={true}/>
                                    </div>
                                </div>
                            )}
                            {allRecommendedReports.length !== 0 && (
                                <div className="report_detail_recommendation_reports_main_frame bottom">
                                    <div className="report_detail_section_title_text Pre_KR_Medium">다른 추천 리포트</div>
                                    <div className="report_detail_recommendation_reports_frame">
                                        <ReportProduct reports={allRecommendedReports} customStyleDetail={true}/>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* purchase section */}
                        <div className="report_detail_purchase_main_frame">
                            <div className="report_detail_purchase">
                                <div className="report_detail_purchase_report_additional_information_frame">
                                    <div className="report_detail_purchase_report_additional_information">
                                        <span className="report_detail_purchase_report_additional_information_title_text Pre_KR_Normal">카테고리</span>
                                        <span className="report_detail_purchase_report_additional_information_text Pre_KR_Medium">{ reportDetail.report_category }</span>
                                    </div>
                                    <div className="report_detail_purchase_report_additional_information">
                                        <span className="report_detail_purchase_report_additional_information_title_text Pre_KR_Normal">작성일</span>
                                        <span className="report_detail_purchase_report_additional_information_text Pre_KR_Medium">{ reportDetail.report_create_date }</span>
                                    </div>

                                    <div className="report_detail_purchase_report_additional_information">
                                        <span className="report_detail_purchase_report_additional_information_title_text Pre_KR_Normal">평점</span>
                                        <div className="report_detail_purchase_rating_frame Pre_KR_Medium">
                                            <RatingBlueIcon style={{width:'12px', height:'12px', marginBottom:'2px'}}/>
                                            { reportDetail.formatted_rating }
                                        </div>
                                    </div>
                                    <div className="report_detail_purchase_report_additional_information">
                                        <span className="report_detail_purchase_report_additional_information_title_text Pre_KR_Normal">가격</span>
                                        <span className="report_detail_purchase_report_additional_information_text Pre_KR_Medium">{ reportDetail.formatted_price } 원</span>
                                    </div>
                                </div>
                                <a className="report_detail_purchase_button Pre_KR_Medium" onClick={() => setPurchasePopStyle(true)}>구매하기</a>
                                <div className="report_bookmark_preview_button_main_cover">
                                    <div className="report_detail_bookmark_button Pre_KR_Normal" onClick={handleBookmark}>
                                        <div className="report_bookmark_icon report_not_bookmarked">
                                            {!bookmarkStatus ? (
                                                <BookmarkIcon style={{ width: '24px', height: '24px' }}/>
                                            ) : (
                                                <div style={{ width: '24px', height: '24px' }}/>
                                            )}
                                        </div>
                                    </div>
                                    <div className="report_preview_button Pre_KR_Medium" onClick={() => handlePreviewStyle()}>미리보기</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportDetail;