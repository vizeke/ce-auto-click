const appConfig = {
    // TODO: adjust selectors
    SELECTOR_LIST_PROMOTION: 'div.DIVcontador',
    SELECTOR_PRODUCT_NAME: '.contBLOCO2 .contTITULO.link a',
    SELECTOR_PRODUCT_TIME: '',
    SELECTOR_PRODUCT_BUY_BUTTON: '',

    PRODUCT_BASE_URL: 'https://www.kabum.com.br/cgi-local/site/produtos/descricao_ofertas.cgi?codigo=',

    ADD_TO_CART_BOUNDARY: 'https://www.kabum.com.br/cgi-local/site/carrinho/adicionar.cgi?codigo=',

    ROUND_SWITCH_HTML: '<label class="switch ce-auto-click"><input class="buy-switch" type="checkbox"><span class="slider-input round"></span></label>',
    ACTIVATE_BUTTON_HTML: '<button class="activate">Ativar</button>',

    DEFAULT_BUY_TIMEOUT: 1000, 
    START_BUY_LOOP_GAP: 20
}
