import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });
const BACKEND_API_URI = process.env.VITE_REACT_APP_BACKEND_URL

class backend {
    static user_token = cookies.get('user_token') || ""
    static session_cookie = cookies.get('session_cookie') || ""

    static async request(endpoint, data = {}, method = "GET") {
        const url = `${BACKEND_API_URI}${endpoint}`;
        const headers = {authorization: `Bearer ${backend.user_token}`};

        const params = (method === "GET") ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("Backend API Error:", err.response);
        }
    }

    static async startSession(session_cookie) {
        try {
            return await this.request(`/`, {'cookie': session_cookie}, 'post' ).then((res) => {
                let {token, cookie} = res;

                cookies.set('session_cookie',`${cookie}`);
                cookies.set('user_token',`${token}`);
                backend.user_token = cookies.get('user_token') || ""
                backend.session_cookie = cookies.get('session_cookie') || ""
            })
        } catch (err) {
            return err.data
        }
    }

    static async getLinks() {
        try {
            return await backend.request(`/allLinks`).then(res => {
                if (res) {
                    res.map((res) => {
                        const timeLeft = new Date(res.expiry) - Date.now();
                        res['expiry'] = Math.floor(timeLeft/1000);
                        return res
                    })
                }
                return res
            })
        } catch (err){
            return err
        }
    }

    static async convertLink(data) {
        try {
            data = {...data, cookie: backend.session_cookie}
            return await this.request(`/convert`, data, 'post').then((res) => {
                const timeLeft = new Date(res.expiry) - Date.now();
                res['expiry'] = Math.floor(timeLeft/1000);
                return res
            })
        } catch (err) {
            return err
        }
    }

    static async getRedirectLink(short) {
        try {
            return await this.request(`/${short}`);
        } catch (err) {
            return err
        }
    }
}

export default backend;