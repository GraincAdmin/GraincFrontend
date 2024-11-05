import React from "react";
import '../../../static/css/ReportMarket/Market/Report_Market_Main_Filter.css'
import { ReactComponent as FilterIcon } from '../../../static/assets/GlobalIcon/CategoryIcon.svg'
import { ReactComponent as ReloadIcon } from '../../../static/assets/GlobalIcon/Arrow_Reload_02.svg'
import { ReactComponent as HorizontalDividerIcon } from '../../../static/assets/GlobalIcon/Line_M.svg'
import { ReactComponent as CloseIcon } from '../../../static/assets/GlobalIcon/Close_LG.svg'
import { ReactComponent as Checkbox_Unchecked } from '../../../static/assets/GlobalIcon/Checkbox_Unchecked.svg'
import { ReactComponent as Checkbox_Checked } from '../../../static/assets/GlobalIcon/Checkbox_Check.svg'
function ReportMarketMainFilter({
    // style
    style,
    styleHandle,
    // category
    MainCategory,
    categoryAdd,

    // price,
    priceRangeUp,
    priceRangeLow,
    setPriceRangeUp,
    setPriceRangeLow,
    applyPriceRange,

    // Filter Reset
    filterReset
    }) {

    const reportMarketCategory = [
        '국내기업',
        '해외기업',
        '부동산',
        '암호화폐',
        '투자전략',
        '시장',
        '경제',
        '채권',
        '파생',
    ]

    const renderCategoryCheckBox = () => {
        let categoryCheckBox = []
        
        reportMarketCategory.forEach(category => {
            categoryCheckBox.push(
                <div className="report_market_main_category_selection" onClick={() => categoryAdd(category)}>
                    {MainCategory.includes(category) ? (
                        <Checkbox_Checked />
                    ) : (
                        <Checkbox_Unchecked />
                    )}
                    <span className="Pre_KR_Normal">{category}</span>
                </div>
            )
        })
        return (categoryCheckBox)
    }


    const handlePriceRangeLowChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value == 0) {
            console.log(1)
            setPriceRangeLow('');
        } else {
            setPriceRangeLow(value);
        }
    };

    const handlePriceRangeUpChange = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value == 0) {
            setPriceRangeUp('');
        } else {
            setPriceRangeUp(value);
        }
    };


    return (
        <div className={`report_market_main_filter_main_frame_mobile ${style ? 'open' : null}`}>
            <div className={`report_market_main_filter_main_frame ${style ? 'open' : null}`}>
                <div className="report_market_main_filter_close_frame_mobile" onClick={() => styleHandle()}>
                    <div className="report_market_main_filter_button">
                        <CloseIcon />
                    </div>
                </div>
                <div className="report_market_main_filter_header_frame">
                    <div className="report_market_filter_indicator Pre_KR_SemiBold">
                        <FilterIcon />
                        필터
                    </div>
                    <div className="report_market_main_filter_button" onClick={() => filterReset()}>
                        재설정
                        <ReloadIcon />
                    </div>
                </div>
                <div className="report_market_main_filter_section">
                    <div className="report_market_main_filter_section_title Pre_KR_SemiBold">카테고리 다중 선택</div>
                    <div className="report_market_main_category_selection_frame">
                        {renderCategoryCheckBox()}
                    </div>
                </div>
                <div className="report_market_main_filter_section" style={{borderBottom: '0px'}}>
                    <div className="report_market_main_filter_section_title Pre_KR_SemiBold">가격</div>
                    <div className="report_market_main_price_range_filter_frame">
                        <div className="report_market_main_price_filter Pre_KR_Medium">
                            <input 
                                className="Pre_KR_Medium" 
                                placeholder="0"
                                value={priceRangeLow}
                                onChange={handlePriceRangeLowChange}
                            />
                            <span>만원</span>
                        </div>
                        <HorizontalDividerIcon />
                        <div className="report_market_main_price_filter Pre_KR_Medium">
                            <input  
                                className="Pre_KR_Medium" 
                                placeholder="0"
                                value={priceRangeUp}
                                onChange={handlePriceRangeUpChange}
                            />
                            <span>만원</span>
                        </div>
                    </div>
                    <div className="report_market_main_price_filter_apply Pre_KR_Medium" onClick={() => applyPriceRange()}>적용하기</div>
                </div>
            </div>
        </div>
    );
};

export default ReportMarketMainFilter