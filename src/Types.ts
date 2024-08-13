export interface EdfapayConfig {
    action: 'SALE';
    edfa_merchant_id: string;
    password: string;
    term_url_3ds: string;
    recurring_init: 'N' | 'Y';
    auth: 'N' | 'Y';
    req_token: 'N' | 'Y';
}

export interface OrderPayload {
    order_id: string;
    order_amount: string;
    order_currency: string;
    order_description: string;
}

export interface PayerPayload {
    payer_first_name: string;
    payer_last_name: string;
    payer_email: string;
    payer_ip: string;
    payer_phone: string;
    payer_address: string;
    payer_country: string;
    payer_city: string;
    payer_zip: string;
}


// Common parameters
interface BaseResponse {
    action: string;
    result: string;
    status: string;
    order_id: string;
    trans_id: string;
    hash: string;
    trans_date: string;
}

// Successful Sale response
interface SuccessfulSaleResponse extends BaseResponse {
    action: 'SALE';
    result: 'SUCCESS';
    status: 'SETTLED';
    recurring_token?: string;
    schedule_id?: string;
    card_token?: string;
    card: string;
    card_expiration_date: string;
    descriptor: string;
    amount: string;
    currency: string;
}

// Unsuccessful Sale response
interface UnsuccessfulSaleResponse extends BaseResponse {
    action: 'SALE';
    result: 'DECLINED';
    status: 'DECLINED';
    decline_reason: string;
}

// 3D-Secure transaction response
interface ThreeDSecureResponse extends BaseResponse {
    action: 'SALE';
    result: 'REDIRECT';
    status: '3DS/REDIRECT';
    descriptor: string;
    amount: string;
    currency: string;
    redirect_url: string;
    redirect_params: any; // specify the exact type if known
    redirect_method: 'POST' | 'GET';
    card: string;
    card_expiration_date: string;
}

// Sale response (Apple Pay)
interface ApplePayResponse {
    id: string;
    order_number: string;
    order_amount: string;
    order_currency: string;
    order_description: string;
    hash: string;
    type: 'sale' | 'refund';
    status: 'success' | 'fail';
}

// Sale response (Tamara)
interface TamaraResponse {
    id: string;
    order_number: string;
    order_amount: string;
    order_currency: string;
    order_description: string;
    type: 'sale' | 'refund';
    status: 'success' | 'fail';
    source: 'tamara';
}

// Sale response (Manafith)
interface ManafithResponse {
    id: string;
    order_number: string;
    order_amount: string;
    order_currency: string;
    order_description: string;
    hash: string;
    type: 'sale' | 'refund';
    status: 'success' | 'fail';
    source: 'manafith';
}

// Discriminated union of all response types
type CallbackResponse =
    | SuccessfulSaleResponse
    | UnsuccessfulSaleResponse
    | ThreeDSecureResponse
    | ApplePayResponse
    | TamaraResponse
    | ManafithResponse;

export {
    SuccessfulSaleResponse,
    UnsuccessfulSaleResponse,
    ThreeDSecureResponse,
    ApplePayResponse,
    TamaraResponse,
    ManafithResponse,
    CallbackResponse
};
