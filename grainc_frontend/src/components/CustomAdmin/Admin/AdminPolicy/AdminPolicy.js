import React, { useEffect, useState } from "react";
import '../../../../static/css/CustomAdmin/Admin/AdminPolicy/AdminPolicy.css'
import Pagination from "../../../Global/Pagination";
import useAxios from "../../../../axiosAPIClient";
const AdminPolicy = ({setAdminPage}) => {
    const apiClient = useAxios();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [searchKW, setSearchKw] = useState('');
    const handelSearchButton = () => {
        setCurrentPage(1);
        fetchPolicy();
    }
    const handelPageChange = (page) => {
        setCurrentPage(page)
    }

    const [policyPage, setPolicyPage] = useState('company');

    const [policy, setPolicy] = useState([]);
    
    const fetchPolicy = async () => {
        try {
            const response = await apiClient.get(`/custom_admin_company_policy/?page=${currentPage}&kw=${searchKW}&type=${policyPage}`)
            const data = response.data
            setPolicy(data.policy);
            setCurrentPage(data.current_page);
            setMaxPage(data.max_page);
        } catch(error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchPolicy();
    }, [currentPage, policyPage]);
    
    if (loading) {
        return (
            <div>로딩중 ....</div>
        )
    }

    return (
        <div className="admin_page_main_cover">
            <div className="admin_page_indicator Pre_KR_Normal">
                {policyPage === 'company' ? '이용약관' : '개인정보처리방침'}
            </div>
            <div className="admin_page_policy_type_button_frame">
                <a className={`admin_policy_type_button Pre_KR_Normal 
                    ${policyPage === 'company' ? 'selected' : null}`}
                    onClick={() => setPolicyPage('company')}>
                    이용약관
                </a>
                <a className={`admin_policy_type_button Pre_KR_Normal 
                    ${policyPage === 'privacy' ? 'selected' : null}`}
                    onClick={() => setPolicyPage('privacy')}>
                    개인정보처리방침
                </a>
                {policyPage === 'company' && (
                    <a className="admin_policy_type_button Pre_KR_Normal" style={{marginLeft:'auto'}}
                    onClick={() => setAdminPage(null, 'new_company_policy')}>새 이용약관</a>
                )}
                {policyPage === 'privacy' && (
                    <a className="admin_policy_type_button Pre_KR_Normal" style={{marginLeft:'auto'}}
                    onClick={() => setAdminPage(null, 'new_privacy_policy')}>새 개인정보처리방침</a>
                )}
            </div>
            <div className="admin_search_bar_base_main_content_frame">
                <table className="admin_policies_table Pre_KR_Normal">
                    <thead>
                        <tr>
                            <th>약관 종류</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {policy.map((policy, index) => (
                            <tr key={index} onClick={() => setAdminPage(policy.id, policyPage)}>
                                <th>{ policyPage }</th>
                                <th>{ policy.formatted_date }</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination page={currentPage} max_page={maxPage} handelPage={handelPageChange}/>
            </div>
        </div>
    );
};

export default AdminPolicy