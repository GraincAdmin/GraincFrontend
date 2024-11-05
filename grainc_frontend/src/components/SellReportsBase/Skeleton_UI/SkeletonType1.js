import React from "react";
import '../../../static/css/SellReportsBase/Skeleton_UI/SkeletonType1.css'
import '../../../static/css/SellReportsBase/Skeleton_UI/SkeletonUI.css'
function CommunitySkeletonType1({count, type}) {

    const renderSkeletonUI = () => {
        const ui = [];
        for (let i = 0; i < count; i++) {

            if(type === 'width_100') {
                ui.push(
                    <div key={i} className="community_skeleton_type1_frame type_option">
                        <div className="community_skeleton_type1_image skeleton-list-item"></div>
                        <div className="community_skeleton_type1_text_100 skeleton-list-item"></div>
                        <div className="community_skeleton_type1_text_50 skeleton-list-item"></div>
                        <div className="community_skeleton_type1_text_additional_info skeleton-list-item"></div>
                    </div>
                );
            }else {
                ui.push(
                    <div key={i} className="community_skeleton_type1_frame">
                        <div className="community_skeleton_type1_image skeleton-list-item"></div>
                        <div className="community_skeleton_type1_text_100 skeleton-list-item"></div>
                        <div className="community_skeleton_type1_text_50 skeleton-list-item"></div>
                        <div className="community_skeleton_type1_text_additional_info skeleton-list-item"></div>
                    </div>
                );
            }
        }
        return ui;
    };


    return (
        <>
            {renderSkeletonUI()}
        </>
    );
};

export default CommunitySkeletonType1