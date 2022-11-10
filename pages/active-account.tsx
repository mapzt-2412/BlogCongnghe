import { message } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { memo, useEffect, useState } from "react";
import { ROUTE_HOME } from "../libs/constants";
import PropertiesService from "./../services/properties.service";

const ActiveAccount = () => {
    const { param } = useRouter().query;
    const router = useRouter()
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        if(param){
            PropertiesService.verifyAccount(param).then((data) => {
                if(data.data.data){
                    message.success("Xác thực tài khoản thành công")
                    router.push(ROUTE_HOME);
                }
            })
        }
    },[param, router])
    return (
        <>
        </>
    )
};
export default memo(ActiveAccount);