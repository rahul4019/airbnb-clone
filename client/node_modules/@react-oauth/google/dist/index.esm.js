import React, { useState, useRef, useEffect, createContext, useMemo, useContext, useCallback } from 'react';

function useLoadGsiScript(options = {}) {
    const { nonce, onScriptLoadSuccess, onScriptLoadError } = options;
    const [scriptLoadedSuccessfully, setScriptLoadedSuccessfully] = useState(false);
    const onScriptLoadSuccessRef = useRef(onScriptLoadSuccess);
    onScriptLoadSuccessRef.current = onScriptLoadSuccess;
    const onScriptLoadErrorRef = useRef(onScriptLoadError);
    onScriptLoadErrorRef.current = onScriptLoadError;
    useEffect(() => {
        const scriptTag = document.createElement('script');
        scriptTag.src = 'https://accounts.google.com/gsi/client';
        scriptTag.async = true;
        scriptTag.defer = true;
        scriptTag.nonce = nonce;
        scriptTag.onload = () => {
            var _a;
            setScriptLoadedSuccessfully(true);
            (_a = onScriptLoadSuccessRef.current) === null || _a === void 0 ? void 0 : _a.call(onScriptLoadSuccessRef);
        };
        scriptTag.onerror = () => {
            var _a;
            setScriptLoadedSuccessfully(false);
            (_a = onScriptLoadErrorRef.current) === null || _a === void 0 ? void 0 : _a.call(onScriptLoadErrorRef);
        };
        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, [nonce]);
    return scriptLoadedSuccessfully;
}

const GoogleOAuthContext = createContext(null);
function GoogleOAuthProvider({ clientId, nonce, onScriptLoadSuccess, onScriptLoadError, children, }) {
    const scriptLoadedSuccessfully = useLoadGsiScript({
        nonce,
        onScriptLoadSuccess,
        onScriptLoadError,
    });
    const contextValue = useMemo(() => ({
        clientId,
        scriptLoadedSuccessfully,
    }), [clientId, scriptLoadedSuccessfully]);
    return (React.createElement(GoogleOAuthContext.Provider, { value: contextValue }, children));
}
function useGoogleOAuth() {
    const context = useContext(GoogleOAuthContext);
    if (!context) {
        throw new Error('Google OAuth components must be used within GoogleOAuthProvider');
    }
    return context;
}

function extractClientId(credentialResponse) {
    var _a;
    const clientId = (_a = credentialResponse === null || credentialResponse === void 0 ? void 0 : credentialResponse.clientId) !== null && _a !== void 0 ? _a : credentialResponse === null || credentialResponse === void 0 ? void 0 : credentialResponse.client_id;
    return clientId;
}

const containerHeightMap = { large: 40, medium: 32, small: 20 };
function GoogleLogin({ onSuccess, onError, useOneTap, promptMomentNotification, type = 'standard', theme = 'outline', size = 'large', text, shape, logo_alignment, width, locale, click_listener, containerProps, ...props }) {
    const btnContainerRef = useRef(null);
    const { clientId, scriptLoadedSuccessfully } = useGoogleOAuth();
    const onSuccessRef = useRef(onSuccess);
    onSuccessRef.current = onSuccess;
    const onErrorRef = useRef(onError);
    onErrorRef.current = onError;
    const promptMomentNotificationRef = useRef(promptMomentNotification);
    promptMomentNotificationRef.current = promptMomentNotification;
    useEffect(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (!scriptLoadedSuccessfully)
            return;
        (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.accounts) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.initialize({
            client_id: clientId,
            callback: (credentialResponse) => {
                var _a;
                if (!(credentialResponse === null || credentialResponse === void 0 ? void 0 : credentialResponse.credential)) {
                    return (_a = onErrorRef.current) === null || _a === void 0 ? void 0 : _a.call(onErrorRef);
                }
                const { credential, select_by } = credentialResponse;
                onSuccessRef.current({
                    credential,
                    clientId: extractClientId(credentialResponse),
                    select_by,
                });
            },
            ...props,
        });
        (_f = (_e = (_d = window === null || window === void 0 ? void 0 : window.google) === null || _d === void 0 ? void 0 : _d.accounts) === null || _e === void 0 ? void 0 : _e.id) === null || _f === void 0 ? void 0 : _f.renderButton(btnContainerRef.current, {
            type,
            theme,
            size,
            text,
            shape,
            logo_alignment,
            width,
            locale,
            click_listener,
        });
        if (useOneTap)
            (_j = (_h = (_g = window === null || window === void 0 ? void 0 : window.google) === null || _g === void 0 ? void 0 : _g.accounts) === null || _h === void 0 ? void 0 : _h.id) === null || _j === void 0 ? void 0 : _j.prompt(promptMomentNotificationRef.current);
        return () => {
            var _a, _b, _c;
            if (useOneTap)
                (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.accounts) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        clientId,
        scriptLoadedSuccessfully,
        useOneTap,
        type,
        theme,
        size,
        text,
        shape,
        logo_alignment,
        width,
        locale,
    ]);
    return (React.createElement("div", { ...containerProps, ref: btnContainerRef, style: { height: containerHeightMap[size], ...containerProps === null || containerProps === void 0 ? void 0 : containerProps.style } }));
}

function googleLogout() {
    var _a, _b, _c;
    (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.accounts) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.disableAutoSelect();
}

/* eslint-disable import/export */
function useGoogleLogin({ flow = 'implicit', scope = '', onSuccess, onError, onNonOAuthError, overrideScope, state, ...props }) {
    const { clientId, scriptLoadedSuccessfully } = useGoogleOAuth();
    const clientRef = useRef();
    const onSuccessRef = useRef(onSuccess);
    onSuccessRef.current = onSuccess;
    const onErrorRef = useRef(onError);
    onErrorRef.current = onError;
    const onNonOAuthErrorRef = useRef(onNonOAuthError);
    onNonOAuthErrorRef.current = onNonOAuthError;
    useEffect(() => {
        var _a;
        if (!scriptLoadedSuccessfully)
            return;
        const clientMethod = flow === 'implicit' ? 'initTokenClient' : 'initCodeClient';
        const client = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.accounts.oauth2[clientMethod]({
            client_id: clientId,
            scope: overrideScope ? scope : `openid profile email ${scope}`,
            callback: (response) => {
                var _a, _b;
                if (response.error)
                    return (_a = onErrorRef.current) === null || _a === void 0 ? void 0 : _a.call(onErrorRef, response);
                (_b = onSuccessRef.current) === null || _b === void 0 ? void 0 : _b.call(onSuccessRef, response);
            },
            error_callback: (nonOAuthError) => {
                var _a;
                (_a = onNonOAuthErrorRef.current) === null || _a === void 0 ? void 0 : _a.call(onNonOAuthErrorRef, nonOAuthError);
            },
            state,
            ...props,
        });
        clientRef.current = client;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientId, scriptLoadedSuccessfully, flow, scope, state]);
    const loginImplicitFlow = useCallback((overrideConfig) => { var _a; return (_a = clientRef.current) === null || _a === void 0 ? void 0 : _a.requestAccessToken(overrideConfig); }, []);
    const loginAuthCodeFlow = useCallback(() => { var _a; return (_a = clientRef.current) === null || _a === void 0 ? void 0 : _a.requestCode(); }, []);
    return flow === 'implicit' ? loginImplicitFlow : loginAuthCodeFlow;
}

function useGoogleOneTapLogin({ onSuccess, onError, promptMomentNotification, cancel_on_tap_outside, prompt_parent_id, state_cookie_domain, hosted_domain, disabled, }) {
    const { clientId, scriptLoadedSuccessfully } = useGoogleOAuth();
    const onSuccessRef = useRef(onSuccess);
    onSuccessRef.current = onSuccess;
    const onErrorRef = useRef(onError);
    onErrorRef.current = onError;
    const promptMomentNotificationRef = useRef(promptMomentNotification);
    promptMomentNotificationRef.current = promptMomentNotification;
    useEffect(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (!scriptLoadedSuccessfully)
            return;
        if (disabled) {
            (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.accounts) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.cancel();
            return;
        }
        (_f = (_e = (_d = window === null || window === void 0 ? void 0 : window.google) === null || _d === void 0 ? void 0 : _d.accounts) === null || _e === void 0 ? void 0 : _e.id) === null || _f === void 0 ? void 0 : _f.initialize({
            client_id: clientId,
            callback: (credentialResponse) => {
                var _a;
                if (!(credentialResponse === null || credentialResponse === void 0 ? void 0 : credentialResponse.credential)) {
                    return (_a = onErrorRef.current) === null || _a === void 0 ? void 0 : _a.call(onErrorRef);
                }
                const { credential, select_by } = credentialResponse;
                onSuccessRef.current({
                    credential,
                    clientId: extractClientId(credentialResponse),
                    select_by,
                });
            },
            hosted_domain,
            cancel_on_tap_outside,
            prompt_parent_id,
            state_cookie_domain,
        });
        (_j = (_h = (_g = window === null || window === void 0 ? void 0 : window.google) === null || _g === void 0 ? void 0 : _g.accounts) === null || _h === void 0 ? void 0 : _h.id) === null || _j === void 0 ? void 0 : _j.prompt(promptMomentNotificationRef.current);
        return () => {
            var _a, _b, _c;
            (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.accounts) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.cancel();
        };
    }, [
        clientId,
        scriptLoadedSuccessfully,
        cancel_on_tap_outside,
        prompt_parent_id,
        state_cookie_domain,
        hosted_domain,
        disabled,
    ]);
}

