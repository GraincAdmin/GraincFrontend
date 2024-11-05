import React, { useEffect, useState } from "react";
import '../../../static/css/ReportMarket/Report_Detail/Report_Review.css'
import useAxios from "../../../axiosAPIClient";
import { Link } from "react-router-dom";
import Pagination from "../../Global/Pagination";

const ReportReview = ({report_id, page_type}) => {
    const apiClient = useAxios();
    const [reviews, setReviews] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const fetchReportReviews = async () => {
        try {
            const url = page_type === 'review' 
                ? `/report_review/${report_id}/${page_type}/?page=${currentPage}`
                : `/report_review/${report_id}/${page_type}/`;

            const response = await apiClient.get(url);
            const data = response.data
            setReviews(data.reviews)
            if (page_type === 'review') {
                setCurrentPage(data.current_page);
                setMaxPage(data.max_page);
            }
        } catch(error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchReportReviews();
    }, [report_id, currentPage]);

    const lastReview = reviews.length - 1;

    return (
        <>
            {reviews.length !== 0 ? (
                reviews.map((review, index) => (
                    <div className="report_review_frame" key={index} style={index === lastReview ? { borderBottom: "0px" } : {}}>
                        <div className="report_review_author_frame">
                            <Link className="report_review_author_profile_image" to={`/profile/${ review.author_id }`}>
                                <img src={ review.author_profile_image }></img>
                            </Link>
                            <div className="report_review_authors_rating_username_frame">
                                <Link className="report_review_author_username Pre_KR_Medium" to={`/profile/${ review.author_id }`}>{ review.author_username }</Link>
                                <div className="report_review_authors_rating_frame">
                                    <div className="report_review_authors_rating_icon_frame">
                                        {Array(review.positive_star).fill(0).map((_, i) => (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                                <mask id="mask0_1227_2064" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="16">
                                                <rect y="0.402344" width="15" height="15" fill="#D9D9D9"/>
                                                </mask>
                                                <g mask="url(#mask0_1227_2064)">
                                                <path d="M4.93164 4.63047L6.62148 2.41281C6.73367 2.26271 6.8669 2.1525 7.02117 2.08219C7.17544 2.01177 7.33831 1.97656 7.50977 1.97656C7.68122 1.97656 7.84409 2.01177 7.99836 2.08219C8.15263 2.1525 8.28586 2.26271 8.39805 2.41281L10.0879 4.63047L12.672 5.50297C12.9188 5.58234 13.1113 5.72229 13.2495 5.92281C13.3877 6.12344 13.4568 6.345 13.4568 6.5875C13.4568 6.69948 13.4404 6.81109 13.4077 6.92234C13.375 7.03359 13.3213 7.14021 13.2465 7.24219L11.5638 9.5775L11.6263 12.0559C11.6367 12.385 11.5283 12.6623 11.3009 12.888C11.0736 13.1137 10.8087 13.2266 10.5062 13.2266C10.4973 13.2266 10.3927 13.2129 10.1924 13.1856L7.50977 12.4164L4.82711 13.1856C4.77503 13.2065 4.72128 13.2185 4.66586 13.2217C4.61044 13.2249 4.55961 13.2266 4.51336 13.2266C4.20805 13.2266 3.94242 13.1137 3.71648 12.888C3.49055 12.6623 3.38279 12.385 3.3932 12.0559L3.4557 9.56188L1.78258 7.24219C1.70779 7.13979 1.65404 7.03276 1.62133 6.92109C1.58862 6.80932 1.57227 6.6976 1.57227 6.58594C1.57227 6.35021 1.64091 6.13099 1.7782 5.92828C1.91549 5.72557 2.10727 5.58182 2.35352 5.49703L4.93164 4.63047Z" fill="#0066FF"/>
                                                </g>
                                            </svg>
                                        ))}
                                        {Array(review.negative_star).fill(0).map((_, i) => (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                                <mask id="mask0_1227_2068" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="16">
                                                <rect y="0.402344" width="15" height="15" fill="#D9D9D9"/>
                                                </mask>
                                                <g mask="url(#mask0_1227_2068)">
                                                <path d="M4.93164 4.63047L6.62148 2.41281C6.73367 2.26271 6.8669 2.1525 7.02117 2.08219C7.17544 2.01177 7.33831 1.97656 7.50977 1.97656C7.68122 1.97656 7.84409 2.01177 7.99836 2.08219C8.15263 2.1525 8.28586 2.26271 8.39805 2.41281L10.0879 4.63047L12.672 5.50297C12.9188 5.58234 13.1113 5.72229 13.2495 5.92281C13.3877 6.12344 13.4568 6.345 13.4568 6.5875C13.4568 6.69948 13.4404 6.81109 13.4077 6.92234C13.375 7.03359 13.3213 7.14021 13.2465 7.24219L11.5638 9.5775L11.6263 12.0559C11.6367 12.385 11.5283 12.6623 11.3009 12.888C11.0736 13.1137 10.8087 13.2266 10.5062 13.2266C10.4973 13.2266 10.3927 13.2129 10.1924 13.1856L7.50977 12.4164L4.82711 13.1856C4.77503 13.2065 4.72128 13.2185 4.66586 13.2217C4.61044 13.2249 4.55961 13.2266 4.51336 13.2266C4.20805 13.2266 3.94242 13.1137 3.71648 12.888C3.49055 12.6623 3.38279 12.385 3.3932 12.0559L3.4557 9.56188L1.78258 7.24219C1.70779 7.13979 1.65404 7.03276 1.62133 6.92109C1.58862 6.80932 1.57227 6.6976 1.57227 6.58594C1.57227 6.35021 1.64091 6.13099 1.7782 5.92828C1.91549 5.72557 2.10727 5.58182 2.35352 5.49703L4.93164 4.63047Z" fill="#E1E1E1"/>
                                                </g>
                                            </svg>
                                        ))}
                                        <span className="report_review_authors_rating_text Pre_KR_Medium">{ review.formatted_rating }</span>
                                    </div>
                                    <span className="report_review_authors_rating_text Pre_KR_Normal" style={{color:'#eee', marginLeft:'8px'}}>|</span>
                                    <span className="report_review_authors_rating_text Pre_KR_Normal" style={{color:'#616161', marginLeft:'8px'}}>{ review.review_create_date }</span>
                                </div>
                            </div>
                        </div>
                        <div className="report_review_content_frame Pre_KR_Normal">
                            { review.text_review }
                        </div>
                    </div>
                ))
            ) : null}
            {reviews.length >= 2 && page_type === 'detail' ? (
                <div className="report_review_seemore_button_frame">
                    <Link className="report_review_seemore_button Pre_KR_Medium" to={`/report_review/${report_id}`}>
                        리뷰 더보기
                    </Link>
                </div>
            ): null}
            {page_type === 'review' &&  (
                <Pagination page={currentPage} max_page={maxPage} handelPage={handlePageChange}/>
            )}
        </>
    );
};

export default ReportReview



