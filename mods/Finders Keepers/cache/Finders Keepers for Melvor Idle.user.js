// ==UserScript==
// @name        Finders Keepers for Melvor Idle
// @description Allows the user to quickly add previously found items to their bank via the item log.
// @version     1.0.0
// @match       https://*.melvoridle.com/*
// @exclude     https://wiki.melvoridle.com*
// @grant       none
// @namespace   https://github.com/ChaseStrackbein/melvor-idle-finders-keepers
// ==/UserScript==

const main = () => {
  let initialized = false;

  const init = () => {
    if (initialized) return;
    
    const $itemLog = $('#itemlog-container');    
    $itemLog.on('click', 'img', onItemLogClick);

    initialized = true;
    console.log('Finders Keepers initialized');
  };
  
  const onItemLogClick = (e) => {
    const $item = $(e.currentTarget);
    
    // Avoid double-adding items that already have this functionality (lore books)
    const existingOnClick = $item.attr('onclick');
    if (existingOnClick && existingOnClick.includes('addItemToBank')) return;
    
    const itemDOMId = $item.prop('id').split('-');
    const itemId = parseInt(itemDOMId[itemDOMId.length - 1]);
    
    if (isNaN(itemId)) return;

    addItemIfDiscovered(itemId);
  };
  
  const addItemIfDiscovered = (itemId) => {
    if (!itemsAlreadyFound.includes(itemId)) return;

    addItemToBank(itemId, 1);
  };

  init();
};

(() => {
  const load = () => {
    const isGameLoaded = (window.isLoaded && !window.currentlyCatchingUp) ||
      (typeof unsafeWindow !== 'undefined' && unsafeWindow.isLoaded && !unsafeWindow.currentlyCatchingUp);
      
    if (!isGameLoaded) {
      setTimeout(load, 50);
      return;
    }

    inject();
  }

  const inject = () => {
      const scriptId = 'bfk-main';

      const previousScript = document.getElementById(scriptId);
      if (previousScript) previousScript.remove();

      const script = document.createElement('script');
      script.id = scriptId;
      script.textContent = `try {(${main})();} catch (e) {console.log(e);}`;

      document.body.appendChild(script);
  }

  load();
})();