import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../../../static/css/SellReportsBase/Situational_Nav_Mobile/SituationalNavSearchM.css';
// icon
import { ReactComponent as PreviousIcon } from '../../../static/assets/GlobalIcon/SituationalNavPrevious.svg';
import { ReactComponent as SearchIcon } from '../../../static/assets/GlobalIcon/Search.svg';

const SituationalNavSearchM = () => {
    const navigate = useNavigate();
    // Get search keyword from URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchedKw = queryParams.get('kw');

    const [searchKw, setSearchKw] = useState(searchedKw);

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        if (searchKw.trim()) {
            navigate(`/search?kw=${encodeURIComponent(searchKw)}`); // Navigate to search with the query parameter
        }
    };

    return (
        <div className="situational_nav_search_cover_frame">
            <div className="situational_nav_search_m">
                <div
                    className="situational_nav_search_previous_button"
                    onClick={() => navigate(-1)}
                >
                    <PreviousIcon style={{ width: '24px', height: '24px' }} />
                </div>
                <form className="situational_nav_search" onSubmit={handleSearch}>
                    <input
                        className="situational_nav_search_input"
                        value={searchKw}
                        onChange={(e) => setSearchKw(e.target.value)}
                    />
                    <SearchIcon
                        style={{ width: '24px', height: '24px', stroke: '#616161' }}
                        onClick={handleSearch}
                    />
                </form>
            </div>
        </div>
    );
};

export default SituationalNavSearchM;
