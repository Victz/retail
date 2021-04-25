import axios from "axios";

class Auth {
    login(username) {
        return axios
                .post("/api/login", {username})
                .then(response => {
                    if (response.data.accessToken) {
                        localStorage.setItem("user", JSON.stringify(response.data));
                    }
                    return response.data;
                });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username) {
        return axios.post("/api/register", {username});
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
        ;
    }

    authHeader() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.accessToken) {
            return {Authorization: 'Bearer ' + user.accessToken};
        } else {
            return {};
        }
    }
}

export default new Auth();