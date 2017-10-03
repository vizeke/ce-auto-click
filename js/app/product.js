
/**
 * 
 * 
 * @class Product
 */
class Product {

    constructor( $product ) {
        let productUrl = product.find( '.contBLOCO1.contadorFOTO a' ).attr( 'href' );

        this.id = parseInt( url.split( 'produto/' )[ 1 ].split( '/' )[ 0 ] ); // TODO: get productId
        this.url = url;
        this.description = 'Processador Intel Core i5-7600k Kaby Lake 7a Geração, Cache 6MB, 3.8GHz (4.2GHz Max Turbo), LGA 1151 BX80677I57600K';
        this.intervalId = undefined;
        this.buySwitch = new Switch( this.id );
        this.buySwitch.toggleObserver.subscribe( this.onSwitchClick, this );

        $product.prepend( this.buySwitch.getElement() );

        this.updateObserver = new Observer();
    }

    get active () {
        return this.buySwitch.checked;
    }

    activate () {
        this.buySwitch.turnOn();
    }

    tryBuy () {
        $.get( this.url, this.tryClickBuy.bind( this ) );
    }

    tryClickBuy ( html ) {

        //let d = performance.now();
        let link = html.substring( html.indexOf( 'void(1)\');" href="' ) + 18 )
        link = l.substring( 0, l.indexOf( '"' ) )
        if ( link ) {
            $.get( link, this.updateCart );
        }
        //console.log( "nativo: " + ( performance.now() - d ) )

        /* d = performance.now();
        let body = $(html);
        console.log( "jquery: " + ( performance.now() - d ) ) 
        const link = document.querySelectorAll( `[data-id="${this.id}"]` );
        if ( link.length > 0 ) {
            $.get( link[ 0 ].href, this.updateCart );
        }*/
    }

    stop () {
        this.stopBuyLoop();
        this.buySwitch.turnOff();
    }

    startBuyLoop () {
        //TODO: start only when the promotion is almost on time
        if ( !this.intervalId ) {
            this.intervalId = setInterval( this.tryBuy.bind( this ), appConfig.DEFAULT_BUY_TIMEOUT );
        }
    }

    stopBuyLoop () {
        if ( this.intervalId ) {
            clearInterval( this.intervalId );
            this.intervalId = undefined;
        }
    }

    onSwitchClick ( checked ) {
        this.updateObserver.fire();
        checked ? this.startBuyLoop() : this.stopBuyLoop();
    }

    updateCart () {
        chrome.runtime.sendMessage( { updateCart: true, productId: this.id } );
    }
}
