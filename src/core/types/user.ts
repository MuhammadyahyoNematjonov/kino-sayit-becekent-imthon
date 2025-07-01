export enum UserRole {
    Admin = "ADMIN",
    SuperAdmin = "SUPERADMIN",
    User = "USER"
  }
  
  export enum UserSubscriptionStatus {
    ACTIVE = 'active',
    EXPIRED = 'expired',
    CANCELED = 'canceled',
    PENDING_PAYMENT = 'pending_payment'
  }
  
  export enum PaymentMethod {
    CARD = 'card',
    PAYPAL = 'paypal',
    BANK_TRANSFER = 'bank_transfer',
    CRYPTO = 'crypto'
  }
  
  export enum PaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
    REFUNDED = 'refunded'
  }
  
  export enum MovieQuality {
    Q240 = '240p',
    Q360 = '360p',
    Q480 = '480p',
    Q720 = '720p',
    Q1080 = '1080p',
    Q4K = '4K'
  }
  
  export enum subscriptionType {
    FREE = 'free',
    PREMIUM = 'premium'
  }
  
export interface checktoken {
    id:number,
    role:string
}