/**
 * Checks if the user granted all the specified scope or scopes
 * @returns True if all the scopes are granted
 */
function hasGrantedAllScopesGoogle(tokenResponse, firstScope, ...restScopes) {
    var _a, _b, _c;
    if (!(window === null || window === void 0 ? void 0 : window.google))
        return false;
    return (((_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.accounts) === null || _b === void 0 ? void 0 : _b.oauth2) === null || _c === void 0 ? void 0 : _c.hasGrantedAllScopes(tokenResponse, firstScope, ...restScopes)) || false);
}

/**
 * Checks if the user granted any of the specified scope or scopes.
 * @returns True if any of the scopes are granted
 */
function hasGrantedAnyScopeGoogle(tokenResponse, firstScope, ...restScopes) {
    var _a, _b, _c;
    if (!(window === null || window === void 0 ? void 0 : window.google))
        return false;
    return (((_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.accounts) === null || _b === void 0 ? void 0 : _b.oauth2) === null || _c === void 0 ? void 0 : _c.hasGrantedAnyScope(tokenResponse, firstScope, ...restScopes)) || false);
}

export { GoogleLogin, GoogleOAuthProvider, googleLogout, hasGrantedAllScopesGoogle, hasGrantedAnyScopeGoogle, useGoogleLogin, useGoogleOneTapLogin };
