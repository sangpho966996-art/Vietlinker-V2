"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  PHONE_NUMBER_PATTERNS: () => PHONE_NUMBER_PATTERNS,
  US_STATES: () => US_STATES,
  US_VIETNAMESE_CITIES: () => US_VIETNAMESE_CITIES,
  VIETNAMESE_CATEGORIES: () => VIETNAMESE_CATEGORIES,
  VIETNAMESE_TIME_UNITS: () => VIETNAMESE_TIME_UNITS,
  VIETNAMESE_UNITS: () => VIETNAMESE_UNITS,
  convertToVietnameseKeyboard: () => convertToVietnameseKeyboard,
  createSearchSlug: () => createSearchSlug,
  formatNumber: () => formatNumber,
  formatPhoneNumber: () => formatPhoneNumber,
  formatRelativeTime: () => formatRelativeTime,
  formatUSD: () => formatUSD,
  formatVND: () => formatVND,
  formatVietnameseDate: () => formatVietnameseDate,
  formatVietnameseDateTime: () => formatVietnameseDateTime,
  formatVietnameseNumber: () => formatVietnameseNumber,
  getVietnameseInitials: () => getVietnameseInitials,
  isVietnameseText: () => isVietnameseText,
  normalizeVietnameseText: () => normalizeVietnameseText,
  removeVietnameseAccents: () => removeVietnameseAccents,
  sanitizeInput: () => sanitizeInput,
  truncateText: () => truncateText,
  validateEmail: () => validateEmail,
  validatePostalCode: () => validatePostalCode,
  validatePrice: () => validatePrice,
  validateUSPhone: () => validateUSPhone,
  validateVietnameseName: () => validateVietnameseName,
  validateVietnamesePhone: () => validateVietnamesePhone
});
module.exports = __toCommonJS(index_exports);

