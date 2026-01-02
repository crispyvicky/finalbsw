export const ADMIN_CREDENTIALS = {
    name: 'SATHISH',
    pass: 'SSAATHISH@123'
};

export const login = (name: string, pass: string) => {
    if (name === ADMIN_CREDENTIALS.name && pass === ADMIN_CREDENTIALS.pass) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('admin_session', 'true');
        }
        return true;
    }
    return false;
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_session');
    }
};

export const checkAuth = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('admin_session') === 'true';
    }
    return false;
};
