import { createUserTable } from "../models/usertable.js"
import { createOrderItemTable } from "../models/OrderitemsTable.js"
import { createOrdersTable } from "../models/ordersTable.js"
import { createPaymentsTable } from "../models/paymentsTable.js"
import { createProductReviewsTable } from "../models/productReviewsTable.js"
import { createProductsTable } from "../models/productTable.js"
import { createShippingInfoTable } from "../models/shippinginfoTable.js"
export const createTables=async()=>{
    try{
        await createUserTable();
        await createProductsTable();
        await createProductReviewsTable();
        await createOrdersTable();
        await createOrderItemTable();
        await createShippingInfoTable();
        await createPaymentsTable();
        console.log("all tables created successfully");
    }
        catch(error){
            console.error("error creating tables :",error);
        }
};
