import React from "react";
import '../../../static/css/SellReportsBase/Skeleton_UI/SkeletonBookmarkFolder.css'
import '../../../static/css/SellReportsBase/Skeleton_UI/SkeletonUI.css'
function SkeletonBookmarkFolder({count}) {
    const renderSkeletonUI = () => {
        const ui = [];
        for (let i = 0; i < count; i++) {
            ui.push(
                <div key={i} className="skeleton_bookmark_folder_frame">
                    <div className="skeleton_bookmark_folder_image_frame skeleton-list-item"></div>
                    <div className="skeleton_bookmark_folder_content_frame">
                        <div className="skeleton_bookmark_folder_content skeleton-list-item"></div>
                        <div className="skeleton_bookmark_folder_content skeleton-list-item"></div>
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

export default SkeletonBookmarkFolder