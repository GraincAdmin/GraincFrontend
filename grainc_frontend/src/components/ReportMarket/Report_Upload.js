import React, { useContext, useEffect, useState } from "react";
import '../../static/css/ReportMarket/Report_Upload.css'
import useAxios from "../../axiosAPIClient";
import AuthContext from "../../context/AuthContext";
//Quill Editor
import ReactQuill, { Quill } from 'react-quill';
import '../../static/css/Global/Quill.css'
import 'react-quill/dist/quill.snow.css';

// Import quill-image-resize-module and quill-image-drop-module
import { ImageDrop } from 'quill-image-drop-module';
import { useLocation, useNavigate, useParams } from "react-router-dom";

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

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image', 'video'
];


function ReportUpload() {
    const apiClient = useAxios();
    const navigate = useNavigate();
    //user 
    const { user } = useContext(AuthContext);
    const authenticatedUser = user ? user.user_id : "unAuthenticated";
    function authentication_check() {
        if (authenticatedUser === "unAuthenticated") {
            navigate('/login');
        } else if (!user.is_seller) {
            navigate('/mypage?current_page=seller')
        }
    }
    
    useEffect(() => {
        authentication_check();
    }, []);



    const {upload_type} = useParams();
    // Subject Management

    const [reportSubject, setReportSubject] = useState();

    const updateReportSubject = (e) => {
        setReportSubject(e.target.value);
        if (reportSubject) {
            setReportSubjectError(false);
        }
    }

    // Category Management
    const [reportCategory, setReportCategory] = useState();

    useEffect(() => {
        if (reportCategory) {
            setReportCategoryError(false);
        }
    }, [reportCategory]);

    const [categoryDropdownStyle, setCategoryDropdownStyle] = useState(false);

    const handleCategoryDropdownStyle = () => {
        if (categoryDropdownStyle) {
            setCategoryDropdownStyle(false);
        } else {
            setCategoryDropdownStyle(true);
        }
    }

    const categoryList = [
        '국내기업',
        '해외기업',
        '부동산',
        '비트코인',
        '투자전략',
        '산업',
        '시장',
        '경제',
        '채권',
        '파생',
    ]

    const renderCategoryDropdown = () => {
        const dropdowns = []
        categoryList.forEach(category => {
            dropdowns.push (
                <div 
                    className={`report_upload_category_dropdown Pre_KR_Normal
                        ${reportCategory === category ? 'selected' : null}`}
                    onClick={() => setReportCategory(category)}>
                    {category}
                </div>
            )
        })
        return dropdowns
    }

    // Report File Management
    const [reportFile, setReportFile] = useState(null);

    const handleReportFileUpload = () => {
      const reportFileInput = document.getElementById('report_file_input');
      if (reportFileInput) {
        reportFileInput.click();
      }
    };
  
    const updateReportFile = (event) => {
      const file = event.target.files[0];
      if (file) {
        setReportFile(file);
      }
    };

    useEffect(() => {
        if (reportFile) {
            setReportFileError(false)
        }
    }, [reportFile]);

    const handleDeleteReportFile = () => {
        setReportFile(null);
    }


    // Report Price Management
    const [reportPrice, setReportPrice] = useState(null);

    const [formattedPrice, setFormattedPrice] = useState(null);

    const updateReportPrice = (e) => {
        const report_price = e.target.value
        // Remove all non-digit characters
        let pure_price_value = report_price.replace(/[^0-9]/g, '');

        // Convert the sanitized value to an integer
        let numberValue = parseInt(pure_price_value, 10);
        // Check if numberValue is a valid number
        if (!isNaN(numberValue)) {
            // Format the number with commas according to the 'ko-KR' locale
            setFormattedPrice(numberValue.toLocaleString('ko-KR'))
            setReportPrice(pure_price_value)
        } else {
            // If not a valid number, clear the input
            setFormattedPrice('');
            setReportPrice(pure_price_value)
        }
    }

    useEffect(() => {
        if (reportPrice) {
            setReportPriceError(false);
        }
    }, [reportPrice]);

    // Report Description Management
    const [reportDescription, setReportDescription] = useState(null);

    useEffect(() => {
        if(reportDescription) {
            setReportDescriptionError(false);
        }
    }, [reportDescription]);


    // Report Cover Image (Product Image Management)
    const [reportProductImage, setReportProductImage] = useState(null);

    const handleUploadReportProductImage = () => {
        const report_product_image_input = document.getElementById('report_product_image_input');
        report_product_image_input.click()
    }

    const updateReportProductImage = (event) => {
        const report_cover_image = event.target.files[0];
        if (report_cover_image) {
            setReportProductImage(report_cover_image);
        }
    }

    const handleReportCoverImageDelete = () => {
        setReportProductImage(null);
    }

    // Report Preview Image Upload
    const [reportPreviewImage1, setReportPreviewImage1] = useState(null);
    const [reportPreviewImage2, setReportPreviewImage2] = useState(null);
    const [reportPreviewImage3, setReportPreviewImage3] = useState(null);
    const [reportPreviewImage4, setReportPreviewImage4] = useState(null);


    const [selectedPreview, setSelectedPreview] = useState();

    const handleUploadPreview = (preview) => {
        const preview_input = document.getElementById('preview_input');
        setSelectedPreview(preview)
        preview_input.click();
    }

    const updateReportPreview = (event) => {
        const report_preview_image = event.target.files[0];
        if (report_preview_image) {
            if (selectedPreview === 'preview1') {
                setReportPreviewImage1(report_preview_image)
            }
            if (selectedPreview === 'preview2') {
                setReportPreviewImage2(report_preview_image)
            }
            if (selectedPreview === 'preview3') {
                setReportPreviewImage3(report_preview_image)
            }
            if (selectedPreview === 'preview4') {
                setReportPreviewImage4(report_preview_image)
            }
        }
    }

    const handleDeleteReportPreviewImage = (preview) => {
        if (preview === 'preview1') {
            setReportPreviewImage1(null);
        }
        if (preview === 'preview2') {
            setReportPreviewImage2(null);
        }
        if (preview === 'preview3') {
            setReportPreviewImage3(null);
        }
        if (preview === 'preview4') {
            setReportPreviewImage4(null);
        }
    }

    useEffect(() => {
        if(reportPreviewImage1) {
            setReportPreviewError(false);
        }
    }, [reportPreviewImage1]);

    // Report Upload Error Handling
    const [reportUploadError, setReportUploadError] = useState(true);
    const [reportUploadErrorMessage, setReportUploadErrorMessage] = useState('');

    const [reportSubjectError, setReportSubjectError] = useState(null);
    const [reportCategoryError, setReportCategoryError] = useState(null);
    const [reportFileError, setReportFileError] = useState(null);
    const [reportPriceError, setReportPriceError] = useState(null);
    const [reportDescriptionError, setReportDescriptionError] = useState(null);
    const [reportPreviewError, setReportPreviewError] = useState(null);

    const checkReportUploadError = () => {
        if (!reportSubject) {
            setReportSubjectError(true);
            setReportUploadErrorMessage('리포트 제목을 입력해주세요');
        }
        if (!reportFile) {
            setReportFileError(true);
            setReportUploadErrorMessage('리포트 파일을 업로드해주세요 (PDF)');
        }
        if (!reportCategory) {
            setReportCategoryError(true);
            setReportUploadErrorMessage('리포트 카테고리를 선택해주세요');
        };
        if (!reportPrice || reportPrice === '') {
            setReportPriceError(true);
            setReportUploadErrorMessage('리포트 가격을 입력해주세요');
        };
        if (!reportDescription) {
            setReportDescriptionError(true);
            setReportUploadErrorMessage('리포트 설명을 입력해주세요');
        };
        if (!reportPreviewImage1) {
            setReportPreviewError(true);
            setReportUploadErrorMessage('리포트 미리보기를 최소 1개 업로드 해주세요 (미리보기1)');
        };
        if (!reportSubjectError 
            && !reportCategoryError 
            && !reportFileError 
            && !reportPriceError 
            && !reportDescriptionError 
            && !reportPreviewError) {
            setReportUploadError(false);
            setReportUploadErrorMessage('');
        }
    }

    // Handle Report Upload
    
    const handleReportUpload = () => {
        console.log(2)
        checkReportUploadError();
        if (!reportUploadError) {
            if (!reportSubjectError 
                && !reportCategoryError 
                && !reportFileError 
                && !reportPriceError 
                && !reportDescriptionError 
                && !reportPreviewError) {
                    console.log(1)
                    uploadReport();
            }
        }
    }

    const [uploadLoading, setUploadLoading] = useState(false);

    const uploadReport = async () => {
        try {
            setUploadLoading(true);
            const formData = new FormData();
            // Upload type detect
            formData.append('upload_type', upload_type);
            // Modification Data
            formData.append('report_id', reportID);
            // Report Data
            formData.append('subject', reportSubject);
            formData.append('category', reportCategory);
            formData.append('price', reportPrice);
            formData.append('description', reportDescription);
            if (reportFile) formData.append('report_file', reportFile);
            if (reportProductImage) formData.append('product_image', reportProductImage);
            if (reportPreviewImage1) formData.append('preview1', reportPreviewImage1);
            if (reportPreviewImage2) formData.append('preview2', reportPreviewImage2);
            if (reportPreviewImage3) formData.append('preview3', reportPreviewImage3);
            if (reportPreviewImage4) formData.append('preview4', reportPreviewImage4);
    
            const response = await apiClient.post('/report_upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Include CSRF token if required
                }
            });
            if (response.status === 200) {
                setUploadLoading(false);
                if (upload_type === 'new') {
                    navigate('/mypage?current_page=seller');
                } else {
                    navigate(`/report_detail/${reportID}`)
                }
            }
        } catch (error) {
            console.log(error);
            setReportUploadError(true);
            setReportUploadErrorMessage('파일 업로드에 실패했습니다. 다시 시도해 주세요.');
        }
    }

    // Report Modification
    const location = useLocation();
    const { reportID } = location.state || {}; // Provide a default empty object in case state is undefined

    const fetchModifyingReport = async () => {
        try {
            const response = await apiClient.get(`/modifying_report_data/${reportID}/`)
            const data = response.data
            setReportSubject(data.subject)
            setReportCategory(data.report_category)
            setReportFile(data.report_file_name)
            // price
            setFormattedPrice(data.formatted_price)
            setReportPrice(data.formatted_price.replace(/[^0-9]/g, ''))
            // description
            setReportDescription(data.report_description)
            // product image
            setReportProductImage(data.report_product_image_name)
            setReportPreviewImage1(data.preview_1_name)
            setReportPreviewImage2(data.preview_2_name)
            setReportPreviewImage3(data.preview_3_name)
            setReportPreviewImage4(data.preview_4_name)
        } catch(error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        if (reportID) {
            fetchModifyingReport();
        }
    }, [reportID]);

    return (
        <>
            <form className="report_upload_main_cover">
                <span className="report_upload_main_title_text Pre_KR_Normal">리포트 등록</span>
                <div className="report_upload_subject_main_cover">
                    <span className="report_upload_input_title_text Pre_KR_Medium" style={{ width:'86px' }}>리포트 제목</span>
                    <input className={`report_upload_subject_input Pre_KR_Normal ${reportSubjectError ? 'error' : null}`} 
                        name="subject" 
                        placeholder="리포트 제목을 입력해주세요" 
                        value={reportSubject}
                        onChange={(e) => updateReportSubject(e)}
                    />
                </div>
                <div className="report_subject_instructions Pre_KR_Normal">· 수익률, 보장 등 검증이 불가한 내용은 제목으로 사용하실 수 없습니다</div>
                <div className="report_upload_file_category_input_cover">
                    <span className="report_upload_input_title_text Pre_KR_Medium">카테고리 선택</span>
                    <div className="report_category_selection_main_frame">
                        <div className={`report_category_selection_frame main_category_dropdown_opner ${reportCategoryError ? 'error' : null}`}
                            onClick={() => handleCategoryDropdownStyle()}>
                            <span className="report_category_indicator Pre_KR_Normal">
                                {!reportCategory ? (
                                    '카테고리를 선택해주세요'
                                ) : (
                                    `${reportCategory}`
                                )}
                            </span>
                            <div className="report_upload_dropdown_icon">
                                {!categoryDropdownStyle ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <mask id="mask0_1203_3061" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                        <rect width="24" height="24" rx="0.5" fill="#D9D9D9"/>
                                        </mask>
                                        <g mask="url(#mask0_1203_3061)">
                                        <path d="M12.353 14.7016C12.1577 14.8969 11.8412 14.8969 11.6459 14.7016L6.69926 9.75496C6.50399 9.5597 6.50399 9.24312 6.69926 9.04785L7.0459 8.70121C7.24116 8.50595 7.55774 8.50595 7.75301 8.70121L11.6459 12.5941C11.8412 12.7894 12.1577 12.7894 12.353 12.5941L16.2459 8.70121C16.4412 8.50595 16.7577 8.50595 16.953 8.70121L17.2997 9.04785C17.4949 9.24312 17.4949 9.5597 17.2997 9.75496L12.353 14.7016Z" fill="#1C1B1F"/>
                                        </g>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <mask id="mask0_1203_3060" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                        <rect width="24" height="24" rx="0.5" fill="#D9D9D9"/>
                                        </mask>
                                        <g mask="url(#mask0_1203_3060)">
                                        <path d="M12.353 10.8087C12.1577 10.6134 11.8412 10.6134 11.6459 10.8087L7.75301 14.7016C7.55774 14.8969 7.24116 14.8969 7.0459 14.7016L6.69926 14.355C6.50399 14.1597 6.50399 13.8431 6.69926 13.6479L11.6459 8.70121C11.8412 8.50595 12.1577 8.50595 12.353 8.70121L17.2997 13.6479C17.4949 13.8431 17.4949 14.1597 17.2997 14.355L16.953 14.7016C16.7577 14.8969 16.4412 14.8969 16.2459 14.7016L12.353 10.8087Z" fill="#1C1B1F"/>
                                        </g>
                                    </svg>
                                )}
                            </div>
                            <div className={`report_upload_category_dropdown_frame ${categoryDropdownStyle ? 'open': null}`}>
                                {renderCategoryDropdown()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="report_upload_file_category_input_cover" style={{marginTop:'16px'}}>
                    <span className="report_upload_input_title_text Pre_KR_Medium">리포트 파일 (PDF)</span>
                    <div className="report_upload_file_upload_main_frame">
                        <div className={`report_upload_file_upload_frame ${reportFileError ? 'error' : null}`}>
                            <span 
                                className="report_file_upload_indicator Pre_KR_Normal">
                                {!reportFile ? (
                                    '리포트파일은 변경이 불가합니다.'
                                ) : (
                                    upload_type === 'new' ? (
                                        `${reportFile.name}`
                                    ) : (
                                        `${reportFile}`
                                    )
                                )}
                            </span>
                            <input 
                                id="report_file_input" 
                                name="report_file" 
                                type="file" 
                                accept="application/pdf" 
                                onChange={updateReportFile}
                                style={{display:'none'}} 
                            /> 
                            {!reportFile ? (
                                <div className="report_file_input_opener Pre_KR_Normal" onClick={() => handleReportFileUpload()}>파일찾기</div>
                            ) : (
                                <div className="report_file_delete_button" onClick={() => handleDeleteReportFile()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M1.22659 9.8355L0.163086 8.772L3.93609 4.999L0.163086 1.251L1.22659 0.1875L4.99959 3.9605L8.74759 0.1875L9.81109 1.251L6.03809 4.999L9.81109 8.772L8.74759 9.8355L4.99959 6.0625L1.22659 9.8355Z" fill="#0066FF"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* {% if report_modification == True %}
                    <div className="report_subject_instructions Pre_KR_Normal"  style="color: #FF0000;">리포트 파일은 수정이 불가합니다. 잘못된 파일 업로드시 고객센터로 문의해주세요</div>
                {% endif %} */}
                <div className="report_price_input_cover">
                    <span className="report_upload_input_title_text Pre_KR_Medium" style={{width: '105px'}}>가격</span>
                    <div className="price_input_main_cover_frame price_error">
                        <input 
                            className={`price_input Pre_KR_Normal ${reportPriceError ? 'error' : null}`}
                            name="price" 
                            placeholder="리포트가격 입력"
                            value={formattedPrice}
                            onChange={(e) => updateReportPrice(e)}
                        />
                        <div className="price_input_value_frame Pre_KR_Normal">
                            원
                        </div>
                    </div>
                </div>
                <div className="report_description_main_frame">
                    <div className="report_description_title_frame Pre_KR_Medium">리포트설명</div>
                    <div className={`ReactQuillCover ${reportDescriptionError ? 'error' : null}`}>
                        <ReactQuill
                            theme="snow"
                            modules={modules}
                            placeholder="리포트 설명글을 작성 해주세요"
                            value={reportDescription}
                            onChange={setReportDescription}
                        />
                    </div>
                </div>
                <div className="report_upload_file_category_input_cover" style={{marginTop:'16px'}}>
                    <span className="report_upload_input_title_text Pre_KR_Medium">리포트 커버 이미지</span>
                    <div className="report_upload_file_upload_main_frame">
                        <div className="report_upload_file_upload_frame report_file_upload_error">
                            <span className="report_file_upload_indicator Pre_KR_Normal">
                                {!reportProductImage ? (
                                   '이미지 업로드'
                                ) : (
                                    upload_type === 'new' ? (
                                        `${reportProductImage.name}`
                                    ) : (
                                        `${reportProductImage}`
                                    )
                                )}
                            </span>
                            <input 
                                id="report_product_image_input" 
                                name="report_product_image" 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => updateReportProductImage(e)} 
                                style={{display:'none'}} 
                            /> 
                            {!reportProductImage ? (
                                <div className="report_file_input_opener Pre_KR_Normal" onClick={() => handleUploadReportProductImage()}>파일찾기</div>
                            ) : (
                                <div className="report_file_delete_button" onClick={() => handleReportCoverImageDelete()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M1.22659 9.8355L0.163086 8.772L3.93609 4.999L0.163086 1.251L1.22659 0.1875L4.99959 3.9605L8.74759 0.1875L9.81109 1.251L6.03809 4.999L9.81109 8.772L8.74759 9.8355L4.99959 6.0625L1.22659 9.8355Z" fill="#0066FF"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="report_subject_instructions Pre_KR_Normal">· 마켓에서 보여지는 상품 이미지 입니다. 필수 X</div>  
                <div className="report_upload_file_category_input_cover" style={{marginTop:'16px'}}>
                    <span className="report_upload_input_title_text Pre_KR_Medium">미리보기 파일</span>
                    <div className="report_upload_file_upload_main_frame">
                        <input 
                            className="report_upload_file_input" 
                            id="preview_input" 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => updateReportPreview(e)}
                            style={{display:'none'}} 
                        /> 
                        <div className={`report_upload_file_upload_frame ${reportPreviewError ? 'error' : null}`}>
                            <span className="report_file_upload_indicator Pre_KR_Normal">
                                {!reportPreviewImage1 ? (
                                    '미리보기 1'
                                ) : (
                                    upload_type === 'new' ? (
                                        `${reportPreviewImage1.name}`
                                    ) : (
                                        `${reportPreviewImage1}`
                                    )
                                )}
                            </span>
                            {!reportPreviewImage1 ? (
                                <div className="report_file_input_opener Pre_KR_Normal" onClick={() => handleUploadPreview('preview1')}>파일찾기</div>
                            ) : (
                                <div className="report_file_delete_button" onClick={() => handleDeleteReportPreviewImage('preview1')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M1.22659 9.8355L0.163086 8.772L3.93609 4.999L0.163086 1.251L1.22659 0.1875L4.99959 3.9605L8.74759 0.1875L9.81109 1.251L6.03809 4.999L9.81109 8.772L8.74759 9.8355L4.99959 6.0625L1.22659 9.8355Z" fill="#0066FF"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="report_upload_file_upload_frame" id="preview2">
                            <span className="report_file_upload_indicator Pre_KR_Normal">
                                {!reportPreviewImage2 ? (
                                    '미리보기 2'
                                ) : (
                                    upload_type === 'new' ? (
                                        `${reportPreviewImage2.name}`
                                    ) : (
                                        `${reportPreviewImage2}`
                                    )
                                )}
                            </span>
                            {!reportPreviewImage2 ? (
                                <div className="report_file_input_opener Pre_KR_Normal" onClick={() => handleUploadPreview('preview2')}>파일찾기</div>
                            ) : (
                                <div className="report_file_delete_button" onClick={() => handleDeleteReportPreviewImage('preview2')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M1.22659 9.8355L0.163086 8.772L3.93609 4.999L0.163086 1.251L1.22659 0.1875L4.99959 3.9605L8.74759 0.1875L9.81109 1.251L6.03809 4.999L9.81109 8.772L8.74759 9.8355L4.99959 6.0625L1.22659 9.8355Z" fill="#0066FF"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="report_upload_file_upload_frame" id="preview3">
                            <span className="report_file_upload_indicator Pre_KR_Normal">
                                {!reportPreviewImage3 ? (
                                    '미리보기 3'
                                ) : (
                                    upload_type === 'new' ? (
                                        `${reportPreviewImage3.name}`
                                    ) : (
                                        `${reportPreviewImage3}`
                                    )
                                )}
                            </span>
                            {!reportPreviewImage3 ? (
                                <div className="report_file_input_opener Pre_KR_Normal" onClick={() => handleUploadPreview('preview3')}>파일찾기</div>
                            ) : (
                                <div className="report_file_delete_button" onClick={() => handleDeleteReportPreviewImage('preview3')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M1.22659 9.8355L0.163086 8.772L3.93609 4.999L0.163086 1.251L1.22659 0.1875L4.99959 3.9605L8.74759 0.1875L9.81109 1.251L6.03809 4.999L9.81109 8.772L8.74759 9.8355L4.99959 6.0625L1.22659 9.8355Z" fill="#0066FF"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="report_upload_file_upload_frame" id="preview4">
                            <span className="report_file_upload_indicator Pre_KR_Normal">
                                {!reportPreviewImage4 ? (
                                    '미리보기 4'
                                ) : (
                                    upload_type === 'new' ? (
                                        `${reportPreviewImage4.name}`
                                    ) : (
                                        `${reportPreviewImage4}`
                                    )
                                )}
                            </span>
                            {!reportPreviewImage4 ? (
                                <div className="report_file_input_opener Pre_KR_Normal" onClick={() => handleUploadPreview('preview4')}>파일찾기</div>
                            ) : (
                                <div className="report_file_delete_button" onClick={() => handleDeleteReportPreviewImage('preview4')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M1.22659 9.8355L0.163086 8.772L3.93609 4.999L0.163086 1.251L1.22659 0.1875L4.99959 3.9605L8.74759 0.1875L9.81109 1.251L6.03809 4.999L9.81109 8.772L8.74759 9.8355L4.99959 6.0625L1.22659 9.8355Z" fill="#0066FF"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>  
                <div className="report_subject_instructions Pre_KR_Normal" style={{marginBottom:'60px'}}>· 최소 1개이상</div>  
            </form>

            <div className="report_upload_button_main_holder_frame">
                <div className="report_upload_button_main_frame">
                    {reportUploadErrorMessage && (
                        <div className="upload_error_text Pre_KR_Normal">{reportUploadErrorMessage}</div>  
                    )}
                    {upload_type === 'modification' ? (
                        <div className="report_upload_button Pre_KR_Normal" onClick={() => handleReportUpload()}>
                            리포트 수정
                        </div> 
                    ) : (
                        <div className="report_upload_button Pre_KR_Normal" onClick={() => handleReportUpload()}>
                            리포트 등록
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ReportUpload