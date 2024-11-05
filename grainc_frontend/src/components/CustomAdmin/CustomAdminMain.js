import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import '../../static/css/CustomAdmin/CustomAdminMain.css'
import AuthContext from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import SuspenseUI from "../../SuspenseUI";

// icon 
import { ReactComponent as NavOptionIcon } from '../../static/assets/GlobalIcon/Hamburger_LG.svg'
// page icon
import { ReactComponent as UserIcon } from '../../static/assets/Admin/user.svg'
import { ReactComponent as CommunityIcon } from '../../static/assets/Admin/community.svg'
import { ReactComponent as CommunityViolationIcon } from '../../static/assets/Admin/community_violation.svg'
import { ReactComponent as PurchaseRecordIcon } from '../../static/assets/Admin/report_purchase_record.svg'
import { ReactComponent as ProfitWithdrawalIcon } from '../../static/assets/Admin/withdrawal.svg'
import { ReactComponent as InquiryIcon } from '../../static/assets/Admin/Inquiry.svg'
import { ReactComponent as AnnouncementIcon } from '../../static/assets/Admin/announcement.svg'
import { ReactComponent as PolicyIcon } from '../../static/assets/Admin/policy.svg'
import { ReactComponent as CompanyAnnouncementIcon } from '../../static/assets/Admin/company_announcement.svg'


// DashBoard
const AdminDashboard = lazy(() => import("./Admin/AdminDashboard"))

// Admin User
const AdminUser = lazy(() => import("./Admin/AdminUser/AdminUser"))
const AdminUserDetail = lazy(() => import('./Admin/AdminUser/AdminUserDetail'))
// Admin Community
const AdminCommunity = lazy(() => import ('./Admin/AdminCommunity/AdminCommunity'))
const AdminCommunityDetail = lazy(() => import('./Admin/AdminCommunity/AdminCommunityDetail'))
// Admin ReportMarket
const ReportMarketManagement = lazy(() => import('./Admin/ReportMarket/ReportMarketManagement'))
const ReportMarketManagementDetail = lazy(() => import('./Admin/ReportMarket/ReportMarketManagementDetail'))

// Admin Report Purchased Record
const ReportPurchaseRecord = lazy(() => import('./Admin/ReportPurchaseRecord/ReportPurchaseRecord'))

// Admin Profit Withdawal Record
const AdminProfitWithdrawalRecord = lazy(() => import('./Admin/AdminProfitWithdrawalRecord/AdminProfitWithdrawalRecord'))

// Admin Inquiry
const AdminInquiryManagement = lazy(() => import('./Admin/AdminInquiry/AdminInquiryManagement'))
const AdminInquiryManagementDetail = lazy(() => import('./Admin/AdminInquiry/AdminInquiryManagementDetail'))
// Admin Announcements
const AdminAnnouncement = lazy(() => import('./Admin/AdminAnnouncement/AdminAnnouncement'))
const AdminAnnouncementDetail = lazy(() => import('./Admin/AdminAnnouncement/AdminAnnouncementDetail'))
// Admin Policy
const AdminPolicy = lazy(() => import('./Admin/AdminPolicy/AdminPolicy'))
const AdminPolicyDetail = lazy(() => import('./Admin/AdminPolicy/AdminPolicyDetail'))
// Admin Company Announcement
const AdminCompanyAnnouncement = lazy(() => import('./Admin/AdminCompanyAnnouncement/AdminCompanyAnnouncement'))
const AdminCompanyAnnouncementDetail = lazy(() => import('./Admin/AdminCompanyAnnouncement/AdminCompanyAnnouncementDetail'))

