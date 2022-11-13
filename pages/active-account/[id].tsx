import { message } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { memo, useEffect, useState } from "react";
import { ROUTE_HOME } from "../../libs/constants";
import PropertiesService from "../../services/properties.service";

const ActiveAccount = () => {
    const { id } = useRouter().query;
    const router = useRouter()
    const [isSuccess, setIsSuccess] = useState(false);
    console.log()
    useEffect(() => {
        if(id){
            PropertiesService.verifyAccount(id).then((data) => {
                if(data.data.data){
                    message.success("Xác thực tài khoản thành công")
                    router.push(ROUTE_HOME);
                }
            })
        }
    },[id, router])
    return (
        <>
        </>
    )
};
export default memo(ActiveAccount);