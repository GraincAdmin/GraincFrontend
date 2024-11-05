import React, { useState, useContext, useEffect, useRef } from "react";
import '../../static/css/Community/Community_Article_Upload.css'
import AuthContext from "../../context/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// icons
import {ReactComponent as Close_LG} from '../../static/assets/GlobalIcon/Close_LG.svg'
import {ReactComponent as TrashIcon} from '../../static/assets/GlobalIcon/Trash_Full.svg'
import {ReactComponent as Close_MD} from '../../static/assets/GlobalIcon/Close_MD.svg'
// nav
import {ReactComponent as CompanyLogo} from '../../static/assets/CompanyLogo/NavLogoLight.svg'
// terms and regulations
import {ReactComponent as WarningIcon} from '../../static/assets/GlobalIcon/Warning/Triangle_Warning.svg'
import {ReactComponent as ChevronUpIcon} from '../../static/assets/GlobalIcon/Chevron_Up.svg'
import {ReactComponent as CaretDownIcon} from '../../static/assets/GlobalIcon/Caret_Down_MD.svg'
import {ReactComponent as MembershipIcon} from '../../static/assets/GlobalIcon/MembershipContentIcon.svg'
import {ReactComponent as GlobalIcon} from '../../static/assets/GlobalIcon/Globe.svg'

// editor
import {ReactComponent as BoldIcon} from '../../static/assets/EditorIcon/Bold.svg'
import {ReactComponent as ListOrderedIcon} from '../../static/assets/EditorIcon/List_Ordered.svg'
import {ReactComponent as DoubleQuotesIcon} from '../../static/assets/EditorIcon/Double_Quotes_L.svg'
import {ReactComponent as ImageIcon} from '../../static/assets/EditorIcon/Image_01.svg'

//Quill Editor
import ReactQuill, { Quill } from 'react-quill';
import '../../static/css/Global/Quill.css'
import 'react-quill/dist/quill.snow.css';

// Import quill-image-resize-module and quill-image-drop-module
import imageCompression from 'browser-image-compression';
import { ImageDrop } from 'quill-image-drop-module';
import useAxios from "../../axiosAPIClient";
import LoadingCircle from "../Global/LoadingCircle";
import violationNoticeStore from "../Store/ViolationNotice";
import SnackBarStore from "../Store/SnackBarStore";

// Register the modules with Quill
Quill.register('modules/imageDrop', ImageDrop);


