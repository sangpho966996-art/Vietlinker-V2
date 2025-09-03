// src/stripe.ts
import Stripe from "stripe";
var StripeService = class {
  constructor(secretKey) {
    this.stripe = new Stripe(secretKey, {
      apiVersion: "2023-08-16"
    });
  }
  async createPaymentIntent(params) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: params.amount,
      currency: params.currency || "vnd",
      metadata: params.metadata,
      description: params.description,
      automatic_payment_methods: {
        enabled: true
      }
    });
    return {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      client_secret: paymentIntent.client_secret
    };
  }
  async createCheckoutSession(params) {
    const creditPackage = this.getCreditPackage(params.packageId);
    if (!creditPackage) {
      throw new Error("Credit package not found");
    }
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "vnd",
            product_data: {
              name: creditPackage.name,
              description: creditPackage.description
            },
            unit_amount: creditPackage.price
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: {
        userId: params.userId,
        packageId: params.packageId,
        credits: creditPackage.credits.toString()
      }
    });
    return session;
  }
  async retrievePaymentIntent(paymentIntentId) {
    return await this.stripe.paymentIntents.retrieve(paymentIntentId);
  }
  async constructWebhookEvent(payload, signature, webhookSecret) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      );
      return {
        id: event.id,
        type: event.type,
        data: event.data,
        created: event.created
      };
    } catch (error) {
      throw new Error(`Webhook signature verification failed: ${error}`);
    }
  }
  // Helper method to get credit package details
  getCreditPackage(packageId) {
    const packages = this.getCreditPackages();
    return packages.find((pkg) => pkg.id === packageId) || null;
  }
  // Define available credit packages
  getCreditPackages() {
    return [
      {
        id: "starter",
        name: "G\xF3i Kh\u1EDFi \u0110\u1EA7u",
        credits: 50,
        price: 5e4,
        // 50,000 VND
        description: "Ph\xF9 h\u1EE3p cho ng\u01B0\u1EDDi d\xF9ng m\u1EDBi",
        features: [
          "50 credits \u0111\u1EC3 \u0111\u0103ng tin",
          "H\u1ED7 tr\u1EE3 24/7",
          "Tin \u0111\u0103ng hi\u1EC3n th\u1ECB 30 ng\xE0y"
        ]
      },
      {
        id: "popular",
        name: "G\xF3i Ph\u1ED5 Bi\u1EBFn",
        credits: 150,
        price: 135e3,
        // 135,000 VND
        originalPrice: 15e4,
        discount: 10,
        popular: true,
        description: "L\u1EF1a ch\u1ECDn t\u1ED1t nh\u1EA5t cho doanh nghi\u1EC7p nh\u1ECF",
        features: [
          "150 credits \u0111\u1EC3 \u0111\u0103ng tin",
          "Tin \u0111\u0103ng n\u1ED5i b\u1EADt",
          "Th\u1ED1ng k\xEA chi ti\u1EBFt",
          "H\u1ED7 tr\u1EE3 \u01B0u ti\xEAn"
        ]
      },
      {
        id: "business",
        name: "G\xF3i Doanh Nghi\u1EC7p",
        credits: 500,
        price: 45e4,
        // 450,000 VND
        originalPrice: 5e5,
        discount: 10,
        description: "D\xE0nh cho doanh nghi\u1EC7p l\u1EDBn",
        features: [
          "500 credits \u0111\u1EC3 \u0111\u0103ng tin",
          "Tin \u0111\u0103ng n\u1ED5i b\u1EADt + g\u1EA5p",
          "Qu\u1EA3n l\xFD nhi\u1EC1u t\xE0i kho\u1EA3n",
          "API access",
          "Account manager ri\xEAng"
        ]
      },
      {
        id: "premium",
        name: "G\xF3i Cao C\u1EA5p",
        credits: 1e3,
        price: 85e4,
        // 850,000 VND
        originalPrice: 1e6,
        discount: 15,
        description: "Kh\xF4ng gi\u1EDBi h\u1EA1n cho doanh nghi\u1EC7p l\u1EDBn",
        features: [
          "1000 credits \u0111\u1EC3 \u0111\u0103ng tin",
          "T\u1EA5t c\u1EA3 t\xEDnh n\u0103ng cao c\u1EA5p",
          "White-label solution",
          "Custom integration",
          "Dedicated support"
        ]
      }
    ];
  }
};
function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(amount);
}
function convertToStripeAmount(amountInVND) {
  return Math.round(amountInVND);
}

// src/utils.ts
function calculateSavings(originalPrice, salePrice) {
  return originalPrice - salePrice;
}
function calculateDiscountPercentage(originalPrice, salePrice) {
  if (originalPrice <= 0) return 0;
  return Math.round((originalPrice - salePrice) / originalPrice * 100);
}
function formatCurrency(amount, currency = "VND") {
  const locale = currency === "VND" ? "vi-VN" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "VND" ? 0 : 2,
    maximumFractionDigits: currency === "VND" ? 0 : 2
  }).format(amount);
}
function sortPackagesByPopularity(packages) {
  return [...packages].sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return a.price - b.price;
  });
}
function getRecommendedPackage(packages) {
  const popularPackage = packages.find((pkg) => pkg.popular);
  if (popularPackage) return popularPackage;
  const sortedByPrice = packages.sort((a, b) => a.price - b.price);
  const middleIndex = Math.floor(sortedByPrice.length / 2);
  return sortedByPrice[middleIndex] || null;
}
function validateWebhookSignature(payload, signature, secret) {
  try {
    const expectedSignature = signature.split(",").find((s) => s.trim().startsWith("t="));
    return !!expectedSignature;
  } catch {
    return false;
  }
}
function isValidCreditAmount(credits) {
  return credits > 0 && credits <= 1e4 && Number.isInteger(credits);
}
function calculateCreditsNeeded(featuredDays = 0, urgentDays = 0, extraPhotos = 0) {
  const baseCredits = 1;
  const featuredCredits = featuredDays * 2;
  const urgentCredits = urgentDays * 3;
  const photoCredits = Math.max(0, extraPhotos - 5) * 1;
  return baseCredits + featuredCredits + urgentCredits + photoCredits;
}
export {
  StripeService,
  calculateCreditsNeeded,
  calculateDiscountPercentage,
  calculateSavings,
  convertToStripeAmount,
  formatCurrency,
  formatVND,
  getRecommendedPackage,
  isValidCreditAmount,
  sortPackagesByPopularity,
  validateWebhookSignature
};
