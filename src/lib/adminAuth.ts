'use client';

const AUTH_KEY = 'bsw_admin_auth';

export const ADMIN_CREDENTIALS = {
    name: 'SATHISH',
    pass: 'SSAATHISH@123' // Simple hardcoded implementation as requested "takes name and pass"
};

export const checkAuth = (): boolean => {
    if (typeof window === 'undefined') return false;
    const auth = localStorage.getItem(AUTH_KEY);
    return auth === 'true';
};

export const login = (name: string, pass: string): boolean => {
    if (name === ADMIN_CREDENTIALS.name && pass === ADMIN_CREDENTIALS.pass) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(AUTH_KEY, 'true');
        }
        return true;
    }
    return false;
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_KEY);
    }
};
