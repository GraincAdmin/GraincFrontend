import React from "react";
import '../../../static/css/SellReportsBase/Skeleton_UI/SkeletonReport.css'
import '../../../static/css/SellReportsBase/Skeleton_UI/SkeletonUI.css'

function SkeletonReport({count}) {
    const renderSkeletonUI = () => {
        const ui = [];
        for (let i = 0; i < count; i++) {
            ui.push(
                <div key={i} className="skeleton_report_main_frame">
                    <div className="skeleton_report_content_50 skeleton-list-item"></div>
                    <div className="skeleton_report_content_100 skeleton-list-item" style={{marginTop: '12px'}}></div>
                    <div className="skeleton_report_content_50 skeleton-list-item" style={{marginTop: '4px'}}></div>
                    <div className="skeleton_report_information_frame">
                        <div className="skeleton_report_content_50 skeleton-list-item"></div>
                        <div className="skeleton_report_content_50 skeleton-list-item"></div>
                        <div className="skeleton_report_content_50 skeleton-list-item"></div>
                    </div>
                    <div className="skeleton_report_content_100 skeleton-list-item responded_report_information" style={{marginTop: '24px'}}></div>
                </div>
            );
        }
        return ui;
    };
    return (
        <>
            {renderSkeletonUI()}
        </>
    );
};

export default SkeletonReport
