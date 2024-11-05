
import React, { useEffect, useState } from "react";
import '../../static/css/Policy/Policy.css'
import SituationalNavM from "../SellReportsBase/Situational_Nav_Mobile/SituationalNavM";
import useAxios from "../../axiosAPIClient";
function PrivacyPolicy() {
    const apiClient = useAxios()
    const [privacyPolicyID, setPrivacyPolicyID] = useState(null);
    const [privacyPolicy, setPrivacyPolicy] = useState();
    const [privacyPolicyList, setPrivacyPolicyList] = useState([]);

    const fetchPrivacyPolicy = async () => {
        try {
            const response = await apiClient.get(`/get_privacy_policy/?policy_id=${privacyPolicyID}`)
            const data = response.data
            setPrivacyPolicy(data.policy)
            setPrivacyPolicyList(data.policy_selector)

        } catch(error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchPrivacyPolicy();
    }, [privacyPolicyID]);

    const handleSelectChange = (event) => {
        setPrivacyPolicyID(event.target.value);
    };


    return (
        <>
            <SituationalNavM page={'개인정보 처리방침'} />
            <div className="sellreports_policy_frame">
                <div class="sellreports_policy_title_frame Pre_KR_Medium">개인정보 처리방침</div>
                <select 
                    className="sellreports_policy_select" 
                    onChange={handleSelectChange} 
                    value={privacyPolicyID || ""}>
                    {privacyPolicyList.length !== 0 && (
                        privacyPolicyList.map(policies => (
                            <option 
                                key={policies.policy_id} 
                                value={policies.policy_id}>
                                {policies.create_date}
                            </option>
                        ))
                    )}
                </select>
                <div class="sellreports_policy_sub_title_frame Pre_KR_Normal">주식회사 그레인크 개인정보 처리방침</div>

                {privacyPolicy && (
                    <div className="sellreports_policy_content_frame Pre_KR_Normal" dangerouslySetInnerHTML={{__html: privacyPolicy.formatted_policy_content}}>
            
                    </div>
                )}
            </div>
        </>
    );
}

export default PrivacyPolicy