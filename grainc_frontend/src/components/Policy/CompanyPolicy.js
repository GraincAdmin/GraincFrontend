import React, { useEffect, useState } from "react";
import '../../static/css/Policy/Policy.css'
import useAxios from "../../axiosAPIClient";
import SituationalNavM from "../SellReportsBase/Situational_Nav_Mobile/SituationalNavM";
function CompanyPolicy() {
    const apiClient = useAxios()
    const [companyPolicyID, setCompanyPolicyID] = useState(null);
    const [companyPolicy, setCompanyPolicy] = useState();
    const [companyPolicyList, setCompanyPolicyList] = useState([]);

    const fetchCompanyPolicy = async () => {
        try {
            const response = await apiClient.get(`/get_company_policy/?policy_id=${companyPolicyID}`)
            const data = response.data
            setCompanyPolicy(data.policy)
            setCompanyPolicyList(data.policy_selector)

        } catch(error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchCompanyPolicy();
    }, [companyPolicyID]);

    const handleSelectChange = (event) => {
        setCompanyPolicyID(event.target.value);
    };


    return (
        <>
            <SituationalNavM page={'이용약관'}/>
            <div className="sellreports_policy_frame">
                <div className="sellreports_policy_title_frame Pre_KR_Medium">이용약관</div>
                <select 
                    className="sellreports_policy_select" 
                    onChange={handleSelectChange} 
                    value={companyPolicyID || ""}>
                    {companyPolicyList.length !== 0 && (
                        companyPolicyList.map(policies => (
                            <option 
                                key={policies.policy_id} 
                                value={policies.policy_id}>
                                {policies.create_date}
                            </option>
                        ))
                    )}
                </select>
                <div className="sellreports_policy_sub_title_frame Pre_KR_Normal">주식회사 그레인크 이용약관</div>
                
                {companyPolicy && (
                    <div className="sellreports_policy_content_frame Pre_KR_Normal" dangerouslySetInnerHTML={{__html: companyPolicy.formatted_policy_content}}>
            
                    </div>
                )}
            </div>
        </>
    );
}

export default CompanyPolicy