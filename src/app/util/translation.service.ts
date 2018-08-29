import { Injectable } from '@angular/core';
import { Language } from '../yumpu-stuff/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TranslationService {

  private apiKey = "fe86d9b7119b4bdd82b24a32758fc74f"

  constructor(private httpClient: HttpClient) {
    this.translateString("Hallo, wie geht es dir?", new Language("en", "Englisch"))
  }

  translateString(value: string, to: Language, from?: Language): Observable<string> {
    return this.httpClient.post(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${to.short}`, [
      {
        "Text": value
      }], {
        headers: new HttpHeaders({
          "Ocp-Apim-Subscription-Key": this.apiKey
        })
      }).pipe(
        map(val => {
          console.log(val)
          return val[0]["translations"][0]["text"]
        })
      )
  }
}
