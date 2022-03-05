import "react-i18next";
import type MESSAGES from "../messages";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: typeof MESSAGES;
  }
}
