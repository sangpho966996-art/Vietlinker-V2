declare function formatVND(amount: number): string;
declare function formatUSD(amount: number): string;
declare function formatNumber(num: number): string;
declare function formatVietnameseNumber(num: number): string;
declare function formatRelativeTime(date: string | Date): string;
declare function formatVietnameseDate(date: string | Date): string;
declare function formatVietnameseDateTime(date: string | Date): string;
declare function formatPhoneNumber(phone: string, country?: 'vn' | 'us'): string;
declare function truncateText(text: string, maxLength: number): string;

declare function validateVietnamesePhone(phone: string): boolean;
declare function validateUSPhone(phone: string): boolean;
declare function validateEmail(email: string): boolean;
declare function removeVietnameseAccents(str: string): string;
declare function normalizeVietnameseText(text: string): string;
declare function createSearchSlug(text: string): string;
declare function validateVietnameseName(name: string): boolean;
declare function validatePrice(price: number, min?: number, max?: number): boolean;
declare function sanitizeInput(input: string): string;
declare function validatePostalCode(postalCode: string, country?: 'vn' | 'us'): boolean;

declare const US_VIETNAMESE_CITIES: readonly ["San Jose, CA", "Orange County, CA", "Los Angeles, CA", "San Francisco, CA", "Sacramento, CA", "San Diego, CA", "Fresno, CA", "Houston, TX", "Dallas, TX", "Austin, TX", "San Antonio, TX", "Fort Worth, TX", "Seattle, WA", "Tacoma, WA", "Spokane, WA", "Northern Virginia, VA", "Washington, DC", "Richmond, VA", "New Orleans, LA", "Atlanta, GA", "Boston, MA", "Philadelphia, PA", "Chicago, IL", "Minneapolis, MN", "Denver, CO", "Phoenix, AZ", "Portland, OR", "Las Vegas, NV", "Miami, FL", "Tampa, FL", "Oklahoma City, OK", "Kansas City, MO", "Columbus, OH", "Indianapolis, IN", "Charlotte, NC", "Nashville, TN", "Memphis, TN", "Louisville, KY"];
declare const US_STATES: readonly ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
declare const VIETNAMESE_CATEGORIES: {
    readonly 'rao-vat': "Rao vặt";
    readonly 'viec-lam': "Việc làm";
    readonly 'nha-dat': "Nhà đất";
    readonly 'xe-co': "Xe cộ";
    readonly 'dien-tu': "Điện tử";
    readonly 'thoi-trang': "Thời trang";
    readonly 'giai-tri': "Giải trí";
    readonly 'the-thao': "Thể thao";
    readonly 'lam-dep': "Làm đẹp";
    readonly 'an-uong': "Ẩm thực";
    readonly 'giao-duc': "Giáo dục";
    readonly 'y-te': "Y tế";
    readonly 'dich-vu': "Dịch vụ";
};
declare const VIETNAMESE_UNITS: {
    readonly distance: {
        readonly km: "km";
        readonly m: "mét";
        readonly mi: "dặm";
    };
    readonly area: {
        readonly m2: "m²";
        readonly ft2: "ft²";
        readonly acre: "mẫu Anh";
    };
    readonly weight: {
        readonly kg: "kg";
        readonly g: "gram";
        readonly lb: "pound";
    };
};
declare const VIETNAMESE_TIME_UNITS: {
    readonly year: "năm";
    readonly years: "năm";
    readonly month: "tháng";
    readonly months: "tháng";
    readonly week: "tuần";
    readonly weeks: "tuần";
    readonly day: "ngày";
    readonly days: "ngày";
    readonly hour: "giờ";
    readonly hours: "giờ";
    readonly minute: "phút";
    readonly minutes: "phút";
    readonly second: "giây";
    readonly seconds: "giây";
};
declare const PHONE_NUMBER_PATTERNS: {
    readonly vietnam: RegExp;
    readonly us: RegExp;
};

declare function isVietnameseText(text: string): boolean;
declare function getVietnameseInitials(name: string): string;
declare function convertToVietnameseKeyboard(text: string): string;

export { PHONE_NUMBER_PATTERNS, US_STATES, US_VIETNAMESE_CITIES, VIETNAMESE_CATEGORIES, VIETNAMESE_TIME_UNITS, VIETNAMESE_UNITS, convertToVietnameseKeyboard, createSearchSlug, formatNumber, formatPhoneNumber, formatRelativeTime, formatUSD, formatVND, formatVietnameseDate, formatVietnameseDateTime, formatVietnameseNumber, getVietnameseInitials, isVietnameseText, normalizeVietnameseText, removeVietnameseAccents, sanitizeInput, truncateText, validateEmail, validatePostalCode, validatePrice, validateUSPhone, validateVietnameseName, validateVietnamesePhone };
