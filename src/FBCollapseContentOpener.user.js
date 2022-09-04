// ==UserScript==
// @name         FBCollapseContentOpener
// @namespace    https://github.com/haoger1012/TampermonkeyUserscripts/raw/main/src/FBCollapseContentOpener.user.js
// @version      0.1
// @description  open all collapse content in visible range of FB
// @author       Haoger
// @match        https://www.facebook.com/*
// @icon         https://www.google.com/s2/favicons?domain=facebook.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    document.addEventListener('keydown', (ev) => {
        if (ev.altKey && ev.key === 's' && !/^(?:input|select|textarea|button)$/i.test(ev.target.nodeName)) {
            (function () {
                [...document.querySelectorAll("span[dir='auto']")]
                    .filter(span => {
                        const rect = span.getBoundingClientRect()
                        return rect.top > 0 && rect.top < window.innerHeight
                    })
                    .filter(span => span.textContent.match(/\d+\s?(?:則|個).*(?:回覆|回答)/) || span.textContent.match(/(?:查看|檢視|顯示)(?:.*\d+\s?(?:則|個)|).*(留言|答案)/))
                    .forEach(span => span.click());

                [...document.querySelectorAll("div[role=main] div[role='button']")]
                    .filter(div => {
                        const rect = div.getBoundingClientRect()
                        return rect.top > 0 && rect.top < window.innerHeight
                    })
                    .filter(div => div.textContent === '顯示更多')
                    .forEach(div => div.click());
            })();
        }
    })
})();