import React, { useEffect, useState } from "react";
import '../../../../static/css/CustomAdmin/AdminGlobal/SellReportsAdminSearchBarBase.css'
import useAxios from "../../../../axiosAPIClient";
import Pagination from "../../../Global/Pagination";
const AdminUser = ({setAdminPage}) => {
    const apiClient = useAxios();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [searchKW, setSearchKw] = useState('');
    const handelSearchButton = () => {
        setCurrentPage(1);
        fetchUserInformation();
    }

    const [users, setUsers] = useState([]);


    const handelPageChange = (page) => {
        setCurrentPage(page)
    }

    const fetchUserInformation = async () => {
        try {
            const response = await apiClient.get(`/custom_admin_user_management/?page=${currentPage}&kw=${searchKW}`);
            const data = response.data;
            setUsers(data.users);
            setCurrentPage(data.current_page);
            setMaxPage(data.max_page);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserInformation();
    }, [currentPage]);
    
    if (loading) {
        return (
            <div>로딩중 ....</div>
        )
    }

    return (
        <div class="admin_search_bar_page_main_cover_frame">
            <div class="admin_page_indicator Pre_KR_Normal">유저관리</div>
            <div class="admin_page_search_bar_main_frame">
                <input class="admin_page_search_bar Pre_KR_Normal" onChange={(e) => setSearchKw(e.target.value)}  placeholder="유저검색 (닉네임, 이메일, 이름, 전화번호)" />
                <div class="admin_page_search_button Pre_KR_Normal" onClick={() => handelSearchButton()}>검색하기</div>
            </div>
            <div class="admin_search_bar_base_main_content_frame">
                <table class="Pre_KR_Normal">
                    <thead>
                        <tr>
                            <th>유저 아이디</th>
                            <th>유저 이메일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} onClick={() => setAdminPage(user.id)}>
                                <th>{ user.username }</th>
                                <th>{ user.email }</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination page={currentPage} max_page={maxPage} handelPage={handelPageChange}/>
            </div>
        </div>
    );
};

export default AdminUser