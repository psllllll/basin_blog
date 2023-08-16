import request from "./request";
import type { LoginInfoType, RegisterInfoType, UserInfotype, NewPasswordType } from "../types/common";
import { message } from 'antd';
const apis = {
    Login(data: LoginInfoType) {
        try {
            return request({
                url: '/login',
                method: 'Post',
                data: data
            })
        } catch (error: any) {
            console.log(error);

            message.error(error);
        }
    },
    Register(data: RegisterInfoType) {
        return request({
            url: '/auth/register',
            method: 'POST',
            data: data
        })
    },

}
export default apis;
