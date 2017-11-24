let carts = [];
let promotions = [];
const CART_URL = 'https://www.kabum.com.br/cgi-local/site/carrinho/carrinho.cgi';
const PROMOTION_URL = 'https://blackfriday.kabum.com.br';

chrome.runtime.onMessage.addListener(
    ( request, sender, sendResponse ) => {
        if ( request.addCart ) {
            if ( !carts.some( c => c === sender.tab.id ) ) {
                carts.push( sender.tab.id );
            }
        }
        if ( request.updateCart ) {
            checkTabs( carts, CART_URL )
                .then( tabIds => tabIds.filter( id => id ) )
                .then( tabIds => createTabIfNecessary( tabIds, CART_URL ) )
                .then( tabIds => updateCarts( tabIds ) )
                .then( tabIds => tabIds.forEach( tabId => chrome.tabs.sendMessage( tabId, request ) ) );
        }

        console.log( sender.tab ? "from a content script:" + sender.tab.url : "from the extension" );
    } );

const updateCarts = ( tabIds ) => carts = tabIds;

const removeTab = ( list, id ) => list.filter( l => l !== id );

const checkTabs = ( tabIds, url ) => Promise.all( tabIds.map(( id ) => getValidTab( id, url ) ) );

const getValidTab = ( tabId, url ) =>
    new Promise(( resolve, reject ) =>
        chrome.tabs.get( tabId, ( tab ) => {
            if ( !tab || tab.url.indexOf( url ) === -1 ) {
                resolve();
            } else {
                resolve( tab.id );
            }
        } ) );

const createTabIfNecessary = ( tabIds, url ) =>
    new Promise(( resolve, reject ) => {
        if ( tabIds.length === 0 ) {
            chrome.tabs.create( { url: url }, ( tab ) => {
                tabIds.push( tab.id );
                resolve( tabIds );
            } );
        } else {
            resolve( tabIds );
        }
    } );
