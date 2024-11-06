import React, { useContext, useEffect, useRef, useState } from "react";
import '../../../../static/css/Community/Community_Global/Bookmark/Community_Bookmark.css'
import useAxios from "../../../../axiosAPIClient";
import AuthContext from "../../../../context/AuthContext";
import CommunityBookmarkFolderAdd from "./Community_Bookmark_Folder_add";
import LoadingCircle from "../../../Global/LoadingCircle";

// icon
import { ReactComponent as PlusIcon } from '../../../../static/assets/GlobalIcon/Add_Plus.svg'
import { ReactComponent as CloseIcon } from '../../../../static/assets/GlobalIcon/Close_MD.svg'
import { ReactComponent as CheckBoxUnchecked } from '../../../../static/assets/GlobalIcon/Checkbox_Unchecked.svg'
import { ReactComponent as CheckBoxChecked } from '../../../../static/assets/GlobalIcon/Checkbox_Check.svg'
import { ReactComponent as QuestionMarkIcon } from '../../../../static/assets/GlobalIcon/QuestionMark.svg'
import SnackBarStore from "../../../Store/SnackBarStore";


function CommunityBookmark({style, style_control, article_id, setBookmarkStatus}) {
    // let test

    const { user } = useContext(AuthContext);
    const { showSnackBar } = SnackBarStore();
    const apiClient = useAxios();
    // bookmark folder get

    const [folderLoading, setFolderLoading] = useState(true);
    const [userBookmarkFolders, setUserBookmarkFolders] = useState([]);  
    const currentPage = useRef(1);
    const maxPage = useRef(1);

    const observerRef = useRef();


    const fetchUserBookmarkFolders = async (page) => {
        if (user) {
            setFolderLoading(true);
            try {
                const response = await apiClient.get(`/user_bookmark_folder/?page=${page}`);
                const data = response.data;
                if (response.status === 200) {
                    setUserBookmarkFolders((preState) => [...preState, ...data.folders]);
                    currentPage.current = Number(data.current_page);
                    maxPage.current = Number(data.max_page);
                }
            } catch (error) {
                if (error.response.status !== 401) {
                    showSnackBar('폴더를 불러오던 중 문제가 발생했습니다', 'error')
                }
            } finally {
                setFolderLoading(false);
            }
        }
    };

    function liveFolderAddUpdate(folder_id, folder_name) {
        const newFolderData = {
            'id': folder_id,
            'folder_name': folder_name,
            'bookmarks': [],
            'bookmark_count': 0
        }
        setUserBookmarkFolders(preState => [newFolderData, ...preState]);
    }


    useEffect(() => {
        if (style) {
            fetchUserBookmarkFolders(1);
        } else {
            setUserBookmarkFolders([]);
            currentPage.current = 1;
            maxPage.current = 1;
        }
    }, [style]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && currentPage.current < maxPage.current && !folderLoading) {
                    fetchUserBookmarkFolders(currentPage.current + 1);
                }
            },
            { threshold: 1 }
        );

        if (observerRef.current) {
            if (!folderLoading) {
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
        

    }, [currentPage.current, maxPage.current, folderLoading]);


    const handleUserBookmarking = async (folder_id) => {
        if (user) {
            try {
                const response = await apiClient.post(`/bookmark_add_delete/${article_id}/${folder_id}/${user.id}/`);
                if (response.status === 200) {
                    const updatedFolders = userBookmarkFolders.map(folder => {
                        if (folder.id === folder_id) {
                            const isBookmarked = folder.bookmarks.includes(article_id);

                            if (isBookmarked) {
                                // Remove the bookmark
                                return {
                                    ...folder,
                                    bookmarks: folder.bookmarks.filter(id => id !== article_id),
                                    bookmark_count: String(Number(folder.bookmark_count.replace(/,/g, '')) - 1) // Increase count
                                };
                            } else {
                                // Add the bookmark
                                return {
                                    ...folder,
                                    bookmarks: [...folder.bookmarks, article_id],
                                    bookmark_count: String(Number(folder.bookmark_count.replace(/,/g, '')) + 1) // Increase count
                                };
                            }
                        }
                        return folder; // Return unchanged folder
                    });

                    setUserBookmarkFolders(updatedFolders);
                    
                    const isBookmarked = isArticleBookmarkedInAnyFolder(updatedFolders);
                    setBookmarkStatus(isBookmarked);
                }
            } catch (error) {
                if (error.response.status !== 401) {
                    showSnackBar('북마크 업로드 중 문제가 발생했습니다', 'error')
                }
            } 
        }       
    };

    const isArticleBookmarkedInAnyFolder = (folders) => {
        return folders.some(folder => folder.bookmarks.includes(article_id));
    };
    

    // folder add control
    const [bookmarkFolderAddBoolean, setBookmarkFolderAddBoolean] = useState(false);

    return (
        <>
            <CommunityBookmarkFolderAdd 
                display_style={bookmarkFolderAddBoolean} 
                onClose={setBookmarkFolderAddBoolean} 
                folderLiveUpdate={liveFolderAddUpdate}
            />
            <div className={`g_community_bookmark_main_frame ${style ? 'open' : null}`}>
                <div className={`g_community_bookmark_frame ${style ? 'open' : null}`}>
                    <div className="g_community_bookmark_header">
                        <span className="Pre_KR_SemiBold">내 북마크</span>
                        <CloseIcon 
                            className="g_community_bookmark_close_icon" 
                            style={{stroke: '#1A1A1B'}}
                            onClick={() => style_control(false)}
                        />
                    </div>
                    <div className="g_community_bookmark_folder_add" onClick={() => setBookmarkFolderAddBoolean(true)}>
                        <PlusIcon style={{ width:'20px', height:'20px', marginBottom: '1px', stroke: '#616161' }}/>
                        <span className="Pre_KR_Medium">새 폴더 추가</span>
                    </div>
                    <div className="g_community_folder_wrap_frame">
                        {userBookmarkFolders.length !== 0 ? (
                            userBookmarkFolders.map((folder, index)  => (
                                <div key={index} className="g_community_folder_frame" onClick={() => handleUserBookmarking(folder.id)}>
                                    <div className="g_community_folder_cover_image">
                                        {folder.folder_image ? (
                                            <img src={folder.folder_image}></img>

                                        ) : (
                                            <QuestionMarkIcon style={{ width:'28px', height:'28px' }}/>
                                        )}
                                    </div>
                                    <div className="g_colum g_gap_8" style={{marginLeft: '16px'}}>
                                        <div className="g_font_15 g_text_color_1 Pre_KR_Medium">
                                            { folder.folder_name }
                                        </div>
                                        <span className="g_font_14 g_text_color_2 Pre_KR_Normal">컨텐츠 {folder.bookmark_count}</span>
                                    </div>
                                    <div className="g_community_bookmark_indicator">
                                        {folder.bookmarks.indexOf(article_id) !== -1 ? (
                                            <CheckBoxChecked style={{ width:'28px', height:'28px' }}/>
                                        ) : (
                                            
                                            <CheckBoxUnchecked style={{ width:'28px', height:'28px' }}/>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            !folderLoading && (
                                <span className="g_community_bookmark_none_text Pre_KR_Medium" >폴더가 없습니다</span>
                            )
                        )}
                    
                        {folderLoading && (
                            <LoadingCircle color_option={true} size_option={true}/>
                        )}
                        <div style={{height: '10px'}} ref={observerRef}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommunityBookmark