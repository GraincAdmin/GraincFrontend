// import React from 'react';
// import '../../../static/css/SellReportsBase/Notification/NotificationAllow.css';
// import useAxios from '../../../axiosAPIClient';

// const NotificationAllow = ({ popStyle }) => {
//     const apiClient = useAxios();

//     const handleNotificationAllow = async () => {
//         if (!window.Notification) {
//             alert('Notifications are not supported by your browser.');
//             return;
//         }

//         try {
//             const permission = await window.Notification.requestPermission();
//             if (permission === 'denied') {
//                 alert('Notification permission denied. Please change this setting in your browser.');
//                 return;
//             }

//             // Retrieve the notification token
//             const token = await getToken(messaging, { vapidKey: 'BOL3kl0uVPyT4ny_EngHewEi_AZ_JGWTrCnYsYNAiD1lJl97CDcVTFxN0_fX0djYiPHinBV4T07UsVl9T_yc4kA' });

//             console.log('User Notification Token:', token);

//             // Save the token to the server
//             await apiClient.post('/save_notification_token/', { token });
            
//             // Close the notification prompt
//             handleNotificationAllowClose();
//         } catch (error) {
//             console.error('Error handling notifications:', error);
//         }
//     };

//     const handleNotificationAllowClose = () => {
//         localStorage.setItem('notificationIgnore', true);
//         popStyle(false);
//     };

//     return (
//         <div className='notification_allow_frame'>
//             <div className='notification_allow_info_main_frame'>
//                 <div className='notification_allow_img'></div>
//                 <div className='notification_allow_info_frame'>
//                     <span className='Pre_KR_SemiBold' style={{ fontSize: '14px' }}>알림을 허용하고 중요한 알림을 받아보세요</span>
//                     <span className='Pre_KR_Normal'>· 구독 유저 신규 커뮤니티 글 및 리포트</span>
//                     <span className='Pre_KR_Normal'>· 중요 공지사항</span>
//                 </div>
//             </div>
//             <div className='notification_allow_info_main_frame'>
//                 <div 
//                     className='notification_allow_button Pre_KR_Medium' 
//                     style={{ color: '#616161', background: '#F4F6F8' }}
//                     onClick={() => handleNotificationAllowClose()}>
//                     알림 안 받기
//                 </div>
//                 <div 
//                     className='notification_allow_button Pre_KR_Medium' 
//                     style={{ color: '#fff', background: '#0066FF' }}
//                     onClick={() => handleNotificationAllow()}>
//                     알림 받기
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NotificationAllow;
