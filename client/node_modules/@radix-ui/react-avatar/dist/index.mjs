import $8NyvN$babelruntimehelpersesmextends from "@babel/runtime/helpers/esm/extends";
import {forwardRef as $8NyvN$forwardRef, useState as $8NyvN$useState, createElement as $8NyvN$createElement, useEffect as $8NyvN$useEffect} from "react";
import {createContextScope as $8NyvN$createContextScope} from "@radix-ui/react-context";
import {useCallbackRef as $8NyvN$useCallbackRef} from "@radix-ui/react-use-callback-ref";
import {useLayoutEffect as $8NyvN$useLayoutEffect} from "@radix-ui/react-use-layout-effect";
import {Primitive as $8NyvN$Primitive} from "@radix-ui/react-primitive";







/* -------------------------------------------------------------------------------------------------
 * Avatar
 * -----------------------------------------------------------------------------------------------*/ const $cddcb0b647441e34$var$AVATAR_NAME = 'Avatar';
const [$cddcb0b647441e34$var$createAvatarContext, $cddcb0b647441e34$export$90370d16b488820f] = $8NyvN$createContextScope($cddcb0b647441e34$var$AVATAR_NAME);
const [$cddcb0b647441e34$var$AvatarProvider, $cddcb0b647441e34$var$useAvatarContext] = $cddcb0b647441e34$var$createAvatarContext($cddcb0b647441e34$var$AVATAR_NAME);
const $cddcb0b647441e34$export$e2255cf6045e8d47 = /*#__PURE__*/ $8NyvN$forwardRef((props, forwardedRef)=>{
    const { __scopeAvatar: __scopeAvatar , ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = $8NyvN$useState('idle');
    return /*#__PURE__*/ $8NyvN$createElement($cddcb0b647441e34$var$AvatarProvider, {
        scope: __scopeAvatar,
        imageLoadingStatus: imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus
    }, /*#__PURE__*/ $8NyvN$createElement($8NyvN$Primitive.span, $8NyvN$babelruntimehelpersesmextends({}, avatarProps, {
        ref: forwardedRef
    })));
});
/*#__PURE__*/ Object.assign($cddcb0b647441e34$export$e2255cf6045e8d47, {
    displayName: $cddcb0b647441e34$var$AVATAR_NAME
});
/* -------------------------------------------------------------------------------------------------
 * AvatarImage
 * -----------------------------------------------------------------------------------------------*/ const $cddcb0b647441e34$var$IMAGE_NAME = 'AvatarImage';
const $cddcb0b647441e34$export$2cd8ae1985206fe8 = /*#__PURE__*/ $8NyvN$forwardRef((props, forwardedRef)=>{
    const { __scopeAvatar: __scopeAvatar , src: src , onLoadingStatusChange: onLoadingStatusChange = ()=>{} , ...imageProps } = props;
    const context = $cddcb0b647441e34$var$useAvatarContext($cddcb0b647441e34$var$IMAGE_NAME, __scopeAvatar);
    const imageLoadingStatus = $cddcb0b647441e34$var$useImageLoadingStatus(src);
    const handleLoadingStatusChange = $8NyvN$useCallbackRef((status)=>{
        onLoadingStatusChange(status);
        context.onImageLoadingStatusChange(status);
    });
    $8NyvN$useLayoutEffect(()=>{
        if (imageLoadingStatus !== 'idle') handleLoadingStatusChange(imageLoadingStatus);
    }, [
        imageLoadingStatus,
        handleLoadingStatusChange
    ]);
    return imageLoadingStatus === 'loaded' ? /*#__PURE__*/ $8NyvN$createElement($8NyvN$Primitive.img, $8NyvN$babelruntimehelpersesmextends({}, imageProps, {
        ref: forwardedRef,
        src: src
    })) : null;
});
/*#__PURE__*/ Object.assign($cddcb0b647441e34$export$2cd8ae1985206fe8, {
    displayName: $cddcb0b647441e34$var$IMAGE_NAME
});
/* -------------------------------------------------------------------------------------------------
 * AvatarFallback
 * -----------------------------------------------------------------------------------------------*/ const $cddcb0b647441e34$var$FALLBACK_NAME = 'AvatarFallback';
const $cddcb0b647441e34$export$69fffb6a9571fbfe = /*#__PURE__*/ $8NyvN$forwardRef((props, forwardedRef)=>{
    const { __scopeAvatar: __scopeAvatar , delayMs: delayMs , ...fallbackProps } = props;
    const context = $cddcb0b647441e34$var$useAvatarContext($cddcb0b647441e34$var$FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = $8NyvN$useState(delayMs === undefined);
    $8NyvN$useEffect(()=>{
        if (delayMs !== undefined) {
            const timerId = window.setTimeout(()=>setCanRender(true)
            , delayMs);
            return ()=>window.clearTimeout(timerId)
            ;
        }
    }, [
        delayMs
    ]);
    return canRender && context.imageLoadingStatus !== 'loaded' ? /*#__PURE__*/ $8NyvN$createElement($8NyvN$Primitive.span, $8NyvN$babelruntimehelpersesmextends({}, fallbackProps, {
        ref: forwardedRef
    })) : null;
});
/*#__PURE__*/ Object.assign($cddcb0b647441e34$export$69fffb6a9571fbfe, {
    displayName: $cddcb0b647441e34$var$FALLBACK_NAME
});
/* -----------------------------------------------------------------------------------------------*/ function $cddcb0b647441e34$var$useImageLoadingStatus(src) {
    const [loadingStatus, setLoadingStatus] = $8NyvN$useState('idle');
    $8NyvN$useLayoutEffect(()=>{
        if (!src) {
            setLoadingStatus('error');
            return;
        }
        let isMounted = true;
        const image = new window.Image();
        const updateStatus = (status)=>()=>{
                if (!isMounted) return;
                setLoadingStatus(status);
            }
        ;
        setLoadingStatus('loading');
        image.onload = updateStatus('loaded');
        image.onerror = updateStatus('error');
        image.src = src;
        return ()=>{
            isMounted = false;
        };
    }, [
        src
    ]);
    return loadingStatus;
}
const $cddcb0b647441e34$export$be92b6f5f03c0fe9 = $cddcb0b647441e34$export$e2255cf6045e8d47;
const $cddcb0b647441e34$export$3e431a229df88919 = $cddcb0b647441e34$export$2cd8ae1985206fe8;
const $cddcb0b647441e34$export$fb8d7f40caaeea67 = $cddcb0b647441e34$export$69fffb6a9571fbfe;




export {$cddcb0b647441e34$export$90370d16b488820f as createAvatarScope, $cddcb0b647441e34$export$e2255cf6045e8d47 as Avatar, $cddcb0b647441e34$export$2cd8ae1985206fe8 as AvatarImage, $cddcb0b647441e34$export$69fffb6a9571fbfe as AvatarFallback, $cddcb0b647441e34$export$be92b6f5f03c0fe9 as Root, $cddcb0b647441e34$export$3e431a229df88919 as Image, $cddcb0b647441e34$export$fb8d7f40caaeea67 as Fallback};
//# sourceMappingURL=index.mjs.map
