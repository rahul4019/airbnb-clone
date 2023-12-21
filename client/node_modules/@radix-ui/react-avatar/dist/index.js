var $6FDFN$babelruntimehelpersextends = require("@babel/runtime/helpers/extends");
var $6FDFN$react = require("react");
var $6FDFN$radixuireactcontext = require("@radix-ui/react-context");
var $6FDFN$radixuireactusecallbackref = require("@radix-ui/react-use-callback-ref");
var $6FDFN$radixuireactuselayouteffect = require("@radix-ui/react-use-layout-effect");
var $6FDFN$radixuireactprimitive = require("@radix-ui/react-primitive");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "createAvatarScope", () => $94437fed6c1d6d8a$export$90370d16b488820f);
$parcel$export(module.exports, "Avatar", () => $94437fed6c1d6d8a$export$e2255cf6045e8d47);
$parcel$export(module.exports, "AvatarImage", () => $94437fed6c1d6d8a$export$2cd8ae1985206fe8);
$parcel$export(module.exports, "AvatarFallback", () => $94437fed6c1d6d8a$export$69fffb6a9571fbfe);
$parcel$export(module.exports, "Root", () => $94437fed6c1d6d8a$export$be92b6f5f03c0fe9);
$parcel$export(module.exports, "Image", () => $94437fed6c1d6d8a$export$3e431a229df88919);
$parcel$export(module.exports, "Fallback", () => $94437fed6c1d6d8a$export$fb8d7f40caaeea67);






/* -------------------------------------------------------------------------------------------------
 * Avatar
 * -----------------------------------------------------------------------------------------------*/ const $94437fed6c1d6d8a$var$AVATAR_NAME = 'Avatar';
const [$94437fed6c1d6d8a$var$createAvatarContext, $94437fed6c1d6d8a$export$90370d16b488820f] = $6FDFN$radixuireactcontext.createContextScope($94437fed6c1d6d8a$var$AVATAR_NAME);
const [$94437fed6c1d6d8a$var$AvatarProvider, $94437fed6c1d6d8a$var$useAvatarContext] = $94437fed6c1d6d8a$var$createAvatarContext($94437fed6c1d6d8a$var$AVATAR_NAME);
const $94437fed6c1d6d8a$export$e2255cf6045e8d47 = /*#__PURE__*/ $6FDFN$react.forwardRef((props, forwardedRef)=>{
    const { __scopeAvatar: __scopeAvatar , ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = $6FDFN$react.useState('idle');
    return /*#__PURE__*/ $6FDFN$react.createElement($94437fed6c1d6d8a$var$AvatarProvider, {
        scope: __scopeAvatar,
        imageLoadingStatus: imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus
    }, /*#__PURE__*/ $6FDFN$react.createElement($6FDFN$radixuireactprimitive.Primitive.span, ($parcel$interopDefault($6FDFN$babelruntimehelpersextends))({}, avatarProps, {
        ref: forwardedRef
    })));
});
/*#__PURE__*/ Object.assign($94437fed6c1d6d8a$export$e2255cf6045e8d47, {
    displayName: $94437fed6c1d6d8a$var$AVATAR_NAME
});
/* -------------------------------------------------------------------------------------------------
 * AvatarImage
 * -----------------------------------------------------------------------------------------------*/ const $94437fed6c1d6d8a$var$IMAGE_NAME = 'AvatarImage';
const $94437fed6c1d6d8a$export$2cd8ae1985206fe8 = /*#__PURE__*/ $6FDFN$react.forwardRef((props, forwardedRef)=>{
    const { __scopeAvatar: __scopeAvatar , src: src , onLoadingStatusChange: onLoadingStatusChange = ()=>{} , ...imageProps } = props;
    const context = $94437fed6c1d6d8a$var$useAvatarContext($94437fed6c1d6d8a$var$IMAGE_NAME, __scopeAvatar);
    const imageLoadingStatus = $94437fed6c1d6d8a$var$useImageLoadingStatus(src);
    const handleLoadingStatusChange = $6FDFN$radixuireactusecallbackref.useCallbackRef((status)=>{
        onLoadingStatusChange(status);
        context.onImageLoadingStatusChange(status);
    });
    $6FDFN$radixuireactuselayouteffect.useLayoutEffect(()=>{
        if (imageLoadingStatus !== 'idle') handleLoadingStatusChange(imageLoadingStatus);
    }, [
        imageLoadingStatus,
        handleLoadingStatusChange
    ]);
    return imageLoadingStatus === 'loaded' ? /*#__PURE__*/ $6FDFN$react.createElement($6FDFN$radixuireactprimitive.Primitive.img, ($parcel$interopDefault($6FDFN$babelruntimehelpersextends))({}, imageProps, {
        ref: forwardedRef,
        src: src
    })) : null;
});
/*#__PURE__*/ Object.assign($94437fed6c1d6d8a$export$2cd8ae1985206fe8, {
    displayName: $94437fed6c1d6d8a$var$IMAGE_NAME
});
/* -------------------------------------------------------------------------------------------------
 * AvatarFallback
 * -----------------------------------------------------------------------------------------------*/ const $94437fed6c1d6d8a$var$FALLBACK_NAME = 'AvatarFallback';
const $94437fed6c1d6d8a$export$69fffb6a9571fbfe = /*#__PURE__*/ $6FDFN$react.forwardRef((props, forwardedRef)=>{
    const { __scopeAvatar: __scopeAvatar , delayMs: delayMs , ...fallbackProps } = props;
    const context = $94437fed6c1d6d8a$var$useAvatarContext($94437fed6c1d6d8a$var$FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = $6FDFN$react.useState(delayMs === undefined);
    $6FDFN$react.useEffect(()=>{
        if (delayMs !== undefined) {
            const timerId = window.setTimeout(()=>setCanRender(true)
            , delayMs);
            return ()=>window.clearTimeout(timerId)
            ;
        }
    }, [
        delayMs
    ]);
    return canRender && context.imageLoadingStatus !== 'loaded' ? /*#__PURE__*/ $6FDFN$react.createElement($6FDFN$radixuireactprimitive.Primitive.span, ($parcel$interopDefault($6FDFN$babelruntimehelpersextends))({}, fallbackProps, {
        ref: forwardedRef
    })) : null;
});
/*#__PURE__*/ Object.assign($94437fed6c1d6d8a$export$69fffb6a9571fbfe, {
    displayName: $94437fed6c1d6d8a$var$FALLBACK_NAME
});
/* -----------------------------------------------------------------------------------------------*/ function $94437fed6c1d6d8a$var$useImageLoadingStatus(src) {
    const [loadingStatus, setLoadingStatus] = $6FDFN$react.useState('idle');
    $6FDFN$radixuireactuselayouteffect.useLayoutEffect(()=>{
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
const $94437fed6c1d6d8a$export$be92b6f5f03c0fe9 = $94437fed6c1d6d8a$export$e2255cf6045e8d47;
const $94437fed6c1d6d8a$export$3e431a229df88919 = $94437fed6c1d6d8a$export$2cd8ae1985206fe8;
const $94437fed6c1d6d8a$export$fb8d7f40caaeea67 = $94437fed6c1d6d8a$export$69fffb6a9571fbfe;




//# sourceMappingURL=index.js.map
