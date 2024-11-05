import React, { useState } from "react";
import '../../../../static/css/Community/Community_Global/Filters/CoreFilter.css'
import { ReactComponent as OrderByIcon } from '../../../../static/assets/GlobalIcon/OrderByIcon.svg'
import { ReactComponent as CloseIcon } from '../../../../static/assets/GlobalIcon/Close_LG.svg'
import { ReactComponent as DropdownDownIcon } from '../../../../static/assets/GlobalIcon/Caret_Down_MD.svg';

const OrderByButton = ({orderBy, setOrderBy}) => {
    // orderBy Section Style
    const [orderByStyle, setOrderByStyle] = useState(false);
    const handelOrderByStyle = () => {
        if (orderByStyle) {
            setOrderByStyle(false);
        } else {
            setOrderByStyle(true);
        }
    }

    const handleOrderBySelection = (value) => {
        setOrderByStyle(false);
        setOrderBy(value);
    }

    const selectedOptionStyle = {
        color: '#0066FF',
        backgroundColor: 'rgba(0, 102, 255, 0.05)'
    };

    const orderByList = ['최신순', '인기순', '조회순']
    const renderOrderByDropdown = () => {
        const dropdowns = []
        orderByList.forEach(order_by => {
            dropdowns.push (
                <div className="community_dropdown_options Pre_KR_Medium" style={orderBy === order_by ? selectedOptionStyle : {}}
                onClick={() => handleOrderBySelection(order_by)}>{order_by}</div>
            )
        });
        return dropdowns
    }

    const [orderByDropdownStyle, setOrderByDropdownStyle] = useState(false);

    const handleOrderbyDropdownStyle = () => {
        if (orderByDropdownStyle) {
            setOrderByDropdownStyle(false)
        } else {
            setOrderByDropdownStyle(true)
        }
    }

    return (
        <>
            <div className='community_main_content_filter_button' onClick={() => handelOrderByStyle()}>
                <span className='Pre_KR_Normal'>{orderBy}</span>
                <OrderByIcon />
            </div>
            <div className={`community_filter_main_frame ${orderByStyle ? 'open' : null}`}>
                <div className={`community_filter_selection_frame ${orderByStyle ? 'open' : null}`}>
                    <div className='community_filter_type_indicator_frame'>
                        <span className='Pre_KR_SemiBold'>정렬</span>
                        <div className='community_filter_close' onClick={() => handelOrderByStyle()}>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className='community_category_dropdown_main_frame'>
                        <span className='Pre_KR_SemiBold'>정렬 선택</span>
                        <div className='community_category_dropdown' onClick={() => handleOrderbyDropdownStyle()}>
                            <span className='Pre_KR_Normal'>{ orderBy }</span>
                            <DropdownDownIcon className={`down_icon_cover ${orderByDropdownStyle ? 'open' : 'close'}`}/>
                            <div className={`community_category_dropdown_frame ${orderByDropdownStyle ? 'open' : null}`}>
                                {renderOrderByDropdown()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderByButton