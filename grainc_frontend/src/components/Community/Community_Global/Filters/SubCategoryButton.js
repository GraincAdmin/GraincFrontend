import React, { useState } from "react";
import '../../../../static/css/Community/Community_Global/Filters/CoreFilter.css'
import { ReactComponent as CategoryIcon } from '../../../../static/assets/GlobalIcon/CategoryIcon.svg'
import { ReactComponent as CloseIcon } from '../../../../static/assets/GlobalIcon/Close_LG.svg'
import { ReactComponent as DropdownDownIcon } from '../../../../static/assets/GlobalIcon/Caret_Down_MD.svg';

const SubCategoryButton = ({subCategory, setSubCategory}) => {

    // subCategory Section Style
    const [subCategoryStyle, setSubCategoryStyle] = useState(false)
    const handelSubCategoryStyle = () => {
        if (subCategoryStyle) {
            setSubCategoryStyle(false);
        } else {
            setSubCategoryStyle(true);
        }
    }

    const handleSubCategorySelection = (value) => {
        setSubCategoryStyle(false);
        setSubCategory(value);
    }


    const [subCategoryDropdownStyle, setSubCategoryDropdownStyle] = useState(false);
    const handleSubCategoryDropdownStyle = () => {
        if (subCategoryDropdownStyle) {
            setSubCategoryDropdownStyle(false);
        } else {
            setSubCategoryDropdownStyle(true);
        }
    }

    const selectedOptionStyle = {
        color: '#0066FF',
        backgroundColor: 'rgba(0, 102, 255, 0.05)'
    };

    const subCategoryList = ['전체', '분석', '이슈', '정보', '스터디', '질문', '자유게시판']

    const renderSubCategoryDropdown = () => {
        const dropdowns = []
        subCategoryList.forEach(sub_category => {
            dropdowns.push (
                <div className="community_dropdown_options Pre_KR_Medium" style={subCategory === sub_category ? selectedOptionStyle : {}}
                onClick={() => handleSubCategorySelection(sub_category)}>{ sub_category }</div>
            )
        });
        return dropdowns
    }

    
    return (
        <>
            <div className='community_main_content_filter_button' onClick={() => handelSubCategoryStyle()}>
                <span className='Pre_KR_Normal'>{subCategory}</span>
                <CategoryIcon />
            </div>
            <div className={`community_filter_main_frame ${subCategoryStyle ? 'open' : null}`}>
                <div className={`community_filter_selection_frame ${subCategoryStyle ? 'open' : null}`}>
                    <div className='community_filter_type_indicator_frame'>
                        <span className='Pre_KR_SemiBold'>하위 카테고리</span>
                        <div className='community_filter_close' onClick={() => handelSubCategoryStyle()}>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className='community_category_dropdown_main_frame' onClick={() => handleSubCategoryDropdownStyle()}>
                        <span className='Pre_KR_SemiBold'>카테고리 선택</span>
                        <div className='community_category_dropdown'>
                            <span className='Pre_KR_Normal'>{ subCategory }</span>
                            <DropdownDownIcon className={`down_icon_cover ${subCategoryDropdownStyle ? 'open' : 'close'}`}/>
                            <div className={`community_category_dropdown_frame ${subCategoryDropdownStyle ? 'open' : null}`}>
                                {renderSubCategoryDropdown()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubCategoryButton