import { Injectable, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LocalStorageRepositoryService } from '../../storage/local-storage-repository.service';
import { ApiKeySetupComponent } from '../api-key-setup/api-key-setup.component';
import { Language, SearchOptions, MagazineSearchResult, Magazine } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { YUMPU_LANGUAGES } from '../tokens'
import * as moment from 'moment';
import { Observable, empty, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { request } from 'http';

@Injectable()
export class YumpuApiService {

  private apiKey: string = ""
  private initialized: boolean = false
  public currentSearchResult: MagazineSearchResult[] | null = null
  public currentSearchSettings: SearchOptions | null = null

  constructor(
    private localStorage: LocalStorageRepositoryService,
    private dialog: MatDialog,
    private httpClient: HttpClient,
    @Inject(YUMPU_LANGUAGES) public languages: Language[]) {
    this.initialize()
  }

  public async initialize() {
    this.apiKey = await this.localStorage.getApiKey()
    if (!this.apiKey) {
      this.changeApiKey(() => {
        this.initialized = true
      })
    } else {
      this.initialized = true
    }
  }

  public changeApiKey(cb?: () => any) {
    const dialogRef = this.dialog.open(ApiKeySetupComponent, {
      width: '250px',
      data: { title: "Hallo123" },
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(result => {
      this.apiKey = result
      if (cb) cb()
    });
  }

  public multiMagazineDetails(ids: string[]): Observable<Magazine[]> {

    const requests = []
    ids.forEach(id => {
      requests.push(this.magazineDetails(id))
    })

    return forkJoin(...requests).pipe(
      map(val => {
        console.log(val)
        return []
      })
    )
  }

  public magazineDetails(id: string): Observable<Magazine> {
    const httpOptions = {
      headers: this.prepareHeader()
    };

    return this.httpClient.get(`https://api.yumpu.com/2.0/document.json?id=${id}`, httpOptions).pipe(map(val => {
      console.log(val)
      return new Magazine()
    }))
  }

  public search(searchOptions: SearchOptions): Observable<MagazineSearchResult[]> {
    this.currentSearchSettings = searchOptions
    const { query, language, limit, startDate, offset, order } = searchOptions
    const httpOptions = {
      headers: this.prepareHeader()
    };

    return this.httpClient
      .get(`https://search.yumpu.com/2.0/search.json?q=${query}&limit=${limit}${(language) ? "&language=" + language.short : ""}${(startDate) ? "&create_date=" + startDate.format("YYYY-MM-DD") + "-" + moment().format("YYYY-MM-DD") : ""}&offset=${offset}&sort=${order.valueOf()}`, httpOptions)
      .pipe(
        map(val => {
          const result = []
          if (val && val["documents"] && val["documents"].length > 0) {
            val["documents"].forEach(document => {
              result.push(new MagazineSearchResult(document["id"].toString(), document["title"], document["url"], document["image"]["medium"], (document["tags"]) ? document["tags"] : []))
            });
            if (offset != 0) this.currentSearchResult = this.currentSearchResult.concat(result)
            else this.currentSearchResult = result
            return result
          } else {
            return []
          }
        })
      )
  }

  public continueSearch(): Observable<MagazineSearchResult[]> {
    let newSearchOptions = this.currentSearchSettings
    newSearchOptions.offset = this.currentSearchResult.length
    return this.search(newSearchOptions)
  }

  private prepareHeader(): {} {
    return new HttpHeaders({
      'x-access-token': this.apiKey
    })
  }
}