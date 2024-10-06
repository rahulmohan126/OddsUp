import config from "../../config.json"

const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    // window.location.replace(config.appRootURL + "/login");
    window.location.href = config.appRootURL + "/login";
    //window.location.reload();
}

export default logout;