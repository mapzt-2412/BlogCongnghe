import React from "react";
import { memo } from "react";
import IconFacebook from "../../assets/icon/IconFaceBook";
import IconYouTube from './../../assets/icon/IconYoutube';
import IconInsta from './../../assets/icon/IconInsta';
import IconTwitter from './../../assets/icon/IconTwitter';
import IconGithub from './../../assets/icon/IconGithub';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-item">
                <IconFacebook/>
            </div>
            <div className="footer-item">
                <IconYouTube/>
            </div>
            <div className="footer-item">
                <IconInsta/>
            </div>
            <div className="footer-item">
                <IconTwitter/>
            </div>
            <div className="footer-item">
                <IconGithub/>
            </div>
        </div>
    )
}
export default memo(Footer);