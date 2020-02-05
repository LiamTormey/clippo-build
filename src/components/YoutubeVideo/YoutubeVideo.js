import React, { useEffect, useState } from 'react' 
import styleModule from './style.module.css'
export default (props) => { 
    
    let videoId = props.videoId 
    let onStateChangeFunction = props.events.onStateChange || (()=>{})
    let onErrorFunction = props.events.onError || (()=>{})
    let onReadyFunction = props.events.onReady || (()=>{})

    //set up the functions the youtube api will call once its downloaded 
    const setUpHandler = (e) => { 
        window['onYouTubeIframeAPIReady'] = (e) => { 
            let player = new window['YT'].Player('player', {
                videoId: videoId,
                events: {
                    'onStateChange': (e) => {onStateChangeFunction(e, player)},
                    'onError': (e) => {onErrorFunction(e, player)},
                    'onReady': (e) => {
                        const IFRAME = e.target.a
                        IFRAME.style="width:100%;height:100%"
                        onReadyFunction(e, player)
                    }
                } 
            });
        }
    }

    //download the yt api script 
    const init = () => { 
        var tag = document.createElement('script');
        //tag.src = "https://www.youtube.com/iframe_api";
        tag.text = "if (!window['YT']) {var YT = {loading: 0,loaded: 0};}if (!window['YTConfig']) {var YTConfig = {'host': 'http://www.youtube.com'};}if (!YT.loading) {YT.loading = 1;(function(){var l = [];YT.ready = function(f) {if (YT.loaded) {f();} else {l.push(f);}};window.onYTReady = function() {YT.loaded = 1;for (var i = 0; i < l.length; i++) {try {l[i]();} catch (e) {}}};YT.setConfig = function(c) {for (var k in c) {if (c.hasOwnProperty(k)) {YTConfig[k] = c[k];}}};var a = document.createElement('script');a.type = 'text/javascript';a.id = 'www-widgetapi-script';a.src = 'https://s.ytimg.com/yts/jsbin/www-widgetapi-vflWjyjuR/www-widgetapi.js';a.async = true;var c = document.currentScript;if (c) {var n = c.nonce || c.getAttribute('nonce');if (n) {a.setAttribute('nonce', n);}}var b = document.getElementsByTagName('script')[0];b.parentNode.insertBefore(a, b);})();}"
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const videoRefLoaded = () => { 
        console.log("VIDEO REF LOADED")
        init() 
        setUpHandler() 
    }
    
    return(
        <div id='player' ref={videoRefLoaded}> </div>
   )
}