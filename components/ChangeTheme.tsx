import React, { memo, useState } from 'react';
import IconShow from '../assets/icon/IconShow';
import IconHide from '../assets/icon/IconHide';
import IconLight from '../assets/icon/IconLight';
import IconDark from '../assets/icon/IconDark';
const ChangeTheme = ({onChangeTheme, theme}) => {
    const [isOpenChangeTheme, setIsOpenChangeTheme] = useState(false);

    return (
        <div className='change-theme-button'>
            <div className='change-theme-button-show' onClick={() => setIsOpenChangeTheme(!isOpenChangeTheme)}>
                {
                    isOpenChangeTheme ?  <IconHide width={10} height={10}/> : <IconShow width={10} height={10}/>
                }
            </div>
            <div className={'change-theme-button-content ' + (isOpenChangeTheme && "active")}>
                <div className={'change-theme-button-content-item '} onClick = {() => onChangeTheme("light")}>
                    <IconLight isLight = {theme !== "dark"}/>
                </div>
                <div className={'change-theme-button-content-item ' } onClick = {() => onChangeTheme("dark")}>
                    <IconDark isLight = {theme !== "dark"}/>
                </div>
            </div>
        </div>
    )
}
export default memo(ChangeTheme)