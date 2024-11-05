import React, { useEffect, useState } from "react";
import '../../../static/css/ReportMarket/Report_Detail/Report_Review_Page.css'
import useAxios from "../../../axiosAPIClient";
import ReportReview from "./Report_Review";
import { useParams } from "react-router-dom";
function ReportReviewPage() {
    const apiClient = useAxios();
    // get report id
    const { report_id } = useParams();

    const [reportSubject, setReportSubject] = useState();
    const [ratingCount, setRatingCount] = useState();
    const [averageRating, setAverageRating] = useState();

    const fetchReportReviewDetail = async () => {
        try {
            const response = await apiClient.get(`/report_review_page_detail/${report_id}`);
            const data = response.data;
            setReportSubject(data.report_subject);
            setRatingCount(data.rating_count);
            setAverageRating(data.average_rating);
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchReportReviewDetail();
    }, [report_id]);

    //rating 
    const [positiveStar, setPositiveStar] = useState(1);
    const [negativeStar, setNegativeStar] = useState(1);
    const ratingStartSet = () => {
        if (averageRating) {
            if (averageRating !== 0) {
                const calculated_positive_star =  Math.round(averageRating);
                const calculated_negative_star = 5 - calculated_positive_star;
                setPositiveStar(calculated_positive_star);
                setNegativeStar(calculated_negative_star);
            } else if (averageRating === 0) {
                setPositiveStar(0);
                setNegativeStar(5);
            }
        };
    };

    useEffect(() => {
        ratingStartSet();
    }, [averageRating]);
    return (
        <div className="report_detail_review_main_cover_R"> 
            <div className="report_detail_review_report_title_frame Pre_KR_Medium">{ reportSubject }</div>
            <div className="report_detail_review_overall_rating_frame">
                <div className="report_detail_overall_rating_icon_text_frame">
                    {Array(positiveStar).fill(0).map((_, i) => (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                            <mask id="mask0_1227_1920" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
                            <rect y="0.402344" width="20" height="20" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_1227_1920)">
                            <path d="M6.57487 6.03854L8.82799 3.08167C8.97758 2.88153 9.15522 2.73458 9.36091 2.64083C9.56661 2.54694 9.78376 2.5 10.0124 2.5C10.241 2.5 10.4581 2.54694 10.6638 2.64083C10.8695 2.73458 11.0472 2.88153 11.1967 3.08167L13.4499 6.03854L16.8953 7.20187C17.2245 7.30771 17.4811 7.49431 17.6653 7.76167C17.8496 8.02917 17.9417 8.32458 17.9417 8.64792C17.9417 8.79722 17.9199 8.94604 17.8763 9.09438C17.8327 9.24271 17.761 9.38486 17.6613 9.52083L15.4178 12.6346L15.5011 15.9392C15.515 16.3779 15.3704 16.7477 15.0672 17.0485C14.7641 17.3495 14.4109 17.5 14.0076 17.5C13.9958 17.5 13.8563 17.4818 13.5892 17.4454L10.0124 16.4198L6.43549 17.4454C6.36605 17.4732 6.29438 17.4892 6.22049 17.4935C6.14661 17.4978 6.07883 17.5 6.01716 17.5C5.61008 17.5 5.25591 17.3495 4.95466 17.0485C4.65341 16.7477 4.50973 16.3779 4.52362 15.9392L4.60695 12.6138L2.37612 9.52083C2.2764 9.38431 2.20473 9.2416 2.16112 9.09271C2.11751 8.94368 2.0957 8.79472 2.0957 8.64583C2.0957 8.33153 2.18723 8.03924 2.37029 7.76896C2.55334 7.49868 2.80904 7.30701 3.13737 7.19396L6.57487 6.03854Z" fill="#0066FF"/>
                            </g>
                        </svg>
                    ))}
                    {Array(negativeStar).fill(0).map((_, i) => (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                            <mask id="mask0_1227_1991" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
                            <rect y="0.402344" width="20" height="20" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_1227_1991)">
                            <path d="M6.57487 6.03854L8.82799 3.08167C8.97758 2.88153 9.15522 2.73458 9.36091 2.64083C9.56661 2.54694 9.78376 2.5 10.0124 2.5C10.241 2.5 10.4581 2.54694 10.6638 2.64083C10.8695 2.73458 11.0472 2.88153 11.1967 3.08167L13.4499 6.03854L16.8953 7.20187C17.2245 7.30771 17.4811 7.49431 17.6653 7.76167C17.8496 8.02917 17.9417 8.32458 17.9417 8.64792C17.9417 8.79722 17.9199 8.94604 17.8763 9.09438C17.8327 9.24271 17.761 9.38486 17.6613 9.52083L15.4178 12.6346L15.5011 15.9392C15.515 16.3779 15.3704 16.7477 15.0672 17.0485C14.7641 17.3495 14.4109 17.5 14.0076 17.5C13.9958 17.5 13.8563 17.4818 13.5892 17.4454L10.0124 16.4198L6.43549 17.4454C6.36605 17.4732 6.29438 17.4892 6.22049 17.4935C6.14661 17.4978 6.07883 17.5 6.01716 17.5C5.61008 17.5 5.25591 17.3495 4.95466 17.0485C4.65341 16.7477 4.50973 16.3779 4.52362 15.9392L4.60695 12.6138L2.37612 9.52083C2.2764 9.38431 2.20473 9.2416 2.16112 9.09271C2.11751 8.94368 2.0957 8.79472 2.0957 8.64583C2.0957 8.33153 2.18723 8.03924 2.37029 7.76896C2.55334 7.49868 2.80904 7.30701 3.13737 7.19396L6.57487 6.03854Z" fill="#E1E1E1"/>
                            </g>
                        </svg>
                    ))}
                    <span className="report_detail_overall_rating_text Pre_KR_Medium">{ averageRating }</span>
                </div>
                <span className="report_detail_overall_rating_text Pre_KR_Medium" style={{color:'#eee', marginLeft:'8px'}}>|</span>
                <span className="report_detail_overall_rating_text Pre_KR_Medium" style={{color:'#616161', marginLeft:'8px', fontSize:'14px'}}>리뷰 {ratingCount} 건</span>
            </div>
            <ReportReview report_id={report_id} page_type={'review'}/>
        </div>
    );
};

export default ReportReviewPage