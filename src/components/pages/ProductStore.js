// Coffee: price_1LnUTFDM1jwCEz8OGoOSXiSM
// Sunglasses: price_1LnUTxDM1jwCEz8OAqHYTwKQ
// Camera: price_1LnUUoDM1jwCEz8OvxIcJ7to

const productsArray = [
    {
        id: "price_1Mkob5J0oWXoHVY4QNI9TDGs",
        title: "Basic",
        price: 10
    },
    {
        id: "price_1MkoetJ0oWXoHVY4w4IbPyS2",
        title: "Advanced",
        price: 30
    },
    {
        id: "price_1MkofvJ0oWXoHVY4r0unM554",
        title: "Premium",
        price: 50
    }
];

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData == undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, getProductData };