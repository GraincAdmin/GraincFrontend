import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../static/css/CategoryNav.css'

//report market

function CategoryNav() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentCategory = queryParams.get('category');

    const categories = [
        '국내기업',
        '해외기업',
        '부동산',
        '암호화폐',
        '투자전략',
        '시장',
        '산업',
        '경제',
        '채권',
        '파생',
    ];

    function buildCategoryNavButton() {
        const buttons = [];
        categories.forEach(category => {
            buttons.push(
                <Link className={
                    `category_nav_button Pre_KR_Medium 
                    ${currentCategory === category ? 'selected' : null}`} 
                    to={`/community?category=${category}`}
                >
                    {category}
                </Link>
            )
        });
        return buttons;
    };
    

    return (
        <div className="category_nav_bar">
            <div className="category_nav_button_frame">
                {buildCategoryNavButton()}
            </div>
        </div>
    );
};


export default CategoryNav