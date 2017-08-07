/**
 * 
 * 
 * @class Kabum
 */
class Kabum {

    constructor() {
        this.idCount = 0
        this.products = []
        this.storage = new Storage()

        $( '.box_botao' ).on( 'click', '.buy-switch', this.buySwitchClick.bind( this ) )
    }

    proccessPromotionList () {
        const listPromotion = $( document ).find( appConfig.SELECTOR_LIST_PROMOTION );
        listPromotion.forEach( promotion => promotion.addBuySwitch( 'meuid' ) )
    }

    addBuySwitch ( id ) {
        let buySwitch = $( appConfig.ROUND_SWITCH_HTML )
        buySwitch.find( 'input' ).attr( 'id', id )
        $( '.box_botao' ).prepend( buySwitch )
    }

    buySwitchClick ( e ) {
        e.target.checked ? this.startBuyLoop( e.target.id ) : this.stopBuyLoop( e.target.id )
    }

    startBuyLoop ( id ) {
        const product = new Product();
        //product.intervalId = setInterval( product.tryClick, appConfig.DEFAULT_BUY_TIMEOUT );
        product.intervalId = setInterval(() => console.log( id ), appConfig.DEFAULT_BUY_TIMEOUT );
        this.products.push( { id: id, product: product } )
        this.syncStorage();
    }

    stopBuyLoop ( id ) {
        this.products = this.products.filter( i => {
            if ( i.id === id ) {
                if ( i.product.intervalId ) {
                    clearInterval( i.product.intervalId );
                }
                return false;
            }
            return true;
        } );
        this.syncStorage();
    }

    syncStorage () {
        this.storage.sync( JSON.stringify( this.products.map( i => i.id ) ) );
    }

}
