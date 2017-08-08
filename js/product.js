
/**
 * 
 * 
 * @class Product
 */
class Product {

    constructor( url ) {
        this.id = url
        this.url = url
        this.intervalId = undefined
        this.buySwitch = new Switch( url )
        this.buySwitch.subscribe( this.onSwitchClick )
    }

    tryBuy () {
        return $.get( this.url, this.tryClickBuy );
    }

    tryClickBuy ( html ) {
        const button = $( html ).find( appConfig.SELECTOR_BUY_BUTTON ).first()
        if ( button.length > 0 ) {
            button.click()
        }
    }

    startBuyLoop () {
        this.intervalId = setInterval( product.tryBuy, appConfig.DEFAULT_BUY_TIMEOUT );
    }

    stopBuyLoop ( id ) {
        clearInterval( this.intervalId );
    }

    onSwitchClick ( checked ) {
        checked ? this.startBuyLoop() : this.stopBuyLoop()
    }
}
