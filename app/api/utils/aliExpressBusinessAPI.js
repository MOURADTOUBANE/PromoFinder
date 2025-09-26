
import crypto from 'crypto';

export class AliExpressBusinessAPI {
  constructor(appKey, appSecret, trackingId) {
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.trackingId = trackingId;
    this.baseUrl = 'https://api-sg.aliexpress.com/sync';
  }

  generateSignature(parameters) {
    const sortedKeys = Object.keys(parameters).sort();
    let signString = '';
    
    sortedKeys.forEach(key => {
      signString += key + parameters[key];
    });
    
    return crypto
      .createHmac('sha256', this.appSecret)
      .update(signString)
      .digest('hex')
      .toUpperCase();
  }

 async searchProducts(keyword, page = 1, pageSize = 20, categoryId = '') {
  const timestamp = new Date().toISOString().replace(/\.\d{3}Z$/, '+0000');

  const params = {
    method: 'aliexpress.affiliate.product.query',
    app_key: this.appKey,
    sign_method: 'sha256',
    timestamp: timestamp,
    v: '2.0',
    page_no: page.toString(),
    page_size: pageSize.toString(),
    tracking_id: this.trackingId,
    platform_product_type: 'ALL',
    target_currency: 'USD',
    target_language: 'EN',
    ship_to_country: 'US',
    sort: 'SALE_PRICE_ASC', 
    ...(keyword !== 'All' ? { keywords: keyword } : {}),     
    ...(categoryId ? { category_ids: categoryId } : {})      
  };

  params.sign = this.generateSignature(params);

  const queryString = new URLSearchParams(params).toString();
  const url = `${this.baseUrl}?${queryString}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
}

}