import React, { useEffect, useState } from "react";
import '../../../static/css/SellReportsBase/SnackBar/SnackBar.css';
import { ReactComponent as CloseMD } from '../../../static/assets/GlobalIcon/Close_MD.svg';
import SnackBarStore from "../../Store/SnackBarStore";

function SnackBar() {
    const { viewSnackBar, setViewSnackBar, snackBarMessage, snackBarStyle } = SnackBarStore();
    const [snackBarColor, setSnackBarColor] = useState('#1a1a1b');

    useEffect(() => {
        if (snackBarStyle === 'normal') {
            setSnackBarColor('#1a1a1b');
        } else if (snackBarStyle === 'error') {
            setSnackBarColor('#ff0000');
        }
    }, [snackBarStyle]);

    // Automatically hide the snack bar after 3 seconds
    useEffect(() => {
        let timer;
        if (viewSnackBar) {
            timer = setTimeout(() => {
                setViewSnackBar(false); // Hide the snack bar
            }, 3000); // 3 seconds
        }
        return () => clearTimeout(timer); // Cleanup the timer on unmount or when viewSnackBar changes
    }, [viewSnackBar, setViewSnackBar]);

    function closeSnackBar() {
        setViewSnackBar(false);
    }

    return (
        <div className={`snackbar_cover ${viewSnackBar ? 'open' : ''}`}>
            <div className="snackbar" style={{ background: snackBarColor }}>
                <span className="snackbar_message Pre_KR_Medium">{snackBarMessage}</span>
                <CloseMD className='snackbar_close' onClick={closeSnackBar} />
            </div>
        </div>
    );
}

export default SnackBar;
