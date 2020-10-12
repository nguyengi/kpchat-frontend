import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import {API_URL} from "../config"

const Api = {
    init()
    {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
    },

    setHeader() {
        Vue.axios.defaults.headers.common["Authorization"] = 'Bearer ' + JSON.parse(localStorage.getItem('user')).token;
    },
    
    get(url)
    {
        return Vue.axios.get(url)
    },

    post(url, params)
    {
        return Vue.axios.post(url, params);
    },

    put(url, params)
    {
        return Vue.axios.put(url, params);
    },

    delete(resource)
    {
        return Vue.axios.delete(resource)
    }
}

export default Api;