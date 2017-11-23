
/**
 * 
 * 
 * @class Product
 */
class Product {

    constructor( $product ) {
        const anchor = $product.find( appConfig.SELECTOR_PRODUCT_NAME );

        if ( !anchor.length ) {
            return;
        }

        const url = anchor.attr( 'href' );

        this.id = parseInt( url.split( 'produto/' )[ 1 ].split( '/' )[ 0 ] ); // TODO: might change
        this.url = appConfig.PRODUCT_BASE_URL + this.id;
        this.description = anchor.text();
        this.intervalId = undefined;
        this.buySwitch = new Switch( this.id );
        this.buySwitch.toggleObserver.subscribe( this.onSwitchClick, this );

        this.bought = false;
        this.successHits = 0;
        this.maxSuccessHitsNeeded = 3;
        this.timeoutItsTime = null;
        this.$product = $product;

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

        const strToFind = appConfig.ADD_TO_CART_BOUNDARY + this.id;
        let link = html.substring( html.indexOf( strToFind ) );

        link = link.substring( 0, link.indexOf( '"' ) )
        if ( link ) {
            $.get( link, () => {
                this.checkCart();
                if ( ++this.successHits >= this.maxSuccessHitsNeeded ) {
                    this.stop();
                }
            } );
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
        this.updateObserver.fire( this );

        if ( !checked ) {
            this.stopBuyLoop();
        }

        this.countdownLoop();
    }

    countdownLoop () {
        if ( this.buySwitch.checked ) {
            if ( this.iiiiiiitsTiiiiiime() ) {
                this.startBuyLoop();
            } else {
                setTimeout( this.countdownLoop, 1000 );
            }
        }
    }

    iiiiiiitsTiiiiiime () {
        let time = $product.find( appConfig.SELECTOR_PRODUCT_TIME );

        if ( !time.length ) {
            return $product.find( appConfig.SELECTOR_PRODUCT_BUY_BUTTON ).length > 0;
        }

        let strTime = time.html();

        let secondsToPromotion = strTime
            .split( ':' )
            .map( i => parseInt( i ) )
            .reverse()
            .reduce( ( acum, value, index ) => acum + value * Math.pow( 60, index ), 0 );

        return secondsToPromotion <= appConfig.START_BUY_LOOP_GAP;
    }

    checkCart () {
        $.get( 'https://www.kabum.com.br/cgi-local/site/carrinho/carrinho.cgi', ( data ) => {
            if ( $( data ).find( `.carrinhoTabela [data-id=${this.id}]` ).length ) {
                this.stop();
                if ( !this.bought ) {
                    this.bought = true;
                    toastr.success( `${this.description} bought, have fun!`, 'Hu3Hu3 BR' )
                    this.updateCart();
                }
            }
        } );
    }

    updateCart () {
        chrome.runtime.sendMessage( { updateCart: true, productId: this.id } );
    }
}
