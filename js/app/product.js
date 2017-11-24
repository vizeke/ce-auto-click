
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

        // this.id = parseInt( url.split( 'produto/' )[ 1 ].split( '/' )[ 0 ] ); // TODO: might change
        this.id = parseInt( url.split( '?codigo=' )[ 1 ] ); // TODO: might change
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

        this.checkCart = this.throttle( appConfig.DEBOUNC_CHECKCART, () => {
            return $.get( 'https://www.kabum.com.br/cgi-local/site/carrinho/carrinho.cgi', ( data ) => {
                if ( $( data ).find( `.carrinhoTabela [data-id=${this.id}]` ).length ) {
                    this.stop();
                    if ( !this.bought ) {
                        this.bought = true;
                        toastr.success( `${this.description} bought, have fun!`, 'Hu3Hu3 BR' )
                        this.updateCart();
                    }
                }
            } )
        } );
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

        const strToFind = appConfig.ADD_TO_CART_BOUNDARY + this.id + '&di=';
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
        if ( this.active ) {
            if ( this.iiiiiiitsTiiiiiime() ) {
                this.startBuyLoop();
            } else {
                setTimeout( () => this.countdownLoop(), 1000 );
            }
        }
    }

    iiiiiiitsTiiiiiime () {
        let time = this.$product.find( appConfig.SELECTOR_PRODUCT_TIME );

        if ( !time.length ) {
            return this.$product.find( appConfig.SELECTOR_PRODUCT_BUY_BUTTON ).length > 0;
        }

        let strTime = time.text().trim();

        let secondsToPromotion = strTime
            .split( ':' )
            .map( i => parseInt( i ) )
            .reverse()
            .reduce( ( acum, value, index ) => acum + value * Math.pow( 60, index ), 0 );

        return secondsToPromotion <= appConfig.START_BUY_LOOP_GAP;
    }

    updateCart () {
        chrome.runtime.sendMessage( { updateCart: true, productId: this.id } );
    }

    debounce ( func, wait, immediate ) {
        var timeout;
        return () => {
            let context = this;
            let args = arguments;

            let later = () => {
                timeout = null;
                if ( !immediate ) {
                    func.apply( context, args );
                }
            };

            let callNow = immediate && !timeout;

            clearTimeout( timeout );

            timeout = setTimeout( later, wait );

            if ( callNow ) {
                func.apply( context, args );
            }
        };
    };

    throttle ( delay, noTrailing, callback, debounceMode ) {

        // After wrapper has stopped being called, this timeout ensures that
        // `callback` is executed at the proper times in `throttle` and `end`
        // debounce modes.
        var timeoutID;

        // Keep track of the last time `callback` was executed.
        var lastExec = 0;

        // `noTrailing` defaults to falsy.
        if ( typeof noTrailing !== 'boolean' ) {
            debounceMode = callback;
            callback = noTrailing;
            noTrailing = undefined;
        }

        // The `wrapper` function encapsulates all of the throttling / debouncing
        // functionality and when executed will limit the rate at which `callback`
        // is executed.
        function wrapper () {

            var self = this;
            var elapsed = Number( new Date() ) - lastExec;
            var args = arguments;

            // Execute `callback` and update the `lastExec` timestamp.
            function exec () {
                lastExec = Number( new Date() );
                callback.apply( self, args );
            }

            // If `debounceMode` is true (at begin) this is used to clear the flag
            // to allow future `callback` executions.
            function clear () {
                timeoutID = undefined;
            }

            if ( debounceMode && !timeoutID ) {
                // Since `wrapper` is being called for the first time and
                // `debounceMode` is true (at begin), execute `callback`.
                exec();
            }

            // Clear any existing timeout.
            if ( timeoutID ) {
                clearTimeout( timeoutID );
            }

            if ( debounceMode === undefined && elapsed > delay ) {
                // In throttle mode, if `delay` time has been exceeded, execute
                // `callback`.
                exec();

            } else if ( noTrailing !== true ) {
                // In trailing throttle mode, since `delay` time has not been
                // exceeded, schedule `callback` to execute `delay` ms after most
                // recent execution.
                //
                // If `debounceMode` is true (at begin), schedule `clear` to execute
                // after `delay` ms.
                //
                // If `debounceMode` is false (at end), schedule `callback` to
                // execute after `delay` ms.
                timeoutID = setTimeout( debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay );
            }

        }

        // Return the wrapper function.
        return wrapper;

    };
}
