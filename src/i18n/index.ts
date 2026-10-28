import { tr, type Messages } from "./tr";
export type SupportedLocale = "tr";
export const locale: SupportedLocale = "tr";
export const messages: Messages = tr;
export const formatNumber = (value: number) =>
  new Intl.NumberFormat(messages.numberLocale).format(value);
export const searchText = (value: string) =>
  value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ı/g, "i");
