import { request } from 'https';
import { URL } from 'url';
import CryptoJS from 'crypto-js';
import {CallbackResponse, EdfapayConfig, OrderPayload, PayerPayload} from "./Types";



export class Edfapay {
    private readonly config: EdfapayConfig;

    constructor(
        EDFAPAY_EDFA_MERCHANT_ID: string,
        EDFAPAY_PASSWORD: string,
        EDFAPAY_TERM_URL_3DS: string,
        EDFAPAY_RECURRING_INIT: 'N' | 'Y' = 'N',
        EDFAPAY_AUTH: 'N' | 'Y' = 'N',
        EDFAPAY_REQ_TOKEN: 'N' | 'Y' = 'N'
    ) {
        this.config = {
            action: 'SALE',
            edfa_merchant_id: EDFAPAY_EDFA_MERCHANT_ID,
            password: EDFAPAY_PASSWORD,
            term_url_3ds: EDFAPAY_TERM_URL_3DS,
            recurring_init: EDFAPAY_RECURRING_INIT,
            auth: EDFAPAY_AUTH,
            req_token: EDFAPAY_REQ_TOKEN,
        };

        if (!this.config.edfa_merchant_id) {
            throw new Error('EDFA Merchant ID is required');
        }
        if (!this.config.password) {
            throw new Error('Password is required');
        }
        if (!this.config.term_url_3ds) {
            throw new Error('Term URL 3DS is required');
        }
    }

    private createSignature(orderPayload: OrderPayload): string {
        const { order_id, order_amount, order_currency, order_description } = orderPayload;
        const toMd5 = `${order_id}${order_amount}${order_currency}${order_description}${this.config.password}`.toUpperCase();
        const md5Hash = CryptoJS.MD5(toMd5).toString();
        const sha1Hash = CryptoJS.SHA1(md5Hash).toString();
        return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Hex.parse(sha1Hash));
    }

    private createPayload(orderPayload: OrderPayload, payerPayload: PayerPayload): Record<string, string> {
        return {
            action: this.config.action,
            edfa_merchant_id: this.config.edfa_merchant_id,
            order_id: orderPayload.order_id,
            order_amount: orderPayload.order_amount,
            order_currency: orderPayload.order_currency,
            order_description: orderPayload.order_description,
            payer_first_name: payerPayload.payer_first_name,
            payer_last_name: payerPayload.payer_last_name,
            payer_email: payerPayload.payer_email,
            payer_ip: payerPayload.payer_ip,
            payer_phone: payerPayload.payer_phone,
            payer_address: payerPayload.payer_address,
            payer_country: payerPayload.payer_country,
            payer_city: payerPayload.payer_city,
            payer_zip: payerPayload.payer_zip,
            term_url_3ds: this.config.term_url_3ds,
            recurring_init: this.config.recurring_init,
            auth: this.config.auth,
            req_token: this.config.req_token,
            hash: this.createSignature(orderPayload),
        };
    }

    private async sendRequest(url: string, payload: Record<string, string>): Promise<any> {
        return new Promise((resolve, reject) => {
            const urlObj = new URL(url);
            const formData = new URLSearchParams(payload).toString();

            const options = {
                hostname: urlObj.hostname,
                path: urlObj.pathname,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': formData.length,
                },
            };

            const req = request(options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });

            req.on('error', (e) => {
                reject(new Error(`Problem with request: ${e.message}`));
            });

            req.write(formData);
            req.end();
        });
    }

    public async initiatePayment(orderPayload: OrderPayload, payerPayload: PayerPayload): Promise<CallbackResponse> {
        const payload = this.createPayload(orderPayload, payerPayload);
        try {
            return await this.sendRequest('https://api.edfapay.com/payment/initiate', payload);
        } catch (error: any) {
            throw new Error(`Error initiating payment: ${error.message}`);
        }
    }
}
