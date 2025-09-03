import Stripe from 'stripe';

interface CreditPackage {
    id: string;
    name: string;
    credits: number;
    price: number;
    originalPrice?: number;
    discount?: number;
    popular?: boolean;
    description?: string;
    features?: string[];
}
interface PaymentIntent {
    id: string;
    amount: number;
    currency: string;
    status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled';
    client_secret: string;
}
interface StripeConfig {
    publishableKey: string;
    secretKey: string;
    webhookSecret: string;
}
interface CreatePaymentIntentParams {
    amount: number;
    currency?: string;
    metadata?: Record<string, any>;
    description?: string;
}
interface CreateCheckoutSessionParams {
    packageId: string;
    userId: string;
    successUrl: string;
    cancelUrl: string;
}
interface WebhookEvent {
    id: string;
    type: string;
    data: {
        object: any;
    };
    created: number;
}

declare class StripeService {
    private stripe;
    constructor(secretKey: string);
    createPaymentIntent(params: CreatePaymentIntentParams): Promise<{
        id: string;
        amount: number;
        currency: string;
        status: Stripe.PaymentIntent.Status;
        client_secret: string;
    }>;
    createCheckoutSession(params: CreateCheckoutSessionParams): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
    constructWebhookEvent(payload: string | Buffer, signature: string, webhookSecret: string): Promise<WebhookEvent>;
    private getCreditPackage;
    getCreditPackages(): CreditPackage[];
}
declare function formatVND(amount: number): string;
declare function convertToStripeAmount(amountInVND: number): number;

declare function calculateSavings(originalPrice: number, salePrice: number): number;
declare function calculateDiscountPercentage(originalPrice: number, salePrice: number): number;
declare function formatCurrency(amount: number, currency?: string): string;
declare function sortPackagesByPopularity(packages: CreditPackage[]): CreditPackage[];
declare function getRecommendedPackage(packages: CreditPackage[]): CreditPackage | null;
declare function validateWebhookSignature(payload: string | Buffer, signature: string, secret: string): boolean;
declare function isValidCreditAmount(credits: number): boolean;
declare function calculateCreditsNeeded(featuredDays?: number, urgentDays?: number, extraPhotos?: number): number;

export { type CreateCheckoutSessionParams, type CreatePaymentIntentParams, type CreditPackage, type PaymentIntent, type StripeConfig, StripeService, type WebhookEvent, calculateCreditsNeeded, calculateDiscountPercentage, calculateSavings, convertToStripeAmount, formatCurrency, formatVND, getRecommendedPackage, isValidCreditAmount, sortPackagesByPopularity, validateWebhookSignature };
