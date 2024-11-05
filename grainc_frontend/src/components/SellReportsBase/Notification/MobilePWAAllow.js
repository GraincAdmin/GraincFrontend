import React from "react";
import '../../../static/css/SellReportsBase/Notification/NotificationAllow.css'

function MobilePWAAllow({pwaStyle}) {

    const handlePWADownloadClose = () => {
        localStorage.setItem("PWAIgnore", true);
        pwaStyle(false);
    }

    return (
        <div className="mobile_pwa_add">
            <div className='notification_allow_frame' style={{bottom:'92px', left:'16px',  width: 'calc(100% - 32px)', top:'unset'}}>
                <div className='notification_allow_info_main_frame'>
                    <div className='notification_allow_img'></div>
                    <div className='notification_allow_info_frame'>
                        <span className='Pre_KR_SemiBold' style={{fontSize:'14px'}}>홈 화면에 셀리포트 앱을 추가하세요 !</span>
                        <span className='Pre_KR_Normal'>설치하면 알림을 받을 수 있어요</span>
                    </div>
                </div>
                <div className='notification_mobile_pwa_add'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                        <mask id="mask0_1491_14" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
                        <rect x="0.5" width="20" height="20" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_1491_14)">
                        <path d="M5.75646 18.7505C5.33549 18.7505 4.97917 18.6047 4.6875 18.313C4.39583 18.0214 4.25 17.665 4.25 17.2441V8.59031C4.25 8.16934 4.39583 7.81302 4.6875 7.52135C4.97917 7.22969 5.33549 7.08386 5.75646 7.08386H7.88771V8.33385H5.75646C5.69229 8.33385 5.63354 8.36059 5.58021 8.41406C5.52674 8.4674 5.5 8.52615 5.5 8.59031V17.2441C5.5 17.3082 5.52674 17.367 5.58021 17.4203C5.63354 17.4738 5.69229 17.5005 5.75646 17.5005H15.2435C15.3077 17.5005 15.3665 17.4738 15.4198 17.4203C15.4733 17.367 15.5 17.3082 15.5 17.2441V8.59031C15.5 8.52615 15.4733 8.4674 15.4198 8.41406C15.3665 8.36059 15.3077 8.33385 15.2435 8.33385H13.1123V7.08386H15.2435C15.6645 7.08386 16.0208 7.22969 16.3125 7.52135C16.6042 7.81302 16.75 8.16934 16.75 8.59031V17.2441C16.75 17.665 16.6042 18.0214 16.3125 18.313C16.0208 18.6047 15.6645 18.7505 15.2435 18.7505H5.75646ZM9.875 13.1255V3.93323L8.33333 5.4749L7.45521 4.58385L10.5 1.53906L13.5448 4.58385L12.6667 5.4749L11.125 3.93323V13.1255H9.875Z" fill="#1A1A1B"/>
                        </g>
                    </svg>
                    를 눌러서 홈 화면에 추가해주세요
                </div>
                <div className="continue_with_web Pre_KR_Normal" onClick={() => handlePWADownloadClose()}>그냥 모바일 웹으로 볼게요</div>
            </div>
        </div>
    );
};

export default MobilePWAAllow

