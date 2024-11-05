import React from "react";
import '../../../static/css/SellReportsBase/Bookmark/BookMarkFolder.css'

// icon
import { ReactComponent as BookmarkFolderIcon } from '../../../static/assets/GlobalIcon/Notebook.svg'

function BookmarkFolder({folders, pageHandler}) {
    folders.forEach(element => {
        console.log(element.folder_name)
    });
    return (
        folders.length !== 0 && (
            folders.map((folder, index) => (
                <div key={index} className="bookmark_folder_ui_main_frame" onClick={() => pageHandler('community', folder.id, folder.folder_name)}>
                    <div className="bookmark_folder_ui_frame">
                        <div className="bookmark_folder_ui_header_frame"></div>
                        <div className="bookmark_folder_ui_main_content_frame">
                            <span className="bookmark_folder_ui_main_content_text1 Pre_KR_Medium">{ folder.folder_name }</span>
                            <span className="bookmark_folder_ui_main_content_text2 Pre_KR_Medium">({ folder.bookmark_count })</span>
                        </div>
                    </div>
                    <div className="bookmark_folder_ui_icon_frame">
                        <BookmarkFolderIcon />
                    </div>
                </div>
            ))
        )
    );
};

export default BookmarkFolder