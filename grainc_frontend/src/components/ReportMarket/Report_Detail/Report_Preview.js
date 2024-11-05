import React from "react";
import '../../../static/css/ReportMarket/Report_Detail/Report_Preview.css'
import LoadingCircle from "../../Global/LoadingCircle";

// icon
import { ReactComponent as CloseIcon } from '../../../static/assets/GlobalIcon/Close_MD.svg'
const ReportPreview = ({open, loading, openHandle, reportSubject, previewImage}) => {
    return (
        <div className={`report_preview_popup_frame ${open ? 'open' : null}`}>
            <div className="report_preview_main_frame">
                <div className="report_preview_title_frame">
                    <div className="report_preview_title Pre_KR_Medium">' {reportSubject} ' 미리보기</div>
                    <div className="report_preview_close_button" onClick={() => openHandle()}>
                        <CloseIcon style={{stroke: '#1A1A1B'}}/>
                    </div>
                </div>
                <div className="report_preview_content_cover_frame">
                    {!loading ? (
                        previewImage && (
                            previewImage.map((preview_url, index) => (
                                <div className="report_preview_content">
                                    <img key={index} src={preview_url} />
                                </div>
                            ))
                        )
                    ) : (
                        <LoadingCircle color_option={true} size_option={true} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportPreview