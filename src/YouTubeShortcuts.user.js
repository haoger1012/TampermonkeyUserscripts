// ==UserScript==
// @name         YouTube Shortcuts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  YouTube Shortcuts
// @author       Haoger
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    document.addEventListener("keydown", (ev) => {
        if (ev.altKey && ev.key === "x" && !/^(?:input|select|textarea|button)$/i.test(ev.target.nodeName)) {
            // * 則回覆
            [...document.querySelectorAll("ytd-button-renderer#more-replies button")]
                .filter(isInViewport)
                .forEach(button => button.click());

            // 顯示更多回覆
            [...document.querySelectorAll("ytd-button-renderer.ytd-continuation-item-renderer button")]
                .filter(isInViewport)
                .forEach(button => button.click());

            // 顯示完整內容
            [...document.querySelectorAll("tp-yt-paper-button#more")]
                .filter(isInViewport)
                .forEach(button => button.click());

            return;
        }
    });

    function isInViewport(div) {
        const rect = div.getBoundingClientRect()
        return rect.top > 0 && rect.top < window.innerHeight
    }
})();