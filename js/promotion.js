/**
 * 
 * 
 * @class Kabum
 */
class Promotion {

    constructor() {
        this.products = []
        this.storage = new Storage()

        // $( appConfig.SELECTOR_BOX_BUTTON ).on( 'click', '.buy-switch', this.buySwitchClick.bind( this ) )
    }

    parseProductList () {
        const listPromotion = $( document ).find( appConfig.SELECTOR_LIST_PROMOTION );
        listPromotion.forEach( promotion => {
            this.products.push( new Product( promotion.product.url ) ) //TODO
        } ); 
        this.syncStorage( this.products )
    }

    mockParseProductList () {
        new Product( promotion.product.url )
    }

    syncStorage () {
        this.storage.sync( this.products.map( i => i.id ) );
    }
}
