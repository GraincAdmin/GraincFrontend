import React from "react";
import './SuspenseUI.css'
import { ReactComponent as CompanyLogo } from './static/assets/CompanyLogo/NavLogoLight.svg'

function SuspenseUI() {
    return (
        <div className="sellreports_suspense_ui_frame">
            <CompanyLogo />
            <div class="sellreports_suspense_ui_loading"></div>
        </div>
    );
};

export default SuspenseUI

