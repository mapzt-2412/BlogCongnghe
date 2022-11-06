import { memo, useState, useEffect } from "react";
import { spinnerService } from "../../services/spiner.service";

const LoadingPage = () => {
    
    return (
        <div className="overlay-spinner">
            <div className="spinner"></div>
            <div className="label">Đang tải</div>
        </div>
    )
}
export default memo(LoadingPage)