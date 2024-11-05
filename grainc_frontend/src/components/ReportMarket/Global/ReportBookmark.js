import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../../axiosAPIClient";
import AuthContext from "../../../context/AuthContext";
// icon
import { ReactComponent as BookmarkIcon } from '../../../static/assets/GlobalIcon/Bookmark.svg'

function ReportBookmark({report_id}) {
    const apiClient = useAxios();
    const {user} = useContext(AuthContext);

    // user bookmark status
    const [bookmarkStatus, setBookmarkStatus] = useState(false);

    const fetchUserBookmarkStatus = async () => {
        if (user) {
            try {
                const response = await apiClient.get(`/report_bookmark_status/${report_id}/${user.id}/`)
                if (response.status === 200) {
                    if (response.data.status === 'bookmarked') {
                        setBookmarkStatus(true);
                    } else {
                        setBookmarkStatus(false);
                    }
                }
            } catch(error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        fetchUserBookmarkStatus();
    }, [report_id])

    
    // const handle user bookmark 

    const handleBookmarking = async () => {
        if (user) {
            try {
                const response = await apiClient.post('/report_bookmark/', {
                    report_id: report_id,
                    user_id: user.id
                })
                if (response.status === 200) {
                    fetchUserBookmarkStatus();
                }
            } catch(error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="g_report_product_bookmark_icon" onClick={() => handleBookmarking()}>
            {!bookmarkStatus ? (
                <BookmarkIcon className='g_report_bookmark_icon'/>
            ) : (
                <div className='g_report_bookmark_icon'/>
            )}
        </div>
    );
};

export default ReportBookmark