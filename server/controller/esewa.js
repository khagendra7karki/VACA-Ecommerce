import base64 from 'base-64'

import fetch from 'node-fetch'
import Order from '../models/Order.js';

const verifyPayment = async (req, res, next) => {
    try {
        const { data } = req.body;
        var decodedData = base64.decode(data);
        const decodedJSON = JSON.parse(decodedData.toString())
        console.log(decodedJSON);
        const {product_code = "ggg" ,total_amount = 100 ,transaction_uuid = "csjdsk"} = decodedJSON
        const num_total_amount = total_amount.replaceAll(',', '')
        console.log("total amount ", total_amount)
        const parsedUrl = new URL("https://uat.esewa.com.np/api/epay/transaction/status/")
        parsedUrl.searchParams.append("product_code",product_code)
        parsedUrl.searchParams.append("total_amount",num_total_amount)
        parsedUrl.searchParams.append("transaction_uuid",transaction_uuid)
        console.log(parsedUrl)
        const response = await fetch(
            parsedUrl,
            {
                method: 'GET',
            }
        );

        const body = await response.json();

        console.log(body);

        if (body.status === "COMPLETE") {
            const newOrder = await Order.findByIdAndUpdate(transaction_uuid, {
                $set : { isPaid: true, paidAt: new Date(0)}
            }, {new: true}).lean()

            res.json({status : body.status, orderId : transaction_uuid })
           // next()
        } else {
            return res.status(400)
        }

    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }

}

export default verifyPayment