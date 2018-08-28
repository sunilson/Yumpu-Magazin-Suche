import { InjectionToken } from "@angular/core";
import { Language } from "./models";

export const YUMPU_LANGUAGES = new InjectionToken<Language[]>('Yumpu Languages')