/**
 * 
 * 
 * @class Kabum
 */
class Promotion {

    constructor() {
        this.products = {}
        this.storage = new Storage()
    }

    parseProductList () {
        $('.ce-auto-click.switch').remove();
        
        const listPromotion = $( document ).find( appConfig.SELECTOR_LIST_PROMOTION );
        listPromotion.each( ( index, prod ) => {
            const product = new Product( $(prod) );
        
            if (product && product.url) {
                product.updateObserver.subscribe( this.syncStorage, this );
                this.products[ product.id ] = product;

                let savedProduct = this.storage.products[ product.id ];
                if ( savedProduct && savedProduct.active ) {
                    product.activate();
                }
            }
        
        } );
        // this.syncStorage( this.products );
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

    syncStorage ( product ) {
        let storageProducts = this.storage.products;
        storageProducts[ product.id ] = { active: product.active };
        
        this.storage.sync( storageProducts );
    }
}
