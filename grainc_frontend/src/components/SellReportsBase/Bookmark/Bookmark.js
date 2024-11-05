import React, { useEffect, useState, useContext, useRef } from "react";
import SituationalNavM from "../Situational_Nav_Mobile/SituationalNavM";
import '../../../static/css/SellReportsBase/Bookmark/Bookmark.css'
import AuthContext from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../../axiosAPIClient";

// No content
import BookmarkNone from '../../SellReportsBase/Bookmark/BookmarkNone'

// skeleton
import SkeletonBookmarkFolder from "../Skeleton_UI/SkeletonBookmarkFolder";

// Icon
import { ReactComponent as QuestionMarkIcon } from '../../../static/assets/GlobalIcon/QuestionMark.svg'
import SnackBarStore from "../../Store/SnackBarStore";

function Bookmark() {
    const apiClient = useAxios();
    const {showSnackBar} = SnackBarStore();
    // user identification
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handelPageAuthority = () => {
        if (!user) {
            navigate('/login');
        }
    };

    // set current bookmark page
    
    const currentPage = useRef(1);
    const maxPage = useRef(1);
    const observerRef = useRef();

    // article bookmark folder api
    const [articleBookmarkFolder, setArticleBookmarkFolder] = useState([]);
    const [articleBookmarkFolderLoading, setArticleBookmarkFolderLoading] = useState(true);
    const fetchArticleBookmarkFolder = async (page) => {
        setArticleBookmarkFolderLoading(true);
        if (user) {
            try {
                const response = await apiClient.get(`/user_bookmark_folder/?page=${page}`);
                var data = response.data;
                if (response.status === 200) {
                    setArticleBookmarkFolder((preState) => [...preState, ...data.folders]);
                    currentPage.current = Number(data.current_page);
                    maxPage.current = Number(data.max_page);
                }
            } catch(error) {
                if (error.response.status !== 401) {
                    showSnackBar('북마크 폴더를 가져오던 중 문제가 발생했습니다', 'error')
                }
            } finally {
                setArticleBookmarkFolderLoading(false);
            }        
        }
    };
    
    useEffect(() => {
        handelPageAuthority();
        fetchArticleBookmarkFolder(1);
    }, []);


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && currentPage.current < maxPage.current && !articleBookmarkFolderLoading) {
                    fetchArticleBookmarkFolder(currentPage.current + 1);
                }
            },
            { threshold: 1 }
        );

        if (observerRef.current) {
            if (!articleBookmarkFolderLoading) {
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
        
    }, [currentPage.current, maxPage.current, articleBookmarkFolderLoading]);
    


    
    return (
        <>
            <SituationalNavM page={'북마크'} borderOption={true}/>
            <div className="bookmark_base_cover">
                <div className="bookmark_base_main_header_frame Pre_KR_SemiBold">{user && user.username}의 북마크</div>
                <div className="community_bookmark_folder_wrap_frame">
                    {articleBookmarkFolder.length !== 0 ? (
                        articleBookmarkFolder.map((folder, index ) => (
                            <Link key={index} className="community_bookmark_folder_frame" to={`/bookmark_community/${folder.id}/`}>
                                <div className="community_bookmark_folder_cover_image">
                                    {folder.folder_image ? (
                                        <img src={folder.folder_image}></img>
                                    ) : (
                                        <QuestionMarkIcon style={{width: '40px', height: '40px'}}/>
                                    )}
                                </div>
                                <div className="community_bookmark_folder_information_frame">
                                    <div className="community_bookmark_folder_title_frame Pre_KR_Medium">{folder.folder_name}</div>
                                    <div className="community_bookmark_folder_sub_title_frame Pre_KR_Normal">{folder.bookmark_count}개 북마크</div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        !articleBookmarkFolderLoading && (
                            <BookmarkNone page={'home'} link={'community'}/>
                        )
                    )}
                    {articleBookmarkFolderLoading && (
                        <SkeletonBookmarkFolder count={5}/>
                    )}
                    <div style={{height: '10px'}} ref={observerRef}/>
                </div>
            </div>
        </>
    );
};

export default Bookmark