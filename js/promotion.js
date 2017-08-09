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

    init () {
        if ( this.storage.products ) {
            //TODO: Check storage and create products accordingly
        }
    }

    stopProduct ( id ) {
        const product = this.products[ id ];
        if ( product && product.active ) {
            product.stopBuyLoop()
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
        } );
        this.syncStorage( this.products );
    }

    mockParseProductList () {
        const product = new Product( document.location.href )
        product.updateObserver.subscribe( this.syncStorage, this );
        this.products[ product.id ] = product;
        this.syncStorage( this.products );
    }

    syncStorage () {
        this.storage.sync( Object.keys(this.products).map( p => ( { id: this.products[p].id, active: this.products[p].active } ) ) );
    }
}
