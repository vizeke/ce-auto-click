
/**
 * 
 * 
 * @class Product
 */
class Product {
    
    constructor( url ) {
        this.url = url
        this.intervalId = undefined
    }

    tryClick () {
        return $.get( this.url, this.clickBuy );
    }

    clickBuy ( html ) {
        const button = $( html ).find( appConfig.SELECTOR_BUY_BUTTON ).first()
        if ( button.length > 0 ) {
            button.click()
        }
    }
}
