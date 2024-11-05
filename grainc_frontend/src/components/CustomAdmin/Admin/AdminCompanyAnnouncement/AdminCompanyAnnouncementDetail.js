import React, { useEffect, useState } from "react";
import useAxios from "../../../../axiosAPIClient";
import '../../../../static/css/CustomAdmin/AdminGlobal/AdminPanelInputField.css'

//Quill Editor
import ReactQuill, { Quill } from 'react-quill';
import '../../../../static/css/Global/QuillAdmin.css'
import 'react-quill/dist/quill.snow.css';


// Import quill-image-resize-module and quill-image-drop-module
import { ImageDrop } from 'quill-image-drop-module';
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

const AdminCompanyAnnouncementDetail = ({company_announcement_id, company_announcement_page}) => {
    const apiClient = useAxios();
    const [companyAnnouncement, setCompanyAnnouncement] = useState();
    const [subject, setSubject] = useState();

    console.log(company_announcement_id)

    const fetchCompanyAnnouncementDetail = async () => {
        try {
            const response = await apiClient.get(`/custom_admin_company_LTD_announcement_detail/${company_announcement_id}/`);
            const data = response.data;
            setCompanyAnnouncement(data.Company_Announcement_Content)
            setSubject(data.Company_Announcement_Subject)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (company_announcement_page === 'detail') {
            fetchCompanyAnnouncementDetail();
        }
    }, [company_announcement_id]);

    const handleCompanyAnnouncementModification = async () => {
        try {
            const response = await apiClient.post(`/custom_admin_company_LTD_announcement_detail/${company_announcement_id}/`, {
                Company_Announcement_Content: companyAnnouncement,
                Company_Announcement_Subject: subject
            });
            fetchCompanyAnnouncementDetail();
        } catch(error) {
            console.log(error)
        }
    }

    const handleNewCompanyAnnouncement = async () => {
        try {
            const response = await apiClient.post('/custom_admin_new_company_LTD_announcement/', {
                Company_Announcement_Content: companyAnnouncement,
                Company_Announcement_Subject: subject
            })
            fetchCompanyAnnouncementDetail();
        } catch(error) {
            console.log(error)
        }
    }

    const handleCompanyAnnouncementSubmit = async () => {
        if (company_announcement_page === 'detail') {
            handleCompanyAnnouncementModification();
        } else if (company_announcement_page === 'new') {
            handleNewCompanyAnnouncement();
        }
    }




    return (
        <form className="admin_modification_panel_form">
            <div className="admin_panel_indicator Pre_KR_Normal">
                {company_announcement_page === 'detail' && '공고 수정'}
                {company_announcement_page === 'new' && '새 공고'}
            </div>
            <div class="admin_panel_input_frame">
                    <span class="admin_panel_input_field_indicator Pre_KR_Medium">공고 제목</span>
                    <input class="admin_panel_input" name="Company_Announcement_Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className="admin_panel_input_frame" style={{ flexDirection:'column', alignItems:'flex-start', gap:'8px' }}>
                <span className="admin_panel_input_field_indicator Pre_KR_Medium">
                    {company_announcement_page === 'detail' && '공고 수정'}
                    {company_announcement_page === 'new' && '새 공고'}
                </span>
                <ReactQuill
                        theme="snow"
                        modules={modules}
                        value={companyAnnouncement}
                        onChange={setCompanyAnnouncement}
                        placeholder="새 회사 공고 작성!"
                />
            </div>
            <div className="admin_panel_save_button_frame">
                <div className="admin_panel_delete_button Pre_KR_Normal" onclick="location.href='{% url 'Custom_Admin:admin_company_announcement_delete' selected_announcement.pk %}'">삭제</div>
                <div className="admin_panel_save_button Pre_KR_Normal" onClick={handleCompanyAnnouncementSubmit}>저장</div>
            </div>
        </form>
    );
};

export default AdminCompanyAnnouncementDetail