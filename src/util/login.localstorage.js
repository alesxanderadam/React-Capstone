export const ACCESS_TOKEN = "accessToken";
export const USER_LOGIN = "userLogin";
export const USER_PROFILE = "userProfile";

export const { saveStore, saveStoreJson, getStore, getStoreJson } = {
    saveStore: (name, stringValue) => {
        localStorage.setItem(name, stringValue);
        return stringValue
    },
    saveStoreJson: (name, value) => {
        let JsonValue = JSON.stringify(value);
        localStorage.setItem(name, JsonValue)
        return JsonValue;
    },
    getStore: (name) => {
        if (localStorage.getItem(name)) {
            return localStorage.getItem(name)
        }
        return null;
    },
    getStoreJson: (name) => {
        if (localStorage.getItem(name)) {
            return JSON.parse(localStorage.getItem(name));
        }
        return null
    },
    removeStore: (name) => {
        localStorage.removeItem(USER_LOGIN)
    }
}