const modules = {
    toolbar: [
        [{ size: [] }, { 'font': [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image', 'video'],
    ],
    clipboard: {
        matchVisual: false,
    },
    imageDrop: true,
};



function CommunityArticleUpload() {
    // quill custom toolbar
    const quillRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState(0); // Store the cursor position
    const handleEditorClick = () => {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        if (range) {
            setCursorPosition(range.index); // Update cursor position
        }
    };

    const adjustEditorHeight = () => {
        const quill = quillRef.current.getEditor();
        if (quill) {
            // Get the current content length
            const contentLength = quill.getLength();

            // Get the current selection
            const selection = quill.getSelection();

            // Check if the user is at the end of the content
            if (selection && selection.index === contentLength - 1) {
               window.scrollTo(0, document.body.scrollHeight);
            }
        }
    };


    const apiClient = useAxios();
    const { showSnackBar } = SnackBarStore();

    const [uploadLoading, setUploadLoading] = useState(false);

    const {upload_type} = useParams();
    const [uploadType, setUploadType] = useState(upload_type);

    useEffect(() => {
        setUploadType(upload_type);
    }, [upload_type])

    //user 
    const { user } = useContext(AuthContext);
    const authenticatedUser = user ? user.user_id : "unAuthenticated";
    const navigate = useNavigate();
    function authentication_check() {
        if (authenticatedUser === "unAuthenticated") {
            navigate('/login');
        }
    }
    
    // User Community Violation Check 

    const { setViolationNotice, setViolationType, setViolationDetail, setPrePageOption } = violationNoticeStore();

    const checkUserCommunityViolation = async () => {
        try {
            const response = await apiClient.get(`/article_upload/`);
            const data = response.data;
            setViolationNotice(data.restriction);
            setViolationDetail(data.violation_detail);
            setViolationType('article_upload');
            setPrePageOption(true);            
            setIsUserMembership(data.is_membership);
        } catch(error) {
            if (error.response.status !== 401) {
                showSnackBar('에디터를 불러오던 중 문제가 발생했습니다.', 'error')
            }
        }
    }


    useEffect(() => {
        checkUserCommunityViolation();
        authentication_check();
    }, []);

    
    // community terms and regulation
    const [termsAndRegulationStyle, setTermsAndRegulationStyle] = useState(true);


    // subject
    const [articleSubject, setArticleSubject] = useState(null);
    const updateArticleSubject = (e) => {
        const subject = e.target.value;
        setArticleSubject(subject)
        if (subject) {
            setSubjectError(false)
        }
    };

    const [hashTags, setHashTags] = useState([]);
    const [hashTagInput, setHashTagInput] = useState('');

    function renderRegisteredHashTags() {
        let list = [];
        
        hashTags.forEach(tag => {
            list.push( <div className="community_article_hashtag_input_frame ">
                <span className="g_font_15 g_text_color_1">{tag}</span>
                <Close_MD
                    onClick={() => deleteRegisteredHashTag(tag)}
                    style={{width: '20px', height: '20px', cursor: 'pointer', stroke: '#1A1A1B'}}
                />
            </div>
            )
        });
        return list
    }

    function registerHashTag(tag) {
        if (tag.length !== 0) {
            setHashTags(preState => [tag, ...preState]);
            setHashTagInput('');
        }
    }

    function handleHashTagKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission or unintended behavior
            registerHashTag(hashTagInput.trim());
        }
    }

    function deleteRegisteredHashTag(tag) {
        setHashTags(preState => preState.filter(t => t !== tag));
    }
    


    // article upload settings 

    const [uploadSettingStyle, setUploadArticleSettingStyle] = useState(false);

    const handleClickOutsideSettingUI = (event) => {
        let clickInsideUI = false;
        const articleSetting = document.querySelector('.article_upload_option_frame');
        const articleSettingOpener = document.getElementById('articleSettingButton');

        if (articleSetting !== null && articleSettingOpener !== null) {
            if (articleSetting.contains(event.target) || articleSettingOpener.contains(event.target)) {
                clickInsideUI = true;
            } else {
                clickInsideUI = false;
            }
        }
        if (!clickInsideUI) {
            setUploadArticleSettingStyle(false);
        }
    }
    document.addEventListener('click', handleClickOutsideSettingUI)

    // content_type
    const [contentType, setContentType] = useState();
    const [isUserMembership, setIsUserMembership] = useState(false);

    //main_category
    const main_category_group = ['국내기업', '해외기업', '부동산', '비트코인', '투자전략', '시장', '산업', '경제', '채권', '파생']
    const [mainCategoryDropdownStyle, setMainCategoryDropdownStyle] = useState(false)
    function mainCategoryOpenClose() {
        if (mainCategoryDropdownStyle) {
            setMainCategoryDropdownStyle(false)
        } else {
            if (subCategoryDropdownStyle) {
                setSubCategoryDropdownStyle(false)
            }
            setMainCategoryDropdownStyle(true)
        }
    }
    const [mainCategory, setMainCategory] = useState(null)

    function handelSelectMainCategory(category) {
        setMainCategory(category)
        setMainCategoryDropdownStyle(false)
        if (category) {
            setCategoryError(false)
        }
    };

    const renderMainCategoryDropdown = () => {
        const dropdowns = []
        main_category_group.forEach(category => {
            dropdowns.push (
                <div className={`community_article_dropdown Pre_KR_Normal ${mainCategory === category ? 'selected' : null}`}
                onClick={() => handelSelectMainCategory(category)}>{category}</div>
            )
        });

        return dropdowns
    };

    //sub_category
    const sub_category_group = ['분석', '이슈', '정보', '스터디', '질문', '자유게시판']
    const [subCategoryDropdownStyle, setSubCategoryDropdownStyle] = useState(false)
    function subCategoryOpenClose() {
        if (subCategoryDropdownStyle) {
            setSubCategoryDropdownStyle(false)
        } else {
            if (mainCategoryDropdownStyle) {
                setMainCategoryDropdownStyle(false)
            }
            setSubCategoryDropdownStyle(true)
        }
    }
    const [subCategory, setSubCategory] = useState(null)

    function handelSelectSubCategory(category) {
        setSubCategory(category)
        setSubCategoryDropdownStyle(false)
        if (category) {
            setSubCategoryError(false)
        }
    };

    const renderSubCategoryDropdown = () => {
        const dropdowns = []
        sub_category_group.forEach(category => {
            dropdowns.push (
                <div className={`community_article_dropdown Pre_KR_Normal ${subCategory === category ? 'selected' : null}`}
                onClick={() => handelSelectSubCategory(category)}>{category}</div>
            )
        });

        return dropdowns
    };

    //monitor clicking outside dropdown

    const handelClickOutSideDropdown = (event) => {
        let clickedInsideDropdown = false
        const dropdownOpener = document.querySelectorAll('.community_article_dropdown_opener');

        dropdownOpener.forEach(opener => {
            if (opener.contains(event.target)) {
                clickedInsideDropdown = true;
            };
        });

        if (!clickedInsideDropdown) {
            setMainCategoryDropdownStyle(false);
            setSubCategoryDropdownStyle(false);
        }
    };
    document.addEventListener('click', handelClickOutSideDropdown)

    //Main_Content
    const [mainContent, setMainContent] = useState('');
    // Update handler for ReactQuill content
    const handleMainContentUpdate = (content) => {
        setMainContent(content);
        handleEditorClick();
        adjustEditorHeight();
        if (content) {
            setMainContentError(false);
        }
    };


    //Community Article Submit

    const articleUpload = async () => {
        setUploadLoading(true);
        try {
            // Create the base payload object
            const payload = {
                subject: articleSubject,
                category: mainCategory,
                sub_category: subCategory,
                hashtags: hashTags,
                main_content: mainContent,
                upload_type: uploadType,
                content_type: contentType,
                ...(uploadType === 'modification' && { article_id: articleId }) // Conditionally include article_id
            };
    
            // Send the POST request
            const response = await apiClient.post(`/article_upload/`, payload);

            if (response.status === 200) {
                var article_id = response.data.article_id
                // Navigate after successful upload
                if (uploadType === 'new') {
                    navigate(`/community_detail/${article_id}`);
                } else if (uploadType === 'modification') {
                    navigate(`/community_detail/${articleId}`);
                } else if (uploadType === 'save') {
                    savedArticleLiveUpdate(article_id);
                }
            }
        } catch (error) {
            if (error.response.status !== 401) {
                showSnackBar('글을 업로드 중 문제가 발생했습니다', 'error')
            }
        } finally {
            setUploadLoading(false);
        }
    };

    const [errorMessage, setErrorMessage] = useState(null)
    const [subjectError, setSubjectError] = useState(false)
    const [categoryError, setCategoryError] = useState(false)
    const [subCategoryError, setSubCategoryError] = useState(false)
    const [mainContentError, setMainContentError] = useState(false)

    const checkCommunityArticleError = async () => {
  
        let hasError = false;

        if (!mainCategory) {
            setErrorMessage('카터고리를 선택해주세요')
            setCategoryError(true)
            hasError = true;
        }
        if (!subCategory) {
            setErrorMessage('하위 카터고리를 선택해주세요')
            setSubCategoryError(true)
            hasError = true;
        }
        if (!articleSubject) {
            setErrorMessage('제목을 입력해주세요')
            setSubjectError(true)
            hasError = true;
        }
        if (!mainContent) {
            setErrorMessage('작성글을 입력해주세요')
            setMainContentError(true)
            hasError = true;
        }

        return hasError;
    };

    const checkArticleSaveError = async () => {
        let hasError = false;

        if (!articleSubject) {
            setErrorMessage('제목을 입력해주세요')
            setSubjectError(true)
            hasError = true;
        }

        if (!mainContent) {
            setErrorMessage('작성글을 입력해주세요')
            setMainContentError(true)
            hasError = true;
        }

        return hasError;
    }

    const handleCommunityArticleSubmit = async () => {
        const hasErrors = await checkCommunityArticleError();
        if (!hasErrors) {
            articleUpload();
        }
    };


    // Handle Article Modification

    const location = useLocation();
    const { articleId } = location.state || {}; // Provide a default empty object in case state is undefined


    const fetchModificationArticleData = async () => {
        try {
            const response = await apiClient.get(`/get_article_modification_data/${articleId}/`)
            const data = response.data
            setArticleSubject(data.subject)
            setMainCategory(data.category)
            setSubCategory(data.sub_category)
            setMainContent(data.main_content)
        } catch(error) {
            if (error.response.status !== 401) {
                showSnackBar('임시저장 글을 불러오던 중 문제가 발생했습니다', 'error')
            }
        }
    }

    useEffect(() => {
        if (uploadType === 'modification') {
            fetchModificationArticleData();
        }
    }, []);


    // Handle Article Save and load Saved Article

    const [savedArticles, setSavedArticles] = useState([]);

    const fetchUserSavedArticleStatus = async () => {
        try {
            const response = await apiClient.get('/get_user_saved_article/');
            const data = response.data;
            setSavedArticles(data.saved_articles);
        } catch(error) {
            if (error.response.status !== 401) {
                showSnackBar('임시저장 중 문제가 발생했습니다', 'error')
            }
        }
    }

    const [savedArticleStyle, setSavedArticleStyle] = useState(false);

    const handleArticleSave = async () => {
        setUploadType('save');
        const hasErrors = await checkArticleSaveError();
        if (!hasErrors && uploadType === 'save') {
            articleUpload();
        }
    }

    const savedArticleLiveUpdate = (article_id) => {
        const saved_article_data = {
            'subject': articleSubject,
            'formatted_date': '방금 전',
            'id': article_id
        };
        console.log(article_id);
        setSavedArticles((prevArticles) => [saved_article_data, ...prevArticles]);
    }

    const fetchUserSavedArticleLoad = async (article_id) => {
        if (article_id) {
            try {
                const response = await apiClient.get(`/load_user_saved_article/${article_id}`)
                const data = response.data
                setArticleSubject(data.subject)
                setMainCategory(data.category)
                setSubCategory(data.sub_category)
                setMainContent(data.main_content)
                setSavedArticleStyle(false)
            } catch(error) {
                if (error.response.status !== 401) {
                    showSnackBar('임시저장 글을 불러오던 중 문제가 발생했습니다', 'error')
                }
            }
        }
    }

    const [deletingSavedArticle, setDeletingSavedArticle] = useState(null);

    const fetchDeleteUserSavedArticle = async () => {
        if (deletingSavedArticle) {
            try {
                const response = await apiClient.post(`/delete_user_saved_article/${deletingSavedArticle}/`)
                handleSavedArticleDeleteConfirm(null);
                savedArticleDeleteLiveUpdate(deletingSavedArticle);
            } catch(error) {
                if (error.response.status !== 401) {
                    showSnackBar('임시저장 글을 삭제 중 문제가 발생했습니다', 'error')
                }
            }
        }
    }

    // Live update the savedArticles list after deletion without API call
    const savedArticleDeleteLiveUpdate = (article_id) => {
        // Filter the savedArticles to remove the deleted article by id
        const updatedSavedArticles = savedArticles.filter(article => article.id !== article_id);
        
        // Update the state with the new list
        setSavedArticles(updatedSavedArticles);
    };


    const [savedArticleDeleteConfirmStyle, setSavedArticleDeleteConfirmStyle] = useState(false);

    const handleSavedArticleDeleteConfirm = (article_id) => {
        if (savedArticleDeleteConfirmStyle) {
            setSavedArticleDeleteConfirmStyle(false);
            setDeletingSavedArticle(null);
        } else {
            setSavedArticleDeleteConfirmStyle(true);
            setDeletingSavedArticle(article_id);
        }
    };


    useEffect(() => {
        if (savedArticleStyle) {
            fetchUserSavedArticleStatus();
        }
    }, [savedArticleStyle]);


    // Custom Toolbar function

    const insertImage = async () => {
        const quill = quillRef.current.getEditor();

        if (quill) {
            // Create a hidden input element
            const imageInput = document.createElement('input');
            imageInput.type = 'file';
            imageInput.accept = 'image/*'; // Accept image files only

            imageInput.addEventListener('change', async (event) => {
                const file = event.target.files[0]; // Get the selected file
    
                if (file) {
                    const options = {
                        maxSizeMB: 3, // Maximum size in MB
                        maxWidthOrHeight: 1024, // Maximum width or height
                        useWebWorker: true, // Use web worker for better performance
                    };

                    const compressedFile = await imageCompression(file, options);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const imageUrl = reader.result; // This will be the base64 URL of the image
                        quill.insertEmbed(cursorPosition, 'image', imageUrl); // Use stored cursor position
                        quill.setSelection(cursorPosition + 1); // Move cursor after the inserted image
                    };
                    reader.readAsDataURL(compressedFile); // Read the file as a data URL
                }
            });

            imageInput.click();
        } else {
            console.error("Quill instance is not initialized.");
        }
    };

    const insertBold = () => {
        const quill = quillRef.current?.getEditor();
    
        if (quill) { // Ensure quill is not null or undefined
            const currentFormat = quill.getFormat();
            quill.format('bold', !currentFormat.bold);
        } else {
            console.error("Quill instance is not initialized.");
        }
    };

    const insertList = () => {
        const quill = quillRef.current?.getEditor();
    
        if (quill) { // Ensure quill is not null or undefined
            const currentFormat = quill.getFormat();
            // Toggle the list format based on the provided listType ('ordered' or 'bullet')
            if (currentFormat.list) {
                // If a list is already active, remove it
                quill.format('list', false);
            } else {
                // If no list is active, apply the requested list type
                quill.format('list', 'ordered');
            }
        } else {
            console.error("Quill instance is not initialized.");
        }
    };

    const insertBlockQuote = () => {
        const quill = quillRef.current?.getEditor();
    
        if (quill) { // Ensure quill is not null or undefined
            const currentFormat = quill.getFormat();
    
            // Toggle the block quote format
            if (currentFormat.blockquote) {
                // If a block quote is already active, remove it
                quill.format('blockquote', false);
            } else {
                // If no block quote is active, apply it
                quill.format('blockquote', true);
            }
        } else {
            console.error("Quill instance is not initialized.");
        }
    };
    

    return (
        <>  
            <div className={`saved_article_delete_confirm_main_frame
                ${savedArticleDeleteConfirmStyle ? 'open' : null}`}>
                <div className="saved_article_delete_confirm_frame">
                    <span className="saved_article_delete_title_text Pre_KR_Medium">정말 삭제 하시겠습니까?</span>
                    <span className="saved_article_delete_sub_title_text Pre_KR_Normal">삭제시 임시저장한 커뮤니티글이 삭제 됩니다</span>
                    <div className="saved_article_delete_decision_button_frame">
                        <div className="saved_article_delete_cancel_button Pre_KR_Normal" onClick={() => handleSavedArticleDeleteConfirm(null)}>취소</div>
                        <div className="saved_article_delete_button Pre_KR_Normal" onClick={() => fetchDeleteUserSavedArticle()}>삭제하기</div>
                    </div>
                </div>
            </div>
            <div className={`saved_articles_cover_frame ${savedArticleStyle ? 'open' : null}`}>
                <div className="saved_articles_main_frame">
                    <div className="saved_articles_title_frame Pre_KR_Regular">
                        임시저장 불러오기
                        <div className="saved_articles_close_button" onClick={() => setSavedArticleStyle(false)}>
                            <Close_LG style={{width: '20px', height: '20px'}}/>
                        </div>
                    </div>
                    <div className="saved_articles_holder_frame">
                        {savedArticles.length !== 0 ? (
                            savedArticles.map((article, index) => (
                                <div key={index} className="saved_articles_frame saved_article_delete_{{ saved_articles.id }}">
                                    <div className="saved_articles_information_frame" 
                                        onClick={() => fetchUserSavedArticleLoad(article.id)}
                                        style={{cursor:'pointer'}}
                                    >
                                        <div className="saved_articles_title_text Pre_KR_Normal">{ article.subject }</div>
                                        <span className="saved_articles_saved_date_text Pre_KR_Normal">{ article.formatted_date }</span>
                                    </div>
                                    <div className="saved_articles_delete_button" onClick={() => handleSavedArticleDeleteConfirm(article.id)}>
                                        <TrashIcon style={{stroke: '#e1e1e1'}}/>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="saved_articles_frame" style={{justifyContent:'center', borderBottom:'0px'}}>
                                <a className="saved_articles_information_frame" style={{padding:'0px'}}>
                                    <div className="saved_articles_title_text Pre_KR_Normal" style={{textAlign:'center'}}>저장된 글이 없습니다</div>
                                </a>
                            </div>
                        )}
                    </div>
                    <div 
                        className="current_article_save_button Pre_KR_Medium" 
                        onClick={!uploadLoading ? () => handleArticleSave() : null}
                    >
                        {uploadLoading ? 
                            <LoadingCircle color_option={true} /> :
                            '작성글 저장'
                        }
                    </div>
                </div>
            </div>
            <div className="community_article_upload_nav">
                <div className="community_article_upload_nav_main">
                    <CompanyLogo />
                    <div className="article_upload_nav_wrapper nav_toolbar" id="toolbar" style={{gap: '8px'}}>
                        <div className="article_upload_toolbar_button" onClick={() => insertImage()}>
                            <ImageIcon />
                        </div>
                        <div className="article_upload_toolbar_button ql-bold" onClick={() => insertBold()}>
                            <BoldIcon />
                        </div>
                        <div className="article_upload_toolbar_button ql-list" onClick={() => insertList()}>
                            <ListOrderedIcon />
                        </div>
                        <div className="article_upload_toolbar_button" onClick={() => insertBlockQuote()}>
                            <DoubleQuotesIcon />
                        </div>
                    </div>
                    <div className="article_upload_nav_wrapper" style={{gap: '16px'}}>
                        <div className="article_upload_button Pre_KR_Medium saved" onClick={() => setSavedArticleStyle(true)}>임시저장</div>
                        <div 
                            className="article_upload_button Pre_KR_Medium upload"
                            id="articleSettingButton"
                            onClick={() => setUploadArticleSettingStyle(!uploadSettingStyle)}
                            >
                            작성완료
                        </div>
                        <div className={`article_upload_option_frame ${uploadSettingStyle ? 'open' : ''}`}>
                            <div className="g_row g_justify_space_between g_align_center">
                                <span className="article_upload_option_title Pre_KR_SemiBold">업로드 설정</span>
                                <div className="" onClick={() => setUploadArticleSettingStyle(!uploadSettingStyle)}>
                                    <Close_MD style={{stroke: '#1A1A1B'}}/>
                                </div>
                            </div>
                            <div className="article_upload_content_type_frame">
                                <span className="Pre_KR_Medium">컨텐츠 종류 선택</span>
                                <div className="article_upload_type_button_wrapper">
                                    <div 
                                        className={`
                                            article_upload_content_type_button 
                                            ${contentType === 'community' ? 'selected' : ''}
                                            Pre_KR_Medium
                                        `}
                                        onClick={() => {
                                            setContentType('community');
                                        }}
                                    >
                                        <GlobalIcon style={{width: '24px', height: '24px', stroke: `${contentType === 'community' ? '#fff' : '#1A1A1B'}`}} />
                                        커뮤니티
                                    </div>
                                    <div 
                                        className={`
                                            article_upload_content_type_button 
                                            ${contentType === 'membership' ? 'selected' : ''}
                                            Pre_KR_Medium
                                        `}
                                        style={{ background: !isUserMembership ? '#fafafa' : null }}
                                        onClick={() => isUserMembership ? setContentType('membership') : null}
                                    >
                                        <MembershipIcon style={{width: '22px', height: '22px'}}/>
                                        맴버십
                                    </div>
                                </div>
                            </div>
                            <div className={`community_article_dropdown_opener 
                            ${categoryError ? 'error' : null}
                            ${mainCategoryDropdownStyle ? 'selecting' : null}
                            `} onClick={mainCategoryOpenClose}>
                                <span className="community_article_dropdown_indicator Pre_KR_Medium">{mainCategory ? mainCategory : '카테고리를 선택해주세요'}</span>
                                <div style={{display: 'flex', marginRight: '8px'}}>
                                    <CaretDownIcon />
                                </div>
                                <div className={`community_article_dropdown_frame ${mainCategoryDropdownStyle ? 'open' : null}`}>
                                    {renderMainCategoryDropdown()}
                                </div>
                            </div>
                            <div className={`community_article_dropdown_opener 
                            ${subCategoryError ? 'error' : null}
                            ${subCategoryDropdownStyle ? 'selecting' : null}
                            `} onClick={subCategoryOpenClose}
                            style={{marginTop: '16px'}}>
                                <span className="community_article_dropdown_indicator Pre_KR_Medium">{subCategory ? subCategory : '하위 카테고리를 선택해주세요'}</span>
                                <div style={{display: 'flex', marginRight: '8px'}}>
                                    <CaretDownIcon />
                                </div>
                                <div className={`community_article_dropdown_frame ${subCategoryDropdownStyle ? 'open' : null}`}>
                                    {renderSubCategoryDropdown()}
                                </div>
                            </div>
                            <div className="community_article_upload_button Pre_KR_Medium" onClick={!uploadLoading ? () => handleCommunityArticleSubmit() : null}>
                                {uploadLoading ? (
                                    <LoadingCircle />
                                ) : (
                                    '업로드 하기'
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form className="community_article_form" method="post" enctype="multipart/form-data">
                <div className="community_terms_and_regulation_frame">
                    <div className="community_t_and_r_title_frame">
                        <WarningIcon style={{width: '24', height: '24px'}} />
                        <span className="Pre_KR_Medium" style={{fontSize: '16px', marginLeft: '8px', marginTop: '1px    '}}>커뮤니티 이용시 주의사항</span>
                        <div 
                            className={`community_t_and_r_button ${termsAndRegulationStyle ? 'close' : 'open'}`}
                            onClick={() => setTermsAndRegulationStyle(!termsAndRegulationStyle)}
                        >
                            <ChevronUpIcon style={{width: '24', height: '24px'}} />
                        </div>
                    </div>
                    <div className={`community_t_and_r_content_frame ${termsAndRegulationStyle ? '' : 'close' }`}>
                        <div className="community_t_and_r_content Pre_KR_Regular">
                            · 허가 없는<span style={{color: '#ff0000', marginLeft: '4px'}}> 광고 및 홍보성</span>글 작성시 커뮤니티 이용이 제한 될 수 있습니다
                        </div>
                        <div className="community_t_and_r_content Pre_KR_Regular">
                            · 타인의 권리를 침해하는 콘텐츠, 음란성/기타 법령을 위배하는 콘텐츠는 게시하지 않거나 삭제될 수 있습니다.
                        </div>
                        <div className="community_t_and_r_content Pre_KR_Regular">
                            · 가능한 다른 유저들을 존중하는 높임말 말을 사용해주시길 바랍니다. 
                        </div>
                    </div>
                </div>
                <input className={`community_article_input Pre_KR_Medium  ${subjectError ? 'error' : null}`} 
                    placeholder="제목을 입력해주세요" 
                    name="subject"
                    value={articleSubject}
                    onChange={(e) => updateArticleSubject(e)}>
                </input>
                <div className={`ReactQuillCover ${mainContentError ? 'error' : null}`}>
                    <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        modules={modules}
                        placeholder="커뮤니티글을 작성 해보세요!"
                        value={mainContent}
                        onChange={handleMainContentUpdate}
                        onClick={handleEditorClick} // Update cursor position on click
                        onFocus={handleEditorClick} // Update cursor position when focusing on the editor
                    />
                </div>
                {errorMessage !== null && (
                    <span className="Pre_KR_Normal" style={{color:'#ff0000', fontSize:'14px'}}>{errorMessage}</span>
                )}
                <div className="community_article_hashtag_frame">
                    <div className="community_article_hashtag_input_frame">
                        <span className="g_font_14 g_text_color_1 Pre_KR_Normal">#</span>
                        <input 
                            className="community_article_hashtag_input" 
                            placeholder="태그입력"
                            value={hashTagInput}
                            onChange={(e) => setHashTagInput(e.target.value)}
                            onKeyDown={(e) => handleHashTagKeyDown(e)}
                        ></input>
                    </div>
                    {renderRegisteredHashTags()}
                </div>
            </form>
            <div className="article_upload_toolbar_bottom">
                <div className="article_upload_toolbar_button" onClick={() => insertImage()}>
                    <ImageIcon />
                </div>
                <div className="article_upload_toolbar_button ql-bold" onClick={() => insertBold()}>
                    <BoldIcon />
                </div>
                <div className="article_upload_toolbar_button ql-list" onClick={() => insertList()}>
                    <ListOrderedIcon />
                </div>
                <div className="article_upload_toolbar_button" onClick={() => insertBlockQuote()}>
                    <DoubleQuotesIcon />
                </div>
            </div>
        </>
    );
};

export default CommunityArticleUpload


