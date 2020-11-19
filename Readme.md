## Ecom Mobile listing API using Express:

### Description:

This is the API for mobile listing platform created using express js.
The data set for this is retrieved from the `products.json` file data folder.

The Data can be accessed on `/products` route .
The app consists of 2 endpoints.

1.  `GET` Endpoint to get all the Products
2.  `PUT` endpoint with Product id to Buy a product.

The GET endpoint accepts the query params such as os, storage, price_gt, price_st & memory for filtering.

    /products?os[]=WINDOWS&price_st=7000

The filtering accepts multiple values

    /products?os[]=WINDOWS&os[]=ANDROID

For sorting the sortby query accepts 2 values such as asce & desc

    /products?sortby=desc
