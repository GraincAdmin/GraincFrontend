import React from "react";
import '../../../static/css/SellReportsBase/Skeleton_UI/SkeletonComment.css'
import '../../../static/css/SellReportsBase/Skeleton_UI/SkeletonUI.css'

function SkeletonComment({count, type}) {
    const renderSkeletonUI = () => {
        const ui = [];
        for (let i = 0; i < count; i++) {
            ui.push(
                <div 
                    key={i} 
                    className="skeleton_comment_main_frame"
                    style={{paddingLeft: type === 'reply' ? '36px' : '0px'}}
                >
                    <div className="skeleton_comment_profile_image_frame skeleton-list-item"></div>
                    <div className="skeleton_comment_content_frame">
                        <div className="skeleton_comment_content skeleton-list-item"></div>
                        <div className="skeleton_comment_content margin_option skeleton-list-item"></div>
                        {type !== 'reply' && (
                            <div className="skeleton_comment_content margin_option skeleton-list-item"></div>
                        )}
                    </div>
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

export default SkeletonComment