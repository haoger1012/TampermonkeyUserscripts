// ==UserScript==
// @name         Twitch Gift
// @namespace    https://github.com/haoger1012/TampermonkeyUserscripts/raw/main/src/TwitchGift.user.js
// @version      0.1
// @description  Twitch 自動領取獎勵
// @author       Haoger
// @match        https://www.twitch.tv/*
// @icon         https://www.google.com/s2/favicons?domain=twitch.tv
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    window.setInterval(function () {
        const button = document.querySelector("button[aria-label='領取額外獎勵']");
        if (button) {
            button.click();
        }
    }, 60000);
})();