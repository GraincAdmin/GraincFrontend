import React, { useEffect, useState } from "react";
import '../../../../static/css/CustomAdmin/AdminGlobal/AdminPanelInputField.css'
//Quill Editor
import ReactQuill, { Quill } from 'react-quill';
import '../../../../static/css/Global/QuillAdmin.css'
import 'react-quill/dist/quill.snow.css';


// Import quill-image-resize-module and quill-image-drop-module
import { ImageDrop } from 'quill-image-drop-module';
import useAxios from "../../../../axiosAPIClient";
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


const AdminPolicyDetail = ({policy_id, policy_type}) => {
    const apiClient = useAxios();
    const [loading, setLoading] = useState(true);
    const [policyContent, setPolicyContent] = useState();

    const fetchPolicyDetail = async () => {
        try {
            const response = await apiClient.get(`/custom_admin_policy_detail/${policy_type}/${policy_id}/`)
            const data = response.data
            setPolicyContent(data.policy_content)
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (policy_type === 'company' || policy_type === 'privacy') {
            fetchPolicyDetail();
        }
    }, [policy_id, policy_type]);

    if (loading) {
        <div>로딩중 ...</div>
    }

    const handlePolicyModification = async () => {
        try {
            const response = await apiClient.post(`/custom_admin_policy_detail/${policy_type}/${policy_id}/`, {
                policyContent: policyContent
            })
            fetchPolicyDetail();
        } catch(error) {
            console.log(error)
        }
    }

    const handleNewPolicyUpload = async () => {
        try {
            const response = await apiClient.post(`/custom_admin_new_policy/${policy_type}/`, {
                policyContent: policyContent
            })
            console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    console.log(policy_type)
    const handlePolicyUpload = () => {
        if (policy_type === 'company' || policy_type === 'privacy') {
            handlePolicyModification();
        } else if (policy_type === 'new_company_policy' || policy_type === 'new_privacy_policy') {
            handleNewPolicyUpload();
        }
    }


    return (
        <div class="admin_modification_panel_form">
            <div class="admin_panel_indicator Pre_KR_Normal">
                { policy_type === 'company' && '이용약관 수정' }
                { policy_type === 'privacy' && '개인정보이용약관 수정'}
                { policy_type === 'new_company_policy' && '새 이용약관 작성' }
                { policy_type === 'new_privacy_policy' && '새 개인정보이용약관 작성' }
            </div>
            <div class="admin_panel_input_frame" style={{ flexDirection:'column', alignItems:'flex-start', gap:'8px' }}>
                <span class="admin_panel_input_field_indicator Pre_KR_Medium">{ policy_type === 'company' ? '이용약관 작성' : '개인정보이용약관 작성' }</span>
                <ReactQuill
                        theme="snow"
                        modules={modules}
                        value={policyContent}
                        onChange={setPolicyContent}
                        placeholder="새 약관작성"
                    />
            </div>
            <div class="admin_panel_save_button_frame">
                <button class="admin_panel_delete_button Pre_KR_Normal">삭제</button>
                <div class="admin_panel_save_button Pre_KR_Normal" onClick={handlePolicyUpload}>저장</div>
            </div>
        </div>
    );
};

export default AdminPolicyDetail