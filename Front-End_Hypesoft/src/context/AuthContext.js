import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import keycloak from '@/lib/keycloak';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        keycloak
            .init({ onLoad: 'login-required', checkLoginIframe: false })
            .then((auth) => {
            setAuthenticated(auth);
            setReady(true);
        });
    }, []);
    if (!ready)
        return null;
    const roles = keycloak.realmAccess?.roles ?? [];
    const username = keycloak.tokenParsed?.preferred_username ?? '';
    return (_jsx(AuthContext.Provider, { value: { authenticated, username, roles, logout: () => keycloak.logout() }, children: children }));
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
