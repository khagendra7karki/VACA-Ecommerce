const INITIAL_STATE : any   = {
    cart:{
        cartItems: [],
        shippingAddress: [],
        paymentMethod: [],
    },
    products:{
        products: [{

        }],
        error: null,
        loading: false,
    },
    review:{
        review: {},
        error: null,
        loading: false,
    },

    userRegister:{
        userInfo: null,
        error: null,
        loading: false,
    },
    uerLogin:{
        userInfo: null,
        error: null,
        loading: false,
    },
    order:{
        order: {},
        error: null,
        loading: false,
    },
    orderCreate:{
        orderCreate: {},
        error: null,
        loading: false,
    },
    orderPay:{
        success: false,
        error: null,
        loading: false,
    },
    user:{
        userInfo: null,
        error: null,
        loading: false,
    },
    orders:{
        orders: [],
        error: null,
        loading: false,
    },
    orderDeliver:{
        success: false,
        error: null,
        loading: false,
    },
    createProduct:{
        productCreate: false,
        error: null,
        loading: false,
    },
    topProducts:{
        topProducts: [],
        error: null,
        loading: false,
    },
    quickSearch:{
        quickSearch: [],
        error: null,
        loading: false,
    },
    myOrders:{
        myOrders: false,
        error: null,
        loading: false,
    },
    profileUpdate:{
        profileUpdate: {},
        error: null,
        loading: false,
    },
    userUpdate:{
        userUpdate: {},
        error: null,
        loading: false,
    },

}


export default INITIAL_STATE
export type TYPE_INITIAL_STATE = typeof INITIAL_STATE