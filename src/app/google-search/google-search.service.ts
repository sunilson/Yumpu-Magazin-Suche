import { Injectable } from '@angular/core';
import { LocalStorageRepositoryService } from '../storage/local-storage-repository.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { tap, map, expand, reduce } from "rxjs/operators"
import { GoogleSearchResult } from './models/GoogleSearchResult';
import moment, { isMoment } from 'moment';


@Injectable()
export class GoogleSearchService {

  private apiKey: string = "AIzaSyCzoaUXOcOXNWYkXMOAwWqV-RKk8VhnGZ4"
  private searchEngineName = "001040249087084517191:r3m7dp9ijig"

  constructor(
    private localStorage: LocalStorageRepositoryService,
    private httpClient: HttpClient
  ) { }

  unRestrictedSearch(query: string, max: number = 100): Observable<GoogleSearchResult[]> {
    return Observable.create(observer => {
      this.httpClient.get(`https://www.googleapis.com/customsearch/v1/siterestrict?key=${this.apiKey}&cx=${this.searchEngineName}&q=${query}`).pipe(
        expand(val => {
          console.log(val["queries"]["nextPage"][0]["startIndex"])
          return (val["queries"] && val["queries"]["nextPage"] && val["queries"]["nextPage"][0]) ?
            this.httpClient.get(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.searchEngineName}&q=${query}&startIndex=${val["queries"]["nextPage"][0]["startIndex"]}`)
            : empty()
        }),
        reduce(val => {
          console.log(val)
          return null
        })
      ).subscribe((val) => {
        console.log(val)
        observer.next(val)
        observer.complete()
      })
    })
    /*
    return this.httpClient.get(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.searchEngineName}&q=${query}`)
      .pipe(map(val => {
        console.log(this.convertResultToModel(val))
        return this.convertResultToModel(val)
      }))
      */
  }

  languageRestrictedSearch(language: string, query: string, max: number = 100) {
    return this.httpClient.get("https://www.google.at/search?num=100&q=site%3Ayumpu.com%2Fde+auto&oq=site%3Ayumpu.com%2Fde+auto", {
      headers: new HttpHeaders()
    }).pipe(tap(val => {
      console.log(val)
    }))

    /*
    return this.httpClient.get(`https://www.googleapis.com/customsearch/v1?key=${this.apiKey}&cx=${this.searchEngineName}&q=${query}&siteSearch=www.yumpu.com%2F${language}`)
      .pipe(tap(val => {
        console.log(val)
        return this.convertResultToModel(val)
      }))
      */
  }

  private convertResultToModel(result: any): GoogleSearchResult[] {
    if (!result["items"]) return []
    return result["items"].map(result => {
      return new GoogleSearchResult(result["title"], result["snippet"], result["link"])
    })
  }
}
