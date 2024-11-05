import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from 'react';
// Import components
import Nav from './components/Nav';
import Home from './components/SellReportsBase/Home';
import Footer from './components/Footer';
import MobileNav from './components/Mobile_Nav';
import SuspenseUI from './SuspenseUI';
import Maintenance from './components/Maintenance';
// import NotificationAllow from './components/SellReportsBase/Notification/NotificationAllow';
// import MobilePWAAllow from './components/SellReportsBase/Notification/MobilePWAAllow';
// Context Provider
import { AuthProvider } from "./context/AuthContext";
import { NavContextProvider } from './context/NavContext';

// global dialog state management
import LoginRequest from './components/Global/LoginRequest';
import ViolationAnnouncement from './components/SellReportsBase/ViolationPop/ViolationAnnouncement';
import SnackBar from './components/SellReportsBase/SnackBar/SnackBar';

// Auth
const Login = lazy(() => import('./components/AuthUser/Login'));
const Signup = lazy(() => import('./components/AuthUser/Signup'));
// Social Login
const GoogleLoginLoading = lazy(() => import('./components/AuthUser/SocialLogin_Redirection_Page/GoogleLoginLoading'))
const NaverLoginLoading = lazy(() => import('./components/AuthUser/SocialLogin_Redirection_Page/NaverLoginLoading'))
const KakaoLoginLoading = lazy(() => import('./components/AuthUser/SocialLogin_Redirection_Page/KakaoLoginLoading'))

const PasswordReset = lazy(() => import('./components/AuthUser/PasswordReset'))
// NotificationApp.js

const Notification = lazy(() => import('./components/SellReportsBase/Notification/Notification'));

// Community
const Community_Base = lazy(() => import('./components/Community/Community_Base'));
const Community_Article_Main = lazy(() => import('./components/Community/Community_Article/Community_Article_Main'));
const CommunityArticleCommentPage = lazy(() => import('./components/Community/Community_Article/Community_Article_Comments'));
const CommunityArticleUpload = lazy(() => import('./components/Community/Community_Article_Upload'));
const SubscribingContent = lazy(() => import('./components/Community/Subscription/SubscribingContent'))

// ReportMarket
const ReportDetail = lazy(() => import('./components/ReportMarket/Report_Detail/Report_Detail'));
const ReportMarket = lazy(() => import('./components/ReportMarket/Market/Report_Market'));
const ReportReviewPage = lazy(() => import('./components/ReportMarket/Report_Detail/Report_Review_Page'))
const ReportUpload = lazy(() => import('./components/ReportMarket/Report_Upload'))

// Profile
const UserProfile = lazy(() => import('./components/SellReportsBase/UserProfile/UserProfile'));

// SearchPage
const SearchedResults = lazy(() => import('./components/SellReportsBase/Search/Searched_Results'));

// Bookmark
const Bookmark = lazy(() => import('./components/SellReportsBase/Bookmark/Bookmark'));
const BookmarkCommunity = lazy(() => import('./components/SellReportsBase/Bookmark/BookmarkArticle'));

// MyPage
const MyPage = lazy(() => import('./components/SellReportsBase/MyPage/MyPage'));
const MyProfileEdit = lazy(() => import('./components/SellReportsBase/MyPage/MyProfileEdit'));

// Inquiry
const Inquiry = lazy(() => import('./components/Inquiry/Inquiry'));

// Announcement
const Announcement = lazy(() => import('./components/Announcement/Announcement'));

// Policy
const CompanyPolicy = lazy(() => import('./components/Policy/CompanyPolicy'));
const PrivacyPolicy = lazy(() => import('./components/Policy/PrivacyPolicy'));

// Company
const CompanyIntroduction = lazy(() => import('./components/Company/CompanyIntroduction'));
const CompanyAnnouncement = lazy(() => import('./components/Company/CompanyAnnouncement'));
const CompanyAnnouncementDetail = lazy(() => import('./components/Company/CompanyAnnouncementDetail'));

// Membership
const MembershipSubscription = lazy(() => import('./components/SellReportsBase/Membership/MembershipSubscription'))

