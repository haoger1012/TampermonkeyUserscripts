// ==UserScript==
// @name         YouTubeShortsRedirect
// @namespace    https://github.com/haoger1012/TampermonkeyUserscripts/raw/main/src/YouTubeShortsRedirect.user.js
// @version      0.1
// @description  Redirect YouTube Shorts to common video page
// @author       Haoger
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';
    var previousHref = location.href;

    window.addEventListener("load", function () {
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function () {
                if (previousHref != location.href) {
                    previousHref = location.href;
                    redirect();
                }
            });
        });

        const target = document.querySelector("body");

        const options = {
            childList: true,
            subtree: true
        };

        observer.observe(target, options);
    });

    function redirect() {
        const ln = location.href;
        if (ln.indexOf("www.youtube.com/shorts") >= 0) {
            void (location.href = ln.replace(/www\.youtube\.com\/shorts/i, "youtu.be"));
        }
    }
})();