// src/formatting.ts
var import_date_fns = require("date-fns");
function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
function formatUSD(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}
function formatNumber(num) {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  }
  return num.toString();
}
function formatVietnameseNumber(num) {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + " tri\u1EC7u";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + " ngh\xECn";
  }
  return num.toString();
}
function formatRelativeTime(date) {
  const targetDate = typeof date === "string" ? new Date(date) : date;
  const now = /* @__PURE__ */ new Date();
  const diffInMinutes = Math.floor((now.getTime() - targetDate.getTime()) / (1e3 * 60));
  if (diffInMinutes < 1) return "V\u1EEBa xong";
  if (diffInMinutes < 60) return `${diffInMinutes} ph\xFAt tr\u01B0\u1EDBc`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} gi\u1EDD tr\u01B0\u1EDBc`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} ng\xE0y tr\u01B0\u1EDBc`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks} tu\u1EA7n tr\u01B0\u1EDBc`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} th\xE1ng tr\u01B0\u1EDBc`;
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} n\u0103m tr\u01B0\u1EDBc`;
}
function formatVietnameseDate(date) {
  const targetDate = typeof date === "string" ? new Date(date) : date;
  return (0, import_date_fns.format)(targetDate, "dd/MM/yyyy");
}
function formatVietnameseDateTime(date) {
  const targetDate = typeof date === "string" ? new Date(date) : date;
  return (0, import_date_fns.format)(targetDate, "HH:mm dd/MM/yyyy");
}
function formatPhoneNumber(phone, country = "vn") {
  const cleaned = phone.replace(/\D/g, "");
  if (country === "vn") {
    if (cleaned.startsWith("84")) {
      const number = cleaned.substring(2);
      return `+84 ${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6)}`;
    } else if (cleaned.startsWith("0")) {
      return `${cleaned.substring(0, 4)} ${cleaned.substring(4, 7)} ${cleaned.substring(7)}`;
    }
  } else if (country === "us") {
    if (cleaned.length === 10) {
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
    } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
      return `+1 (${cleaned.substring(1, 4)}) ${cleaned.substring(4, 7)}-${cleaned.substring(7)}`;
    }
  }
  return phone;
}
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

// src/constants.ts
var US_VIETNAMESE_CITIES = [
  // California - largest Vietnamese population
  "San Jose, CA",
  "Orange County, CA",
  "Los Angeles, CA",
  "San Francisco, CA",
  "Sacramento, CA",
  "San Diego, CA",
  "Fresno, CA",
  // Texas - second largest
  "Houston, TX",
  "Dallas, TX",
  "Austin, TX",
  "San Antonio, TX",
  "Fort Worth, TX",
  // Washington State
  "Seattle, WA",
  "Tacoma, WA",
  "Spokane, WA",
  // Virginia/DC area
  "Northern Virginia, VA",
  "Washington, DC",
  "Richmond, VA",
  // Other states with Vietnamese communities
  "New Orleans, LA",
  "Atlanta, GA",
  "Boston, MA",
  "Philadelphia, PA",
  "Chicago, IL",
  "Minneapolis, MN",
  "Denver, CO",
  "Phoenix, AZ",
  "Portland, OR",
  "Las Vegas, NV",
  "Miami, FL",
  "Tampa, FL",
  // Smaller but notable Vietnamese communities
  "Oklahoma City, OK",
  "Kansas City, MO",
  "Columbus, OH",
  "Indianapolis, IN",
  "Charlotte, NC",
  "Nashville, TN",
  "Memphis, TN",
  "Louisville, KY"
];
var US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];
var VIETNAMESE_CATEGORIES = {
  "rao-vat": "Rao v\u1EB7t",
  "viec-lam": "Vi\u1EC7c l\xE0m",
  "nha-dat": "Nh\xE0 \u0111\u1EA5t",
  "xe-co": "Xe c\u1ED9",
  "dien-tu": "\u0110i\u1EC7n t\u1EED",
  "thoi-trang": "Th\u1EDDi trang",
  "giai-tri": "Gi\u1EA3i tr\xED",
  "the-thao": "Th\u1EC3 thao",
  "lam-dep": "L\xE0m \u0111\u1EB9p",
  "an-uong": "\u1EA8m th\u1EF1c",
  "giao-duc": "Gi\xE1o d\u1EE5c",
  "y-te": "Y t\u1EBF",
  "dich-vu": "D\u1ECBch v\u1EE5"
};
var VIETNAMESE_UNITS = {
  distance: {
    km: "km",
    m: "m\xE9t",
    mi: "d\u1EB7m"
  },
  area: {
    m2: "m\xB2",
    ft2: "ft\xB2",
    acre: "m\u1EABu Anh"
  },
  weight: {
    kg: "kg",
    g: "gram",
    lb: "pound"
  }
};
var VIETNAMESE_TIME_UNITS = {
  year: "n\u0103m",
  years: "n\u0103m",
  month: "th\xE1ng",
  months: "th\xE1ng",
  week: "tu\u1EA7n",
  weeks: "tu\u1EA7n",
  day: "ng\xE0y",
  days: "ng\xE0y",
  hour: "gi\u1EDD",
  hours: "gi\u1EDD",
  minute: "ph\xFAt",
  minutes: "ph\xFAt",
  second: "gi\xE2y",
  seconds: "gi\xE2y"
};
var PHONE_NUMBER_PATTERNS = {
  vietnam: /^(\+84|84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
  us: /^(\+1|1)?[2-9]\d{2}[2-9]\d{2}\d{4}$/
};

// src/validation.ts
function validateVietnamesePhone(phone) {
  return PHONE_NUMBER_PATTERNS.vietnam.test(phone.replace(/\s|-/g, ""));
}
function validateUSPhone(phone) {
  return PHONE_NUMBER_PATTERNS.us.test(phone.replace(/\s|-|\(|\)/g, ""));
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function removeVietnameseAccents(str) {
  const accents = [
    /[\u00c0-\u00c6]/g,
    /[\u00c8-\u00cb]/g,
    /[\u00cc-\u00cf]/g,
    /[\u00d2-\u00d8]/g,
    /[\u00d9-\u00dc]/g,
    /[\u00dd]/g,
    /[\u00e0-\u00e6]/g,
    /[\u00e8-\u00eb]/g,
    /[\u00ec-\u00ef]/g,
    /[\u00f2-\u00f8]/g,
    /[\u00f9-\u00fc]/g,
    /[\u00fd\u00ff]/g,
    /[\u0102\u0103]/g,
    /[\u0110\u0111]/g,
    /[\u0128\u0129]/g,
    /[\u0168\u0169]/g,
    /[\u01a0\u01a1]/g,
    /[\u01af\u01b0]/g,
    /[\u1ea0-\u1ef9]/g
  ];
  const noAccents = [
    "A",
    "E",
    "I",
    "O",
    "U",
    "Y",
    "a",
    "e",
    "i",
    "o",
    "u",
    "y",
    "A",
    "D",
    "I",
    "U",
    "O",
    "U"
  ];
  let result = str;
  for (let i = 0; i < accents.length; i++) {
    result = result.replace(accents[i], noAccents[i] || "");
  }
  return result;
}
function normalizeVietnameseText(text) {
  return removeVietnameseAccents(text).toLowerCase().trim();
}
function createSearchSlug(text) {
  return normalizeVietnameseText(text).replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function validateVietnameseName(name) {
  const vietnameseNameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵýỷỹ\s]+$/;
  return vietnameseNameRegex.test(name) && name.trim().length >= 2;
}
function validatePrice(price, min = 0, max = Infinity) {
  return typeof price === "number" && !isNaN(price) && price >= min && price <= max;
}
function sanitizeInput(input) {
  return input.trim().replace(/<[^>]*>/g, "");
}
function validatePostalCode(postalCode, country = "vn") {
  if (country === "vn") {
    return /^\d{6}$/.test(postalCode);
  } else {
    return /^\d{5}(-\d{4})?$/.test(postalCode);
  }
}

// src/utils.ts
function isVietnameseText(text) {
  const vietnameseRegex = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  return vietnameseRegex.test(text);
}
function getVietnameseInitials(name) {
  return name.split(" ").map((word) => word.charAt(0)).join("").toUpperCase().slice(0, 2);
}
function convertToVietnameseKeyboard(text) {
  const mappings = {
    "a": "\u0103",
    "e": "\xEA",
    "o": "\xF4",
    "u": "\u01B0",
    "A": "\u0102",
    "E": "\xCA",
    "O": "\xD4",
    "U": "\u01AF"
  };
  return text.replace(/[aeouAEOU]/g, (match) => mappings[match] || match);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PHONE_NUMBER_PATTERNS,
  US_STATES,
  US_VIETNAMESE_CITIES,
  VIETNAMESE_CATEGORIES,
  VIETNAMESE_TIME_UNITS,
  VIETNAMESE_UNITS,
  convertToVietnameseKeyboard,
  createSearchSlug,
  formatNumber,
  formatPhoneNumber,
  formatRelativeTime,
  formatUSD,
  formatVND,
  formatVietnameseDate,
  formatVietnameseDateTime,
  formatVietnameseNumber,
  getVietnameseInitials,
  isVietnameseText,
  normalizeVietnameseText,
  removeVietnameseAccents,
  sanitizeInput,
  truncateText,
  validateEmail,
  validatePostalCode,
  validatePrice,
  validateUSPhone,
  validateVietnameseName,
  validateVietnamesePhone
});