// CustomAdmin
const CustomAdmin = lazy(() => import('./components/CustomAdmin/CustomAdminMain'));
function App() {
  const location = useLocation();

  
  return (
    <>
      <AuthProvider>
        <NavContextProvider>
          <LoginRequest />
          <ViolationAnnouncement />
          <SnackBar />
          {location.pathname !== '/company' &&
            !location.pathname.includes('/company_announcement') && 
            !location.pathname.includes('/sellreports_admin') && 
            !location.pathname.includes('/community_article_upload') && 
            <Nav situationalNav={
              location.pathname.includes('/bookmark') || 
              location.pathname.includes('/notification') ||
              location.pathname.includes('/company_policy') ||
              location.pathname.includes('/privacy_policy') ||
              location.pathname.includes('/announcement') ||
              location.pathname.includes('/mypage') ||
              location.pathname.includes('/my_profile_edit') ||
              location.pathname.includes('/subscribing_content') ||
              location.pathname.includes('/search') ||
              location.pathname.includes('/inquiry')}/>}
            <Maintenance />
          <Suspense fallback={<SuspenseUI />}>
            <Routes>
              {/* base urls */}
              <Route path="/" element={<Home />} />

              {/* AuthUser */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Social Login CallBack */}
              <Route path='/login/google/callback' element={<GoogleLoginLoading />} />
              <Route path='/login/naver/callback' element={<NaverLoginLoading />} />
              <Route path='/login/kakao/callback' element={<KakaoLoginLoading />} />

              {/* password reset */}
              <Route path="/password_reset" element={<PasswordReset />} />
              {/* Notification */}
              <Route path="/notification" element={<Notification />} />

              {/* community urls */}
              <Route path='/community' element={<Community_Base />} />
              <Route path='/community_detail/:article_id' element={<Community_Article_Main />} />
              <Route path='/community_comments/:article_id' element={<CommunityArticleCommentPage />} />
              <Route path='/community_article_upload/:upload_type' element={<CommunityArticleUpload />} />
              <Route path='/subscribing_content' element={<SubscribingContent />} />

              {/* report market urls */}
              <Route path='/report_market' element={<ReportMarket />} />
              <Route path='/report_detail/:report_id' element={<ReportDetail />} />
              <Route path='/report_review/:report_id' element={<ReportReviewPage />} />
              <Route path='/report_upload/:upload_type' element={<ReportUpload />} />

              {/* user profile url */}
              <Route path='/profile/:user_id' element={<UserProfile />} />

              {/* searched results */}
              <Route path='/search' element={<SearchedResults />} />

              {/* Bookmark */}
              <Route path='/bookmark' element={<Bookmark />} />
              <Route path='/bookmark_community/:folder_id' element={<BookmarkCommunity />} />

              {/* MyPage */}
              <Route path='/mypage' element={<MyPage />} />
              <Route path='/my_profile_edit' element={<MyProfileEdit />} />

              {/* Inquiry */}
              <Route path='/inquiry' element={<Inquiry />} />

              {/* Announcement */}
              <Route path='/announcement/:page_type' element={<Announcement />} />

              {/* Policy */}
              <Route path='/company_policy' element={<CompanyPolicy />} />
              <Route path='/privacy_policy' element={<PrivacyPolicy />} />

              {/* Company */}
              <Route path='/company' element={<CompanyIntroduction />} />
              <Route path='/company_announcement' element={<CompanyAnnouncement />} />
              <Route path='/company_announcement_detail/:announcement_id' element={<CompanyAnnouncementDetail />} />

              {/* Membership Subscription */}

              <Route path='/membership_subscription' element={<MembershipSubscription />} />

              {/* Custom Admin */}
              <Route path='/sellreports_admin' element={<CustomAdmin />} />
            </Routes>
          </Suspense>
          <MobileNav situationalClose={
            location.pathname.includes('/community_detail') ||
            location.pathname.includes('/report_detail') ||
            location.pathname.includes('/mypage') ||
            location.pathname.includes('/my_profile_edit') ||
            location.pathname.includes('/community_article_upload') ||
            location.pathname.includes('/sellreports_admin')
          }/>
          {!location.pathname.includes('/report_upload') && 
            !location.pathname.includes('/community_article_upload') &&
            !location.pathname.includes('/sellreports_admin') && (
            <Footer marginOption={
              location.pathname === '/login' ||
              location.pathname === '/signup' ||
              location.pathname === '/password_reset' ||
              location.pathname === '/password_reset_final' ||
              location.pathname === '/password_reset_email_verification' ||
              location.pathname === '/sellreports_admin' ||
              location.pathname === '/notification' ||
              location.pathname === '/login/google/callback' ||
              location.pathname === '/login/naver/callback' || 
              location.pathname === '/login/kakao/callback' ||
              location.pathname === '/login/username_register'
            } />
          )}
        </NavContextProvider>
      </AuthProvider> 
    </>
  );
}

export default App;