function CustomAdmin() {
    // User Qualification
    const { user } = useContext(AuthContext);
    const authnticatedUser = user ? user : 'unAuthenticated'
    const navigate = useNavigate();

    useEffect(() => {
        if (!authnticatedUser.is_admin) {
            alert('권한이 없습니다. IP 로그 수집중 ....');
            navigate('/');
        } else if (authnticatedUser === 'unAuthenticated') {
            navigate('/login');
        }
    }, [])

    // Nav Control

    const [navOpener, setNavOpener] = useState(false);

    const handleNavOpener = () => {
        setNavOpener(!navOpener)
    }

    // page control 
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const adminPageQuery = query.get('adminpage');
    const [adminPage, setAdminPage] = useState('dashboard');

    useEffect(() => {
        if (adminPageQuery) {
            setAdminPage(adminPageQuery)
        }
    }, [adminPageQuery])

    const handlePageChange = (page) => {
        setNavOpener(false);
        navigate(`/sellreports_admin?adminpage=${encodeURIComponent(page)}`); // Programmatically navigate to the /search route with the query parameter
    }


    // User Management
    const [userID, setUserID] = useState(null);
    const handleUserManagementPage = (user_id) => {
        setUserID(user_id)
        handlePageChange('user_management_detail')
    }

    // Community Management
    const [articleID, setArticleID] = useState(null);
    const handleCommunityManagementPage = (article_id) => {
        setArticleID(article_id)
        handlePageChange('community_management_detail')
    }

    // Report Management
    const [reportID, setReportID] = useState(null);
    const handelReportManagementPage = (report_id) => {
        setReportID(report_id)
        handlePageChange('report_market_management_detail')
    }

    // Inquiry Management
    const [inquiryID, setInquiryID] = useState(null);
    const handleInquiryManagementPage = (inquiry_id) => {
        setInquiryID(inquiry_id);
        handlePageChange('inquiry_management_detail');
    }

    // Announcement Management
    const [announcementID, setAnnouncementID] = useState(null);
    const [announcementPageType, setAnnouncementPageType] = useState(null);
    const handleAnnouncementManagementPage = (announcement_id, type) => {
        setAnnouncementID(announcement_id);
        setAnnouncementPageType(type)
        handlePageChange('announcement_management_detail');
    }

    // Policy Management
    const [policyID, setPolicyID] = useState(null);
    const [policyPageType, setPolicyPageType] = useState(null);
    const handlePolicyPage = (policy_id, type) => {
        setPolicyID(policy_id)
        setPolicyPageType(type)
        handlePageChange('company_policy_detail')
    }

    // Company Announcement Management
    const [companyAnnouncementID, setCompanyAnnouncementID] = useState(null);
    const [companyAnnouncementPage, setCompanyAnnouncementPage] = useState(null);
    const handleCompanyAnnouncementPage = (company_announcement_id, page) => {
        setCompanyAnnouncementID(company_announcement_id);
        setCompanyAnnouncementPage(page)
        handlePageChange('company_announcement_detail')
    }

    return (
        <>
            <div className="custom_admin_nav">
                <div className="sellreports_admin_logo_frame">
                    <svg xmlns="http://www.w3.org/2000/svg" width="222" height="29" viewBox="0 0 222 29" fill="none">
                        <g clip-path="url(#clip0_1426_310)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.6932 19.6923H8.30859V17.6154H16.6163V11.3846H8.30859V9.3077V3.07693V1H18.6932V3.07693H10.3855V9.3077H18.6932V11.3846V17.6154V19.6923Z" fill="#0066FF"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.6932 28.0009H8.30859V25.924H16.6163V19.6932H8.30859V17.6163V11.3855V9.30859H18.6932V11.3855H10.3855V17.6163H18.6932V19.6932V25.924V28.0009Z" fill="black"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.30859 19.6932V9.30859H10.3855V17.6163H16.6163V9.30859H18.6932H24.924H27.0009V19.6932H24.924V11.3855H18.6932V19.6932H16.6163H10.3855H8.30859Z" fill="#0066FF"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.6917 9.30859L18.7757 19.6929L16.6988 19.7097L10.4682 19.76L8.39138 19.7768L8.32423 11.4694L2.09364 11.5198L2.16081 19.8272L0.0839559 19.844L0 9.45971L2.07686 9.44293L8.30743 9.39254L10.3843 9.37576L10.4515 17.6832L16.682 17.6328L16.6149 9.32538L18.6917 9.30859Z" fill="#1A1A1B"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0684 19.6922L16.6838 19.7303L16.6761 17.6534L16.6533 11.4226L16.6457 9.3457L24.9533 9.31526L24.9304 3.08452L16.6228 3.11497L16.6152 1.03807L26.9999 1L27.0073 3.07692L27.0302 9.30763L27.0379 11.3846L18.7302 11.415L18.7531 17.6457L27.0607 17.6153L27.0684 19.6922Z" fill="#0066FF"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 9.30859H10.3846V11.3855V17.6163V19.6932H2.07693V25.924H10.3846V28.0009H0V25.924V19.6932V17.6163H8.30771V11.3855H0V9.30859Z" fill="#1A1A1B"/>
                        <path d="M18.6925 9.30859H10.3848V11.3855H18.6925V9.30859Z" fill="#0066FF"/>
                        <path d="M16.6152 3.07512V11.3828H18.6922V3.07512H16.6152Z" fill="#0066FF"/>
                        <path d="M8.30859 17.6142V25.9219H10.3855V17.6142H8.30859Z" fill="#1A1A1B"/>
                        </g>
                        <path d="M41.983 22.22C40.751 22.22 39.563 21.978 38.419 21.494C37.275 21.01 36.263 20.328 35.383 19.448L36.791 17.82C37.627 18.6413 38.4777 19.25 39.343 19.646C40.223 20.042 41.1397 20.24 42.093 20.24C42.841 20.24 43.4937 20.1373 44.051 19.932C44.623 19.712 45.063 19.404 45.371 19.008C45.679 18.612 45.833 18.1647 45.833 17.666C45.833 16.9767 45.591 16.4487 45.107 16.082C44.623 15.7153 43.8237 15.4367 42.709 15.246L40.135 14.828C38.727 14.5787 37.671 14.124 36.967 13.464C36.2777 12.804 35.933 11.924 35.933 10.824C35.933 9.944 36.1677 9.174 36.637 8.514C37.1064 7.83933 37.7664 7.31867 38.617 6.952C39.4824 6.58533 40.4797 6.402 41.609 6.402C42.7237 6.402 43.8164 6.58533 44.887 6.952C45.9724 7.304 46.9477 7.81733 47.813 8.492L46.537 10.252C44.8797 8.99067 43.2004 8.36 41.499 8.36C40.8244 8.36 40.2377 8.45533 39.739 8.646C39.2404 8.83667 38.8517 9.108 38.573 9.46C38.2944 9.79733 38.155 10.1933 38.155 10.648C38.155 11.2787 38.3677 11.7627 38.793 12.1C39.2184 12.4227 39.9224 12.6573 40.905 12.804L43.391 13.222C45.019 13.486 46.2144 13.9627 46.977 14.652C47.7397 15.3413 48.121 16.2873 48.121 17.49C48.121 18.4287 47.8644 19.2573 47.351 19.976C46.8377 20.68 46.119 21.23 45.195 21.626C44.271 22.022 43.2004 22.22 41.983 22.22ZM55.5801 22.198C54.4801 22.198 53.4827 21.9413 52.5881 21.428C51.7081 20.9147 51.0041 20.218 50.4761 19.338C49.9627 18.458 49.7061 17.4753 49.7061 16.39C49.7061 15.3193 49.9554 14.3513 50.4541 13.486C50.9527 12.606 51.6274 11.9093 52.4781 11.396C53.3287 10.868 54.2747 10.604 55.3161 10.604C56.3574 10.604 57.2814 10.868 58.0881 11.396C58.8947 11.9093 59.5327 12.6133 60.0021 13.508C60.4861 14.388 60.7281 15.3853 60.7281 16.5V17.116H51.9061C52.0234 17.732 52.2507 18.282 52.5881 18.766C52.9401 19.25 53.3801 19.6313 53.9081 19.91C54.4507 20.1887 55.0374 20.328 55.6681 20.328C56.2107 20.328 56.7314 20.2473 57.2301 20.086C57.7434 19.91 58.1687 19.6607 58.5061 19.338L59.9141 20.724C59.2541 21.2227 58.5721 21.5967 57.8681 21.846C57.1787 22.0807 56.4161 22.198 55.5801 22.198ZM51.9281 15.466H58.5501C58.4621 14.8793 58.2567 14.366 57.9341 13.926C57.6261 13.4713 57.2374 13.1193 56.7681 12.87C56.3134 12.606 55.8147 12.474 55.2721 12.474C54.7147 12.474 54.2014 12.5987 53.7321 12.848C53.2627 13.0973 52.8667 13.4493 52.5441 13.904C52.2361 14.344 52.0307 14.8647 51.9281 15.466ZM62.8234 22V6.6L65.0234 6.182V22H62.8234ZM67.6144 22V6.6L69.8144 6.182V22H67.6144ZM72.6694 22V6.6H79.6434C80.6701 6.6 81.5648 6.79067 82.3274 7.172C83.1048 7.55333 83.7061 8.08867 84.1314 8.778C84.5714 9.45267 84.7914 10.2447 84.7914 11.154C84.7914 12.166 84.5054 13.0387 83.9334 13.772C83.3614 14.5053 82.5914 15.0333 81.6234 15.356L85.0554 22H82.5034L79.3134 15.686H74.9794V22H72.6694ZM74.9794 13.75H79.4674C80.3768 13.75 81.1028 13.5227 81.6454 13.068C82.2028 12.5987 82.4814 11.968 82.4814 11.176C82.4814 10.4133 82.2028 9.79733 81.6454 9.328C81.1028 8.85867 80.3768 8.624 79.4674 8.624H74.9794V13.75ZM91.6094 22.198C90.5094 22.198 89.512 21.9413 88.6174 21.428C87.7374 20.9147 87.0334 20.218 86.5054 19.338C85.992 18.458 85.7354 17.4753 85.7354 16.39C85.7354 15.3193 85.9847 14.3513 86.4834 13.486C86.982 12.606 87.6567 11.9093 88.5074 11.396C89.358 10.868 90.304 10.604 91.3454 10.604C92.3867 10.604 93.3107 10.868 94.1174 11.396C94.924 11.9093 95.562 12.6133 96.0314 13.508C96.5154 14.388 96.7574 15.3853 96.7574 16.5V17.116H87.9354C88.0527 17.732 88.28 18.282 88.6174 18.766C88.9694 19.25 89.4094 19.6313 89.9374 19.91C90.48 20.1887 91.0667 20.328 91.6974 20.328C92.24 20.328 92.7607 20.2473 93.2594 20.086C93.7727 19.91 94.198 19.6607 94.5354 19.338L95.9434 20.724C95.2834 21.2227 94.6014 21.5967 93.8974 21.846C93.208 22.0807 92.4454 22.198 91.6094 22.198ZM87.9574 15.466H94.5794C94.4914 14.8793 94.286 14.366 93.9634 13.926C93.6554 13.4713 93.2667 13.1193 92.7974 12.87C92.3427 12.606 91.844 12.474 91.3014 12.474C90.744 12.474 90.2307 12.5987 89.7614 12.848C89.292 13.0973 88.896 13.4493 88.5734 13.904C88.2654 14.344 88.06 14.8647 87.9574 15.466ZM98.8527 26.488V10.802H101.031V11.88C101.969 11.044 103.113 10.626 104.463 10.626C105.519 10.626 106.472 10.8827 107.323 11.396C108.188 11.9093 108.87 12.5987 109.369 13.464C109.867 14.3293 110.117 15.3047 110.117 16.39C110.117 17.4753 109.86 18.458 109.347 19.338C108.848 20.2033 108.166 20.8927 107.301 21.406C106.45 21.9193 105.489 22.176 104.419 22.176C103.803 22.176 103.209 22.0807 102.637 21.89C102.065 21.6847 101.537 21.3987 101.053 21.032V26.488H98.8527ZM104.177 20.262C104.895 20.262 105.533 20.0933 106.091 19.756C106.663 19.4187 107.117 18.964 107.455 18.392C107.792 17.8053 107.961 17.1453 107.961 16.412C107.961 15.6787 107.792 15.0187 107.455 14.432C107.117 13.8453 106.663 13.3833 106.091 13.046C105.533 12.7087 104.895 12.54 104.177 12.54C103.546 12.54 102.959 12.6573 102.417 12.892C101.874 13.1267 101.419 13.4567 101.053 13.882V18.942C101.419 19.3527 101.874 19.6753 102.417 19.91C102.974 20.1447 103.561 20.262 104.177 20.262ZM117.54 22.22C116.455 22.22 115.465 21.9633 114.57 21.45C113.69 20.9367 112.993 20.24 112.48 19.36C111.967 18.48 111.71 17.4973 111.71 16.412C111.71 15.3267 111.967 14.344 112.48 13.464C112.993 12.584 113.69 11.8873 114.57 11.374C115.465 10.846 116.455 10.582 117.54 10.582C118.64 10.582 119.63 10.846 120.51 11.374C121.39 11.8873 122.087 12.584 122.6 13.464C123.113 14.344 123.37 15.3267 123.37 16.412C123.37 17.4973 123.113 18.48 122.6 19.36C122.087 20.24 121.39 20.9367 120.51 21.45C119.63 21.9633 118.64 22.22 117.54 22.22ZM117.54 20.284C118.229 20.284 118.853 20.1153 119.41 19.778C119.967 19.426 120.407 18.9567 120.73 18.37C121.053 17.7833 121.214 17.1233 121.214 16.39C121.214 15.6713 121.045 15.026 120.708 14.454C120.385 13.8673 119.945 13.398 119.388 13.046C118.845 12.694 118.229 12.518 117.54 12.518C116.851 12.518 116.227 12.694 115.67 13.046C115.127 13.398 114.687 13.8673 114.35 14.454C114.027 15.026 113.866 15.6713 113.866 16.39C113.866 17.1233 114.027 17.7833 114.35 18.37C114.673 18.9567 115.113 19.426 115.67 19.778C116.227 20.1153 116.851 20.284 117.54 20.284ZM125.45 22V10.802H127.65V12.232C128.002 11.704 128.435 11.2933 128.948 11C129.476 10.692 130.07 10.538 130.73 10.538C131.185 10.5527 131.559 10.6187 131.852 10.736V12.716C131.647 12.628 131.434 12.5693 131.214 12.54C130.994 12.496 130.774 12.474 130.554 12.474C129.909 12.474 129.337 12.65 128.838 13.002C128.34 13.3393 127.944 13.838 127.65 14.498V22H125.45ZM138.41 22.198C137.325 22.198 136.496 21.9487 135.924 21.45C135.352 20.9367 135.066 20.196 135.066 19.228V12.65H132.69V10.802H135.066V7.942L137.244 7.414V10.802H140.544V12.65H137.244V18.722C137.244 19.294 137.369 19.7047 137.618 19.954C137.882 20.1887 138.308 20.306 138.894 20.306C139.202 20.306 139.474 20.284 139.708 20.24C139.958 20.196 140.222 20.13 140.5 20.042V21.89C140.207 21.9927 139.862 22.066 139.466 22.11C139.085 22.1687 138.733 22.198 138.41 22.198ZM146.23 22.22C145.262 22.22 144.353 22.0807 143.502 21.802C142.666 21.5087 141.94 21.098 141.324 20.57L142.534 19.118C143.106 19.5727 143.693 19.9247 144.294 20.174C144.91 20.4087 145.533 20.526 146.164 20.526C146.956 20.526 147.601 20.372 148.1 20.064C148.599 19.756 148.848 19.3527 148.848 18.854C148.848 18.4433 148.701 18.1207 148.408 17.886C148.115 17.6513 147.66 17.49 147.044 17.402L145.02 17.116C143.905 16.9547 143.069 16.61 142.512 16.082C141.955 15.554 141.676 14.85 141.676 13.97C141.676 13.2953 141.859 12.7087 142.226 12.21C142.593 11.6967 143.106 11.3007 143.766 11.022C144.426 10.7287 145.196 10.582 146.076 10.582C146.883 10.582 147.66 10.6993 148.408 10.934C149.156 11.1687 149.875 11.5353 150.564 12.034L149.442 13.486C148.826 13.0753 148.225 12.7747 147.638 12.584C147.066 12.3933 146.487 12.298 145.9 12.298C145.225 12.298 144.683 12.4447 144.272 12.738C143.861 13.0167 143.656 13.3833 143.656 13.838C143.656 14.2487 143.795 14.5713 144.074 14.806C144.367 15.026 144.844 15.18 145.504 15.268L147.528 15.554C148.643 15.7153 149.486 16.06 150.058 16.588C150.63 17.1013 150.916 17.798 150.916 18.678C150.916 19.3527 150.711 19.9613 150.3 20.504C149.889 21.032 149.332 21.45 148.628 21.758C147.924 22.066 147.125 22.22 146.23 22.22ZM155.928 22L162.286 6.6H165.014L171.306 22H168.798L167.016 17.49H160.13L158.326 22H155.928ZM160.878 15.576H166.268L163.584 8.8L160.878 15.576ZM177.198 22.176C176.157 22.176 175.203 21.9193 174.338 21.406C173.473 20.8927 172.791 20.2033 172.292 19.338C171.793 18.458 171.544 17.4753 171.544 16.39C171.544 15.3047 171.793 14.3293 172.292 13.464C172.805 12.5987 173.495 11.9093 174.36 11.396C175.225 10.8827 176.186 10.626 177.242 10.626C177.858 10.626 178.452 10.7213 179.024 10.912C179.596 11.1027 180.124 11.3813 180.608 11.748V6.6L182.808 6.182V22H180.63V20.922C179.677 21.758 178.533 22.176 177.198 22.176ZM177.484 20.262C178.129 20.262 178.716 20.1447 179.244 19.91C179.787 19.6753 180.241 19.338 180.608 18.898V13.86C180.241 13.4493 179.787 13.1267 179.244 12.892C178.716 12.6427 178.129 12.518 177.484 12.518C176.78 12.518 176.142 12.6867 175.57 13.024C174.998 13.3613 174.543 13.8233 174.206 14.41C173.869 14.982 173.7 15.6347 173.7 16.368C173.7 17.1013 173.869 17.7613 174.206 18.348C174.543 18.9347 174.998 19.404 175.57 19.756C176.142 20.0933 176.78 20.262 177.484 20.262ZM185.413 22V10.802H187.613V11.88C188.449 11.0147 189.498 10.582 190.759 10.582C191.522 10.582 192.197 10.7507 192.783 11.088C193.385 11.4253 193.861 11.88 194.213 12.452C194.683 11.836 195.233 11.374 195.863 11.066C196.494 10.7433 197.205 10.582 197.997 10.582C198.833 10.582 199.559 10.7653 200.175 11.132C200.806 11.4987 201.297 12.012 201.649 12.672C202.016 13.332 202.199 14.0947 202.199 14.96V22H199.999V15.334C199.999 14.454 199.765 13.7647 199.295 13.266C198.841 12.7527 198.217 12.496 197.425 12.496C196.883 12.496 196.391 12.6207 195.951 12.87C195.511 13.1193 195.13 13.5007 194.807 14.014C194.837 14.1607 194.859 14.3147 194.873 14.476C194.888 14.6373 194.895 14.7987 194.895 14.96V22H192.717V15.334C192.717 14.454 192.483 13.7647 192.013 13.266C191.559 12.7527 190.935 12.496 190.143 12.496C189.615 12.496 189.139 12.6133 188.713 12.848C188.288 13.068 187.921 13.4053 187.613 13.86V22H185.413ZM204.728 22V10.802H206.928V22H204.728ZM205.828 8.998C205.461 8.998 205.146 8.866 204.882 8.602C204.618 8.32333 204.486 8.00067 204.486 7.634C204.486 7.25267 204.618 6.93733 204.882 6.688C205.146 6.424 205.461 6.292 205.828 6.292C206.209 6.292 206.532 6.424 206.796 6.688C207.06 6.93733 207.192 7.25267 207.192 7.634C207.192 8.00067 207.06 8.32333 206.796 8.602C206.532 8.866 206.209 8.998 205.828 8.998ZM209.519 22V10.802H211.719V11.946C212.584 11.0367 213.706 10.582 215.085 10.582C215.95 10.582 216.705 10.7653 217.351 11.132C218.011 11.4987 218.524 12.012 218.891 12.672C219.272 13.332 219.463 14.0947 219.463 14.96V22H217.263V15.334C217.263 14.454 217.013 13.7647 216.515 13.266C216.031 12.7527 215.349 12.496 214.469 12.496C213.882 12.496 213.354 12.6207 212.885 12.87C212.415 13.1193 212.027 13.4787 211.719 13.948V22H209.519Z" fill="#1A1A1B"/>
                        <defs>
                        <clipPath id="clip0_1426_310">
                        <rect width="27.2077" height="27" fill="white" transform="translate(0 1)"/>
                        </clipPath>
                        </defs>
                    </svg>
                </div>
                <NavOptionIcon className='admin_nav_button_responded' onClick={() => handleNavOpener()}/>
            </div>
            <div className="sellreports_admin_content_cover_main_frame">
                <div className={`sellreports_admin_nav_frame ${navOpener ? 'open' : null}`}>
                    <div className="sellreports_admin_page_link_frame">
                        <div className="sellreports_admin_page_link_button Pre_KR_Normal" onClick={() => handlePageChange('dashboard')} style={{marginTop:'0px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <mask id="mask0_1426_306" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <rect width="24" height="24" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_1426_306)">
                                <path d="M5.30775 20.5C4.80908 20.5 4.38308 20.3234 4.02975 19.9703C3.67658 19.6169 3.5 19.1909 3.5 18.6923V5.30775C3.5 4.80908 3.67658 4.38308 4.02975 4.02975C4.38308 3.67658 4.80908 3.5 5.30775 3.5H18.6923C19.1909 3.5 19.6169 3.67658 19.9703 4.02975C20.3234 4.38308 20.5 4.80908 20.5 5.30775V18.6923C20.5 19.1909 20.3234 19.6169 19.9703 19.9703C19.6169 20.3234 19.1909 20.5 18.6923 20.5H5.30775ZM12.75 12.75V19H18.6923C18.7821 19 18.8558 18.9712 18.9135 18.9135C18.9712 18.8558 19 18.7821 19 18.6923V12.75H12.75ZM12.75 11.25H19V5.30775C19 5.21792 18.9712 5.14417 18.9135 5.0865C18.8558 5.02883 18.7821 5 18.6923 5H12.75V11.25ZM11.25 11.25V5H5.30775C5.21792 5 5.14417 5.02883 5.0865 5.0865C5.02883 5.14417 5 5.21792 5 5.30775V11.25H11.25ZM11.25 12.75H5V18.6923C5 18.7821 5.02883 18.8558 5.0865 18.9135C5.14417 18.9712 5.21792 19 5.30775 19H11.25V12.75Z" fill="#1A1A1B"/>
                                </g>
                            </svg>
                            대시보드
                        </div>
                        <div className="sellreports_admin_page_link_button Pre_KR_Normal" onClick={() => handlePageChange('user_management')} style={{marginTop:'16px'}}>
                            <UserIcon />
                            유저관리
                        </div>
                        <div className="sellreports_admin_page_link_button Pre_KR_Normal" onClick={() => handlePageChange('community_management')} style={{marginTop:'16px'}}>
                            <CommunityIcon />
                            커뮤니티 관리
                        </div>
                        <div className="sellreports_admin_page_link_button Pre_KR_Normal" onClick={() => handlePageChange('community_management')}>
                            <CommunityViolationIcon />
                            커뮤니티 신고
                        </div>
                        <div className="sellreports_admin_page_link_button Pre_KR_Normal" onClick={() => handlePageChange('report_market_management')} style={{marginTop:'16px'}}>
                            리포트마켓 관리
                        </div>
                        <div className="sellreports_admin_page_link_button Pre_KR_Normal" onClick={() => handlePageChange('report_purchase_record')} style={{marginTop:'16px'}}>
                            <PurchaseRecordIcon />
                            리포트 결제내역
                        </div>
                        <div className="sellreports_admin_page_link_button Pre_KR_Normal" onClick={() => handlePageChange('profit_withdrawal_record')} >
                            <ProfitWithdrawalIcon />
                            수익금 출금요청내역
                        </div>
                        <div className="sellreports_admin_page_link_button Pre_KR_Normal" onClick={() => handlePageChange('inquiry_management')} style={{marginTop:'16px'}}>
                            <InquiryIcon />
                            1:1문의
                        </div>
                        <div className="sellreports_admin_page_link_button Pre_KR_Normal" onClick={() => handlePageChange('announcement_management')}>
                            <AnnouncementIcon />
                            공지사항
                        </div>
                        <div className="sellreports_admin_page_link_button Pre_KR_Normal" onClick={() => handlePageChange('company_policy_management')}>
                            <PolicyIcon />
                            이용/개인정보약관
                        </div>
                        <div className="sellreports_admin_page_link_button Pre_KR_Normal" onClick={() => handlePageChange('company_announcement_managemet')} style={{marginTop:'16px'}}>
                            <CompanyAnnouncementIcon />
                            회사 공고
                        </div>
                    </div>
                </div>
                <div className="sellreports_admin_main_content_frame">
                    <Suspense fallback={<SuspenseUI />}>    
                        {adminPage === 'dashboard' && (
                            <AdminDashboard />
                        )}

                        {/* User Management */}
                        {adminPage === 'user_management' && (
                            <AdminUser setAdminPage={handleUserManagementPage}/>
                        )}
                        {adminPage === 'user_management_detail' && (
                        <AdminUserDetail user_id={userID}/>
                        )}
        
                        {/* Community Management */}
                        {adminPage === 'community_management' && (
                            <AdminCommunity setAdminPage={handleCommunityManagementPage}/>
                        )}
                        {adminPage === 'community_management_detail' && (
                            <AdminCommunityDetail article_id={articleID}/>
                        )}

                        {/* Report Management */}
                        {adminPage === 'report_market_management' && (
                            <ReportMarketManagement setAdminPage={handelReportManagementPage}/>
                        )}
                        {adminPage === 'report_market_management_detail' && (
                            <ReportMarketManagementDetail report_id={reportID}/>
                        )}

                        {adminPage === 'report_purchase_record' && (
                            <ReportPurchaseRecord />
                        )}
                        {adminPage === 'profit_withdrawal_record' && (
                            <AdminProfitWithdrawalRecord />
                        )}

                        {/* inquiry management */}
                        {adminPage === 'inquiry_management' && (
                            <AdminInquiryManagement setAdminPage={handleInquiryManagementPage}/>
                        )}
                        {adminPage === 'inquiry_management_detail' && (
                            <AdminInquiryManagementDetail inquiry_id={inquiryID}/>
                        )}


                        {/* announcement management */}
                        {adminPage === 'announcement_management' && (
                            <AdminAnnouncement setAdminPage={handleAnnouncementManagementPage}/>
                        )}
                        {adminPage === 'announcement_management_detail' && (
                            <AdminAnnouncementDetail 
                            announcement_id={announcementID}
                            announcementPageType={announcementPageType}/>
                        )}

                        {/* company policy management */}
                        {adminPage === 'company_policy_management' && (
                            <AdminPolicy setAdminPage={handlePolicyPage}/>
                        )}
                        {adminPage === 'company_policy_detail' && (
                            <AdminPolicyDetail 
                                policy_id={policyID}
                                policy_type={policyPageType}/>
                        )}

                        {/* company announcement management */}
                        {adminPage === 'company_announcement_managemet' && (
                            <AdminCompanyAnnouncement setAdminPage={handleCompanyAnnouncementPage}/>
                        )}
                        {adminPage === 'company_announcement_detail' && (
                            <AdminCompanyAnnouncementDetail 
                                company_announcement_id={companyAnnouncementID}
                                company_announcement_page={companyAnnouncementPage}/>
                        )}
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default CustomAdmin