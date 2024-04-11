import { vnPayDateFormat, createMd5Hash, createSHA256Hash } from "./utils";

export namespace VnPay {
  export interface CheckoutPayload {
    createdDate?: string;
    amount: number;
    clientIp?: string;
    currency?: string;
    bankCode?: string;
    locale?: "vn" | "en";
    orderId: string;
    orderInfo: string;
    orderType: string;
    returnUrl: string;
    vnpSecretKey?: string;
    vnpMerchant?: string;
    vnpCommand?: string;
    vnpVersion?: string;
  }
  export interface CheckoutResponse {
    amount: number;
    cardType: string;
    payDate: string;
    orderInfo: string;
    transactionNo: string;
    responseCode: string;
    orderId: string;
    bankCode: string;
    bankTransactionNo: string;
  }
  export interface Config {
    paymentGateway: string;
    merchant: string;
    secureSecret: string;
  }
}


export class VnPayConnect {
  static defaultCheckoutPayload = {
    currency: "VND",
    locale: "vn",
    vnpVersion: "2.0.0",
    vnpCommand: "pay",
  };

  constructor(private readonly config: VnPay.Config) {}

  buildCheckoutUrl(payload: VnPay.CheckoutPayload) {
    const data = { ...VnPayConnect.defaultCheckoutPayload, ...payload };
    const config = this.config;

    data.vnpSecretKey = config.secureSecret;
    data.vnpMerchant = config.merchant;
    data.amount = Math.floor(data.amount * 100);

    const params = {
      vnp_Version: data.vnpVersion,
      vnp_Command: data.vnpCommand || "pay",
      vnp_TmnCode: data.vnpMerchant,
      vnp_Locale: data.locale || "vn",
      vnp_BankCode: data.bankCode,
      vnp_CurrCode: data.currency,
      vnp_TxnRef: data.orderId,
      vnp_OrderInfo: data.orderInfo,
      vnp_OrderType: data.orderType,
      vnp_Amount: data.amount.toString(),
      vnp_ReturnUrl: data.returnUrl,
      vnp_IpAddr: data.clientIp || "0.0.0.0",
      vnp_CreateDate: data.createdDate || vnPayDateFormat(new Date()),
    };
    const redirectUrl = new URL(config.paymentGateway);

    const secureCode = [];

    Object.keys(params)
      .sort()
      .forEach((key) => {
        const value = params[key];

        if (value == null || value.length === 0) return;
        redirectUrl.searchParams.append(key, value); // no need to encode URI with URLSearchParams object

        if (
          value.length > 0 &&
          (key.substr(0, 4) === "vnp_" || key.substr(0, 5) === "user_")
        ) {
          // secureCode is digested from vnp_* params but they should not be URI encoded
          secureCode.push(`${key}=${value}`);
        }
      });

    if (secureCode.length > 0) {
      redirectUrl.searchParams.append("vnp_SecureHashType", "MD5");
      redirectUrl.searchParams.append(
        "vnp_SecureHash",
        createSHA256Hash(data.vnpSecretKey + secureCode.join("&"))
      );
    }
    return redirectUrl;
  }
}
