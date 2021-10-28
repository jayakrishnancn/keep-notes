import { RefObject } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export function captchaWrapper(recaptchaRef: RefObject<ReCAPTCHA>) {
  if (!recaptchaRef?.current) {
    return Promise.reject<string>("No recaptcha ref");
  }
  return recaptchaRef.current.executeAsync().then(token => {
    if (!token) {
      return Promise.reject("No token");
    }
    return token;
  });
}
