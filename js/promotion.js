/**
 * 
 * 
 * @class Kabum
 */
class Promotion {

    constructor() {
        this.products = {}
        this.storage = new Storage()
        chrome.runtime.sendMessage( { addPromotion: true } );

        chrome.runtime.onMessage.addListener(
            ( request, sender, sendResponse ) => {
                if ( request.cartList ) {
                    request.cartList.forEach( productId => this.stopProduct( productId ) );
                }
            } );
    }

    stopProduct ( id ) {
        const product = this.products[ id ];
        if ( product && product.active ) {
            product.stopBuyLoop()
            // Display a success toast, with a title
            toastr.success( `${ product.description } buyed, have fun!`, 'Hu3Hu3 BR' )
        }
    }

    parseProductList () {
        const listPromotion = $( document ).find( appConfig.SELECTOR_LIST_PROMOTION ); //TODO: promotion selector
        listPromotion.forEach( promotion => {
            const product = new Product( promotion.product.url );
            this.products[ product.id ] = product; //TODO: get product url
        } );
        this.syncStorage( this.products );
    }

    mockParseProductList () {
        const product = new Product( document.location.href )
        this.products[ product.id ] = product;
    }

    syncStorage () {
        this.storage.sync( this.products.map( i => i.id ) );
    }
}
