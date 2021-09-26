import axios from 'axios';

export const axiosWithAuth = () => {
    const token = window.localStorage.getItem("token");

    return axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        },
        baseURL: "https://frozen-lowlands-84790.herokuapp.com/"

    });
}
