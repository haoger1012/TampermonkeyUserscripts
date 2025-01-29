// ==UserScript==
// @name         Facebook Shortcuts
// @namespace    https://github.com/haoger1012/TampermonkeyUserscripts/raw/main/src/FBShortcuts.user.js
// @version      0.1
// @description  Facebook Shortcuts
// @author       Haoger
// @match        https://www.facebook.com/*
// @icon         https://www.google.com/s2/favicons?domain=facebook.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    document.addEventListener("keydown", (ev) => {
        if (ev.altKey && ev.key === "x" && !/^(?:input|select|textarea|button)$/i.test(ev.target.nodeName)) {
            [...document.querySelectorAll("div[role=dialog] span[dir=auto]")]
                .filter(isInViewport)
                .filter(span => span.textContent.includes("回覆"))
                .forEach(span => span.click());

            [...document.querySelectorAll("div[role=main] div[role=button]")]
                .filter(isInViewport)
                .filter(div => div.textContent.endsWith("更多"))
                .forEach(div => div.click());

            return;
        }


        if (ev.key === "Escape" && !/^(?:input|select|textarea|button)$/i.test(ev.target.nodeName)) {
            document.querySelector("div[aria-label=關閉]").click();
            return;
        }
    });

    function isInViewport(div) {
        const rect = div.getBoundingClientRect()
        return rect.top > 0 && rect.top < window.innerHeight
    }
})();
