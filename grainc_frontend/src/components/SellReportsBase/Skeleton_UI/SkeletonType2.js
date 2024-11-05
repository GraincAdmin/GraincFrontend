import React from "react";
import '../../../static/css/SellReportsBase/Skeleton_UI/SkeletonType2.css'
import '../../../static/css/SellReportsBase/Skeleton_UI/SkeletonUI.css'

function SkeletonType2({count}) {

    const renderSkeletonUI = () => {
        const ui = [];
        for (let i = 0; i < count; i++) {
            ui.push(
                <div key={i} className="g_article_main_frame">
                    <div className="community_skeleton_type2_content_image_frame">
                        <div className="community_skeleton_type_2_content_frame">
                            <div className="community_skeleton_type2_text_100 skeleton-list-item"></div>
                            <div className="community_skeleton_type2_text_50 skeleton-list-item"></div>
                            <div className="community_skeleton_type2_text_50 skeleton-list-item"></div>
                        </div>
                        <div className="community_skeleton_type_2_image_frame skeleton-list-item"></div>
                    </div>
                    <div className="community_skeleton_type2_text_additional_info skeleton-list-item"></div>
                </div>
            );
        }
        return ui;
    };


    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            {renderSkeletonUI()}
        </div>
    );
};

export default SkeletonType2