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
            product.stop();
            // Display a success toast, with a title
            toastr.success( `${product.description} buyed, have fun!`, 'Hu3Hu3 BR' )
        }
    }

    parseProductList () {
        const listPromotion = $( document ).find( appConfig.SELECTOR_LIST_PROMOTION ); //TODO: promotion selector
        listPromotion.forEach( promotion => {
            const product = new Product( promotion.product.url );
            product.updateObserver.subscribe( this.syncStorage, this );
            this.products[ product.id ] = product; //TODO: get product url

            let savedProduct = this.storage.products[ product.id ];
            if ( savedProduct && savedProduct.active ) {
                product.activate();
            }
        } );
        this.syncStorage( this.products );
    }

    mockParseProductList () {
        const product = new Product( document.location.href );
        product.updateObserver.subscribe( this.syncStorage, this );
        this.products[ product.id ] = product;

        let savedProduct = this.storage.products[ product.id ];
        if ( savedProduct && savedProduct.active ) {
            product.activate();
        }

        this.syncStorage( this.products );
    }

    syncStorage () {
        let storageProducts = {};
        Object.keys( this.products ).forEach( p => storageProducts[ p ] = { active: this.products[ p ].active } );
        this.storage.sync( storageProducts );
    }
}
