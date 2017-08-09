
/**
 * 
 * 
 * @class Product
 */
class Product {

    constructor( url ) {
        this.id = parseInt( url.split( 'produto/' )[ 1 ].split( '/' )[ 0 ] ); // TODO: get productId
        this.url = url;
        this.description = 'Processador Intel Core i5-7600k Kaby Lake 7a Geração, Cache 6MB, 3.8GHz (4.2GHz Max Turbo), LGA 1151 BX80677I57600K';
        this.intervalId = undefined;
        this.buySwitch = new Switch( url );
        this.buySwitch.toggleObserver.subscribe( this.onSwitchClick, this );

        this.updateObserver = new Observer();
    }

    get active () {
        return this.buySwitch.checked;
    }

    tryBuy () {
        $.get( this.url, this.tryClickBuy.bind( this ) );
    }

    tryClickBuy ( html ) {
        const button = $( `[data-id=${this.id}]` );
        if ( button.length > 0 ) {
            // button.click();
            $.get( button.prop( 'href' ) );
            this.updateCart();
        }
    }

    startBuyLoop () {
        this.intervalId = setInterval( this.tryBuy.bind( this ), appConfig.DEFAULT_BUY_TIMEOUT );
    }

    stopBuyLoop () {
        clearInterval( this.intervalId );
        this.buySwitch.turnOff();
    }

    onSwitchClick ( checked ) {
        this.updateObserver.fire();
        checked ? this.startBuyLoop() : this.stopBuyLoop();
    }

    updateCart () {
        chrome.runtime.sendMessage( { updateCart: true, productId: this.id } );
    }
}
