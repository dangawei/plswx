Component({
    externalClasses: ['i-class'],

    properties: {
        // circle || square
        shape: {
            type: String,
            value: 'circle'
        },
        // small || large || default
        size: {
            type: String,
            value: 'default'
        },
        src: {
            type: String,
            value: ''
        },
        wid: {
            type: String,
            value: ''
        },
        heig: {
            type: String,
            value: ''
        },
    }
});
