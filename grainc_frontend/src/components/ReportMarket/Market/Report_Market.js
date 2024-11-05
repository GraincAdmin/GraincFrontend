import React, { useEffect, useState } from "react";
import '../../../static/css/ReportMarket/Market/Report_Market.css'
import useAxios from "../../../axiosAPIClient";
import NoContent from "../../Global/NoContent";
import Pagination from "../../Global/Pagination";
import SkeletonReport from '../../SellReportsBase/Skeleton_UI/SkeletonReport'


// SVG Icon
import { ReactComponent as SearchIcon } from '../../../static/assets/GlobalIcon/Search.svg';
import { ReactComponent as OrderByIcon } from '../../../static/assets/GlobalIcon/OrderByIcon.svg';
import { ReactComponent as CloseIcon } from '../../../static/assets/GlobalIcon/Close_LG.svg';
import { ReactComponent as DropdownIcon } from '../../../static/assets/GlobalIcon/Caret_Down_MD.svg';
import { ReactComponent as FilterIcon } from '../../../static/assets/GlobalIcon/CategoryIcon.svg'

// Report 
import ReportMarketMainFilter from "./Report_Market_Main_Filter";
import ReportMarketBase from "../Report_Market_Base";
import ReportProduct from "../Global/ReportProduct";
import { useLocation, useNavigate } from "react-router-dom";

