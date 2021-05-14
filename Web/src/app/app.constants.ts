import { environment } from '../environments/environment';

export class AppConstants {
  public static AUTH_REGESTER = environment.baseUrl + 'auth/register?=';
  public static VERIFY_OTP = environment.baseUrl + 'auth/verify-otp';
}
