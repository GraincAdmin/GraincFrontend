import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import '../../../static/css/SellReportsBase/Bookmark/BookmarkMain.css'

import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../axiosAPIClient";
import GlobalCommunityArticle from "../../Community/Community_Global/Community_Article";
import Pagination from "../../Global/Pagination";
import SituationalNavM from "../Situational_Nav_Mobile/SituationalNavM";

// none
import BookmarkNone from "./BookmarkNone";

// skeleton
import SkeletonType2 from "../Skeleton_UI/SkeletonType2";

import { ReactComponent as MoreOptionIcon } from '../../../static/assets/GlobalIcon/More_Horizontal.svg'
//folder control
import BookmarkFolderControl from "./BookmarkFolderControl";
import SnackBarStore from "../../Store/SnackBarStore";
const BookmarkArticle = () => {
    const apiClient = useAxios();
    const { showSnackBar } = SnackBarStore();
    const {folder_id} = useParams();

    // user identification
    const { user } = useContext(AuthContext);
    const authenticatedUser = user ? user : "unAuthenticated";
    const navigate = useNavigate();
    const handelPageAuthority = () => {
        if (authenticatedUser === 'unAuthenticated') {
            navigate('/login');
        }
    };
    useEffect(() => {
        handelPageAuthority();
    }, []);


    const [articleBookmark, setArticleBookmark] = useState([]);
    const [articleBookmarkLoading, setArticleBookmarkLoading] = useState(false);
    const [bookmarkFolderName, setBookmarkFolderName] = useState(null);
    const [bookmarkCount, setBookmarkCount] = useState(0);

    const currentPage = useRef(1);
    const maxPage = useRef(1);

    const observerRef = useRef();


    const fetchArticleBookmark = async (page) => {
        if (user) {
            setArticleBookmarkLoading(true);
            try {
                const response = await apiClient.get(`/bookmark_page_article/?page=${page}&folder=${folder_id}`);
                const data = response.data;
                setArticleBookmark((preState) => [...preState, ...data.article]);
                setBookmarkCount(data.bookmark_count);
                setBookmarkFolderName(data.folder_name);
                currentPage.current = Number(data.current_page);
                maxPage.current = Number(data.max_page);
            }catch(error) {
                if (error.response.status !== 401) {
                    showSnackBar('북마크를 가져오던 중 문제가 발생했습니다', 'error')
                }
            } finally {
                setArticleBookmarkLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchArticleBookmark(1)
    }, [folder_id]);

    useEffect(() => {
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && currentPage.current < maxPage.current && !articleBookmarkLoading) {
                    fetchArticleBookmark(currentPage.current + 1);
                }
            },
            {threshold: 1}
        );

        if (observerRef.current) {
            if (!articleBookmarkLoading) {
                observer.observe(observerRef.current);
            } else {
                observer.unobserve(observerRef.current);
            }
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };

    }, [currentPage.current, maxPage.current, articleBookmarkLoading]);




    //Bookmark Folder Delete Control
    const [bookmarkDeleteControlStyle, setBookmarkDeleteControlStyle] = useState(false);
    const [selectedBookmarkFolderControl, setSelectedBookmarkFolderControl] = useState();

    const handelBookmarkControlOpen = (folder_id) => {
        setBookmarkDeleteControlStyle(true)
        setSelectedBookmarkFolderControl(folder_id)
    };
        
    return (
        <>
            <SituationalNavM page={'커뮤니티 북마크'}/>
            <div className="bookmark_main_content_frame">
                <BookmarkFolderControl folder_id={selectedBookmarkFolderControl} display_style={bookmarkDeleteControlStyle} handelDisplayStyle={setBookmarkDeleteControlStyle}/>
                <div class="bookmark_folder_indicator_control_frame bookmark_padding_option">
                    <div class="bookmark_folder_indicator_search_result_frame">
                        <span className="Pre_KR_Normal" style={{fontSize:'14px', color:'#616161'}}>북마크 {bookmarkCount}개</span>
                        <span className="Pre_KR_Medium">{ bookmarkFolderName }</span>
                    </div>
                    <div class="bookmark_folder_control_button" onClick={() => handelBookmarkControlOpen(folder_id)}>
                    <MoreOptionIcon />
                    </div>
                </div>
                <div class="bookmark_view_frame">
                    {articleBookmark.length !== 0  ? (
                        <>
                            <GlobalCommunityArticle data={articleBookmark} />
                        </>
                    ) : (
                        !articleBookmarkLoading && (
                            <BookmarkNone page={'community'} link={'community'}/>
                        )
                    )}
                    {articleBookmarkLoading && (
                        <SkeletonType2 count={5} />
                    )}
                </div>
                <div style={{height: '10px'}} ref={observerRef} />
            </div>
        </>
    )
}

export default BookmarkArticle