import React, { useEffect, useState } from "react";
import '../../../../static/css/CustomAdmin/AdminGlobal/AdminPanelInputField.css'
import useAxios from "../../../../axiosAPIClient";
const AdminAnnouncementDetail = ({announcement_id, announcementPageType}) => {
    const apiClient = useAxios();

    const [loading, setLoading] = useState(announcementPageType === 'detail' ? true : null);
    const [subject, setSubject] = useState();
    const [content, setContent] = useState();   
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [isImportant, setIsImportant] = useState();

    const fetchAnnouncementDetail = async () => {
        try {
            const response = await apiClient.get(`/custom_admin_announcement_detail/${announcement_id}/`);
            const data = response.data;
            setSubject(data.subject);
            setContent(data.content);
            setStartTime(data.start_time ? data.start_time.slice(0, 16) : '');
            setEndTime(data.end_time ? data.end_time.slice(0, 16) : '');
            setIsImportant(data.is_important);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (announcementPageType === 'detail') {
            fetchAnnouncementDetail();
        }
    }, [announcement_id])


    const [updateStatus, setUpdateStatus] = useState(false);
    const [updateError, setUpdateError] = useState(false);
    
    const handleAnnouncementDetailModification = async () => {
        setUpdateStatus(false);
        setUpdateError(false);
        try {
            const response = await apiClient.post(`/custom_admin_announcement_detail/${announcement_id}/`, {
                subject: subject,
                content: content,
                is_important: isImportant,
                start_time: startTime,
                end_time: endTime,
            });
            fetchAnnouncementDetail();
            setUpdateStatus(true);
        } catch (error) {
            setUpdateError(true);
        }
    }

    const handleNewAnnouncementCreation = async () => {
        setUpdateStatus(false);
        setUpdateError(false);
        try {
            const response = await apiClient.post('/custom_admin_new_announcement/', {
                subject: subject,
                content: content,
                is_important: isImportant,
                start_time: startTime,
                end_time: endTime,
            });
            fetchAnnouncementDetail();
            setUpdateStatus(true);
        } catch (error) {
            console.log(error);
            setUpdateError(true);
        }
    };

    const handleAnnouncementSubmit = () => {
        if (announcementPageType === 'detail') {
            handleAnnouncementDetailModification();
        } else if (announcementPageType === 'new') {
            handleNewAnnouncementCreation();
        }
    };

    if (loading) {
        return <div>로딩중 ....</div>;
    }


    return (
        <form class="admin_modification_panel_form" method="post">
            <div class="admin_panel_input_frame">
                <span class="admin_panel_input_field_indicator Pre_KR_Medium">공지 제목</span>
                <input class="admin_panel_input" 
                    name="subject" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)}
                />
            </div>
            <div class="admin_panel_input_frame">
                <span class="admin_panel_input_field_indicator Pre_KR_Medium">중요공지 여부</span>
                <input 
                    className="admin_panel_input_check_box" 
                    type="checkbox" 
                    name="is_important" 
                    checked={isImportant}
                    onChange={(e) => setIsImportant(e.target.checked)}
                />
            </div>
            <div class="admin_panel_input_frame">
                <span class="admin_panel_input_field_indicator Pre_KR_Medium">중요공지 시작일</span>
                <input type="datetime-local" name="start_time" value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
            </div>
            <div class="admin_panel_input_frame">
                <span class="admin_panel_input_field_indicator Pre_KR_Medium">중요공지 종료일</span>
                <input type="datetime-local" name="end_time" value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
            </div>
            <div class="admin_panel_input_frame" style={{ flexDirection:'column', alignItems:'flex-start', gap:'8px' }}>
                <span class="admin_panel_input_field_indicator Pre_KR_Medium">공지글</span>
                <textarea class="admin_panel_textarea" 
                    name="content"
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}>
                </textarea>
            </div>
            <div class="admin_panel_save_button_frame"> 
                {announcementPageType === 'detail' && (
                    <div class="admin_panel_delete_button Pre_KR_Normal">삭제</div>
                )}
                <div class="admin_panel_save_button Pre_KR_Normal" onClick={() => handleAnnouncementSubmit()}>저장</div>
            </div>
            {updateStatus && (
                <span className="Pre_KR_Normal" style={{color:'#0066FF', marginLeft:'auto', paddingTop:'8px'}}>수정완료</span>
            )}
            {updateError && (
                <span className="Pre_KR_Normal" style={{color:'#ff0000', marginLeft:'auto', paddingTop:'8px'}}>수정에러</span>
            )}
        </form>
    )
}

export default AdminAnnouncementDetail