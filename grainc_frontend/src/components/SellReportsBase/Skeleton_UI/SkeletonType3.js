import React from "react";
import '../../../static/css/SellReportsBase/Skeleton_UI/SkeletonUI.css'
import '../../../static/css/SellReportsBase/Skeleton_UI/SkeletonType3.css'


function SkeletonType3({count}) {
    const renderSkeletonUI = () => {
        const ui = [];
        for (let i = 0; i < count; i++) {
            ui.push(
                <div key={i} className="g_article_main_frame">
                    <div className="skeleton_type_3_30 skeleton-list-item"></div>
                    <div className="skeleton_type_3_100 skeleton-list-item" style={{marginTop: '16px'}}></div>
                    <div className="skeleton_type_3_70 skeleton-list-item" style={{marginTop: '16px'}}></div>
                    <div className="skeleton_type_3_70 skeleton-list-item" style={{marginTop: '16px'}}></div>
                </div>
            );
        }
        return ui;
    };
    return (
        <div className="skeleton_type_3_cover_frame">
            {renderSkeletonUI()}
        </div>
    );
};

export default SkeletonType3
