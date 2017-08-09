class Cart {
    constructor() {
        $( document ).ready(() => chrome.runtime.sendMessage( { cartList: this.cartList } ) );
        
        chrome.runtime.sendMessage( { addCart: true } );

        chrome.runtime.onMessage.addListener(
            ( request, sender, sendResponse ) => {
                console.log( 'background message received' );
                if ( request.updateCart ) {
                    if ( !this.cartList.some( id => id === request.productId ) ) {
                        window.location.reload();
                    } else {
                        chrome.runtime.sendMessage( { cartList: [ request.productId ] } );
                    }
                }

                console.log( sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension" );
            } );
    }

    get cartList () {
        const productsId = [];
        $( '.carrinhoTabela [data-id]' ).each(( i, product ) => {
            const id = $( product ).data( 'id' );
            if ( !productsId.some( p => p === id ) ) {
                productsId.push( id )
            }
        } );
        return productsId;
    }
}