function ReportMarket() {
    const apiClient = useAxios();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (category[0] === '') {
            setCategory([])
        }
    })

    const [reports, setReports] = useState([]);
    const [searchedReportsCount, setSearchedReportsCount] = useState(0);
    const [reportsLoading, setReportsLoading] = useState(true);
    const [orderBy, setOrderBy] = useState('최신순');

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleReportMarketCategory = (category) => {
        setCurrentPage(1);
        setCategory([category])
    }

    // MainFilter Setting

    const location = useLocation(); 
    const navigate = useNavigate();
    
    const queryParams = new URLSearchParams(location.search);
    const reportMarketCategory = queryParams.get('category');

    const handleMainFilterCategoryAdd = (newCategory) => {
        setCategory((prevCategories) => {
            let updatedCategories = prevCategories.filter(category => category !== '');
            
            if (reportMarketCategory !== '') {
                // Modify the query parameters
                queryParams.set('category', '');  // Clear 'category'
                navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
            }
            // Check if the new category already exists in the updated array
            if (!updatedCategories.includes(newCategory)) {
                // Add new category if it doesn't exist
                return [...updatedCategories, newCategory];
            } else {
                // Remove the category if it already exists (toggle behavior)
                return updatedCategories.filter(category => category !== newCategory);
            }
        });
    };


    const [priceRangeLow, setPriceRangeLow] = useState(null);
    const [priceRangeUp, setPriceRangeUp] = useState(null);
    const [applyPriceRange, setApplyPriceRange] = useState(false);

    const handleApplyPriceRange = () => {
        setApplyPriceRange(true);
        fetchMarketReports();
    }

    const handleMainFilterReset = () => {
        setCategory([]);
        setPriceRangeLow(0);
        setPriceRangeUp(0);
        setApplyPriceRange(false);
        fetchMarketReports();
    }


    // main filter frame handle

    const [mainFilterStyle, setMainFilterStyle] = useState();

    useEffect(() => {
        if (mainFilterStyle) {
            document.body.classList.add('overflow_block_1199')
        } else {
            document.body.classList.remove('overflow_block_1199')
        }
    }, [mainFilterStyle]);

    const handleMainFilterStyle = () => {
        if (mainFilterStyle) {
            setMainFilterStyle(false);
        } else {
            setMainFilterStyle(true);
        }
    }
    

    // Order By
    const [orderByDropdownStyle, setOrderByDropdownStyle] = useState(false)

    const handelDropdownStyle = () => {
        if (orderByDropdownStyle === false) {
            setOrderByDropdownStyle(true)   
        } else {
            setOrderByDropdownStyle(false)
        }
    };

    const handleReportMarketOrderBy = (order_by) => {
        setCurrentPage(1);
        setOrderBy(order_by);
    }

    const orderByList = ['최신순', '평점순', '가격순']
    const renderOrderByDropdown = () => {
        const dropdowns = []
        orderByList.forEach(order_by => {
            dropdowns.push (
                <div className={`main_content_dropdown_options Pre_KR_Medium ${orderBy === order_by ? 'selected' : null }`} 
                onClick={() => handleReportMarketOrderBy(order_by)}>{ order_by }</div>
            )
        });
        return dropdowns
    };

    // Fetch Reports
    const fetchMarketReports = async () => {
        try {
            let url = ''
            if (applyPriceRange) {
                url = `/get_market_reports?category=${category}&order_by=${orderBy}&pl=${priceRangeLow}&pu=${priceRangeUp}&page=${currentPage}&kw=${searchKW}`
            } else {
                url = `/get_market_reports?category=${category}&order_by=${orderBy}&page=${currentPage}&kw=${searchKW}`
            }
            if (url) {
                const response = await apiClient.get(url)
                const data = response.data            
                setReports(data.reports)
                setSearchedReportsCount(data.search_result_count)
                setCurrentPage(data.current_page)
                setMaxPage(data.max_page)
                setReportsLoading(false);
            }
        } catch (error) {
            console.log(error)
            setReportsLoading(false);
        }
    };

    
    useEffect (() => {
        fetchMarketReports();
    }, [category, orderBy, currentPage]);

    // Search Feature

    const [searchKW, setSearchKW] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchMarketReports();        
        // Perform search action here, e.g., filter comments or make an API call to fetch search results
    };

    // mobile search pop

    const [mobileSearchStyle, setMobileSearchStyle] = useState(false);

    const handleMobileSearchStyle = () => {
        if (mobileSearchStyle) {
            setMobileSearchStyle(false);
        } else {
            setMobileSearchStyle(true);
        }
    }

    // orderBy Section Handle

    const [orderByStyle, setOrderByStyle] = useState(false);

    useEffect(() => {
        if (orderByStyle) {
            document.body.classList.add('overflow_block')
        } else {
            document.body.classList.remove('overflow_block')
        }
    }, [orderByStyle]);

    const handleOrderByStyle = () => {
        if(orderByStyle) {
            setOrderByStyle(false);
        } else {
            setOrderByStyle(true);
        }
    }


    return (
        <div className="Report_Market_Frame_R">
            <ReportMarketBase currentCategory={category} handelCategory={handleReportMarketCategory}/>
            <div className="report_market_category_indicator_frame">
                <span className="Pre_KR_SemiBold">
                    {category.length === 1 && (
                        `${category}`
                    )}
                    {category.length === 0 &&  (
                        `리포트 탐색`
                    )}
                    {category.length > 1 &&  (
                        `리포트 탐색`
                    )}
                </span>
                <form className="report_market_search_bar_frame" onSubmit={handleSearchSubmit}>
                    <SearchIcon style={{ width: '24px', height:'24px'}}/>
                    <input 
                        className="report_market_input Pre_KR_Medium" 
                        placeholder="필요하신 리포트를 검색해보세요"
                        onChange={(e) => setSearchKW(e.target.value)}>
                    </input>
                </form>
            </div>
            <div className="report_market_main_section">
                <ReportMarketMainFilter 
                    // style
                    style={mainFilterStyle}
                    styleHandle={handleMainFilterStyle}

                    // category
                    MainCategory={category}
                    categoryAdd={handleMainFilterCategoryAdd}
                    
                    // price
                    priceRangeLow={priceRangeLow}
                    priceRangeUp={priceRangeUp}
                    setPriceRangeLow={setPriceRangeLow}
                    setPriceRangeUp={setPriceRangeUp}
                    applyPriceRange={handleApplyPriceRange}

                    // Filter Reset
                    filterReset={handleMainFilterReset}
                />
                <div className="report_market_main_content_frame">
                    <div className="report_market_search_results_filter_frame Pre_KR_Normal">
                        <div className="report_market_search_results_filter_search_frame">
                            <span>검색결과 <span style={{color:'#0066FF'}}>{searchedReportsCount}</span></span>
                            <div className="report_market_filter_button_wrap_frame">
                                <div className="report_market_filter_button mobile_768" onClick={() => handleMobileSearchStyle()}>
                                    <SearchIcon style={{ width: '20px', height:'20px'}}/>
                                </div>
                                <div className="report_market_filter_button mobile_1199" onClick={() => handleMainFilterStyle()}>
                                    <span>필터</span>
                                    <FilterIcon style={{ width: '18px', height:'18px'}}/>
                                </div>
                                <div className="report_market_filter_button" onClick={() => handleOrderByStyle()}>
                                    <span>{orderBy}</span>
                                    <OrderByIcon />
                                </div>
                            </div>
                        </div>
                        <form className={`report_market_search_bar_frame mobile 
                            ${mobileSearchStyle ? 'open' : null}`} onSubmit={handleSearchSubmit}>
                            <SearchIcon style={{ width: '24px', height:'24px'}}/>
                            <input 
                                className="report_market_input Pre_KR_Medium" 
                                placeholder="필요하신 리포트를 검색해보세요"
                                onChange={(e) => setSearchKW(e.target.value)}>
                            </input>
                        </form>
                    </div>
                    <div className="report_market_product_wrap_frame">
                        {reportsLoading ? (
                            <SkeletonReport count={6}/>
                        ) : (
                            reports.length !== 0 ? (
                                <ReportProduct reports={reports} />
                            ) : (
                                <NoContent page={'report_market'}/>
                            )
                        )}
                        {maxPage > 1 && (
                            <Pagination page={currentPage} max_page={maxPage} handelPage={handlePageChange}/>
                        )} 
                    </div>
                </div>
            </div>
            <div className={`report_market_filter_main_frame ${orderByStyle ? 'open' : null}`}>
                <div className={`report_market_filter_frame ${orderByStyle ? 'open' : null}`}>
                    <div className="report_market_filter_header">
                        <span class="Pre_KR_SemiBold">정렬</span>
                        <div className="report_market_filter_close" onClick={() => handleOrderByStyle()}>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className="report_market_filter_dropdown_main_frame" onClick={() => handelDropdownStyle()}>
                        <span className="Pre_KR_SemiBold">정렬 선택</span>
                        <div className="report_market_filter_dropdown_frame">
                            <span className="Pre_KR_Medium">{orderBy}</span>
                            <DropdownIcon className={`report_market_dropdown_icon_cover ${orderByDropdownStyle ? 'open' : 'close'}`}/>
                            <div className={`main_content_dropdown ${orderByDropdownStyle ? 'open' : null}`} id="report_market_order_by_dropdown">
                                {renderOrderByDropdown()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportMarket;
