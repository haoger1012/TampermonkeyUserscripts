// ==UserScript==
// @name         YouTube Shorts Redirect
// @namespace    https://github.com/haoger1012/TampermonkeyUserscripts/raw/main/src/YouTubeShortsRedirect.user.js
// @version      0.2
// @description  Redirect YouTube Shorts to common video page
// @author       Haoger
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const oldReplaceState = history.replaceState;
    history.replaceState = function replaceState() {
        let ret = oldReplaceState.apply(this, arguments);
        window.dispatchEvent(new Event("replacestate"));
        window.dispatchEvent(new Event("locationchange"));
        return ret;
    };

    window.addEventListener("popstate", () => {
        window.dispatchEvent(new Event("locationchange"));
    });

    window.addEventListener("transitionend", (e) => {
        if (e.target.id === "progress") {
            window.dispatchEvent(new Event("locationchange"));
        }
    });

    window.addEventListener("locationchange", function () {
        executeActions();
    });

    executeActions();

    let id = setInterval(executeActions, 500);

    setTimeout(() => { clearInterval(id); }, 2000);

    function executeActions() {
        const parsedUrl = new URL(location.href);
        if (!parsedUrl.pathname.includes("shorts") || parsedUrl.pathname.endsWith("shorts")) {
            return;
        }

        const videoId = parsedUrl.pathname.split("/").pop();
        const s = `${parsedUrl.origin}/watch?v=${videoId}`;
        if (s && location.href !== s) {
            oldReplaceState.apply(history, [{}, '', s]);
            location.replace(s);
        }
    }
})();
