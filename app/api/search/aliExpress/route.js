import { NextResponse } from 'next/server';
import { AliExpressBusinessAPI } from '@/app/api/utils/aliExpressBusinessAPI';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword') || 'All';
  const page = searchParams.get('page') || '1';
  const category = searchParams.get('category') || 'All';
  const discount = parseInt(searchParams.get('discount') || '0', 10);
  const site = searchParams.get('site') || 'Ali Express'; 

  const appKey = process.env.ALIEXPRESS_APP_KEY;
  const appSecret = process.env.ALIEXPRESS_APP_SECRET;
  const trackingId = process.env.ALIEXPRESS_TRACKING_ID;

  if (!appKey || !appSecret || !trackingId) {
    return NextResponse.json({
      success: false,
      error: 'Missing API credentials. Please check your environment variables.'
    }, { status: 400 });
  }

  try {
    if (site === 'Ali Express') {
      const apiClient = new AliExpressBusinessAPI(appKey, appSecret, trackingId);
      const apiResponse = await apiClient.searchProducts(keyword, parseInt(page), 20, category);

      if (apiResponse.aliexpress_affiliate_product_query_response?.resp_result?.result) {
        const result = apiResponse.aliexpress_affiliate_product_query_response.resp_result.result;

        if (result.products?.product && Array.isArray(result.products.product)) {
          let products = result.products.product.map(product => {
            const salePrice =
              parseFloat(product.target_sale_price) || parseFloat(product.sale_price) || 0;
            const originalPrice =
              parseFloat(product.target_original_price) ||
              parseFloat(product.original_price) ||
              salePrice;

            const discountPercent =
              originalPrice > 0
                ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
                : 0;

            return {
              productId: product.product_id,
              title: product.product_title,
              image: product.product_main_image_url,
              price: salePrice,
              originalPrice: originalPrice,
              discount: discountPercent,
              currency: product.target_sale_price_currency || product.sale_price_currency,
              rating: product.evaluate_rate,
              orders: product.lastest_volume,
              productUrl: product.promotion_link || product.product_detail_url,
              storeName: product.shop_name,
              storeUrl: product.shop_url
            };
          });

          products = products.filter(p => p.discount >= discount);

          return NextResponse.json({
            success: true,
            products,
            total: result.current_record_count || 0,
            currentPage: parseInt(page),
            hasNext: parseInt(page) * 20 < (result.total_results_count || 0)
          });
        }
      }
    }

    return NextResponse.json({ success: true, products: [], total: 0 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
