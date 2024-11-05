import React from 'react';
import '../../static/css/Global/Pagination.css';

function Pagination({ page, max_page, handelPage }) {
    const currentPageStyle = { backgroundColor: 'rgba(0, 102, 255, 0.05)', color: '#0066FF' };

    // Example adjustment using type conversion
    const handlePageChange = (pageNumber) => {
        handelPage(parseInt(pageNumber)); // Ensure pageNumber is converted to integer if necessary
    };
    const handleReducePageNumber = () => {
        const page_calc = parseInt(page) - 1;
        if (page_calc !== 0) {
            handelPage(parseInt(page_calc))
        }
    };
    const handleAddPageNumber = () => {
        const page_calc = parseInt(page) + 1;
        if (page_calc <= max_page) {
            handelPage(page_calc);
        }
    };
    const renderPaginationButtons = () => {
        const buttons = [];
        const rangeStart = Math.max(1, page - 3);
        const rangeEnd = Math.min(max_page, page + 3);

        for (let i = rangeStart; i <= rangeEnd; i++) {
            buttons.push(
                <a
                    key={i}
                    className="sell_report_pagination_button Pre_KR_Normal"
                    style={page == i ? currentPageStyle : null} // Using loose equality here
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </a>
            );
        }

        return buttons;
    };


    return (
        <div className="sell_report_pagination_main_frame">
            <a className="sell_report_pagination_button" onClick={() => handleReducePageNumber()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_1317_4841" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_1317_4841)">
                        <path d="M14.0004 17.6532L8.34668 11.9995L14.0004 6.3457L15.0542 7.39945L10.4542 11.9995L15.0542 16.5995L14.0004 17.6532Z" fill="#1A1A1B" />
                    </g>
                </svg>
            </a>
            <div className="sell_report_pagination_buttons_cover">
                {renderPaginationButtons()}
            </div>
            <a className="sell_report_pagination_button" onClick={() => handleAddPageNumber()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_1317_4805" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_1317_4805)">
                        <path d="M12.9467 11.9995L8.34668 7.39945L9.40043 6.3457L15.0542 11.9995L9.40043 17.6532L8.34668 16.5995L12.9467 11.9995Z" fill="#1A1A1B" />
                    </g>
                </svg>
            </a>
        </div>
    );
}

export default Pagination;
