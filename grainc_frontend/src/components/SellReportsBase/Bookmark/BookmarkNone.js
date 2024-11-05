import React from "react";
import '../../../static/css/SellReportsBase/Bookmark/BookmarkNone.css'
// illustration
import { ReactComponent as BookmarkNoneIllustration } from '../../../static/assets/Illustrations/BookmarkNone.svg'
import { Link } from "react-router-dom";
function BookmarkNone({page, link}) {
    return (
        <div className="bookmark_none_frame">
            <BookmarkNoneIllustration />
            <div className="bookmark_none_header Pre_KR_SemiBold">
                {page === 'home' ? (
                    '북마크 폴더가 없습니다'
                ) : (
                    '북마크가 없습니다'
                )}
            </div>
            <Link 
                className="bookmark_none_button Pre_KR_Medium"
                to={link === 'community' ? '/community?category=home' : '/report_market?category='}>
                최신 컨텐츠 보러가기
            </Link>
        </div>
    );
};

export default BookmarkNone