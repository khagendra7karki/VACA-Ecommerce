import { store } from "../../state/store";
import CryptoJS from "crypto-js";


export default function esewaCall({total_amount = 0 , tax_amount = 0, product_delivery_charge = 0, product_service_charge = 0, amount = 0, }){
    const orderCreate = store.getState().orderCreate.orderCreate
    const Message = `total_amount=${total_amount},transaction_uuid=${orderCreate._id},product_code=EPAYTEST`
    const secret = "8gBm/:&EnhH.1/q"
    var hash = CryptoJS.HmacSHA256(Message, secret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    var params = {
      amount: `${amount}`,
      failure_url: `${process.env.REACT_APP_WEBPAGE_URL}/esewa_payment_failed`,
      product_delivery_charge: `${product_delivery_charge}`,
      product_service_charge: `${product_service_charge}`,
      product_code: "EPAYTEST",
      signature: hashInBase64,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: `${process.env.REACT_APP_WEBPAGE_URL}/esewa_payment_success`,
      tax_amount: `${tax_amount}`,
      total_amount: `${total_amount}`,
      transaction_uuid: orderCreate._id,
    }
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute(
        "value",
        params[key as keyof typeof params].toString()
      );
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();

}