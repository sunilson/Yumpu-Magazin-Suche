import { Injectable } from '@angular/core';
import * as Storage from "electron-json-storage";
import { resolve } from 'dns';
import { MagazineSearchResult, MagazineSearch } from '../yumpu-stuff/models';
import { HelperFunctionsService } from '../util/helper-functions.service';

@Injectable()
export class LocalStorageRepositoryService {

  constructor(private helperFunctions: HelperFunctionsService) {
    console.log(Storage)
    this.storeSelection([])
  }

  public getApiKey(): Promise<string> {
    return new Promise((resolve, reject) => {
      Storage.get("apiKey", (error, result) => {
        if (error) reject(error)
        else {
          if (Object.keys(result).length === 0) resolve("")
          else resolve(result)
        }
      })
    })
  }

  public setApiKey(apiKey: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!apiKey) {
        throw new Error("Invalid key given!")
      }

      Storage.set("apiKey", apiKey, (error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  }

  public storeSingleResult(selected: MagazineSearchResult): Promise<any> {
    return new Promise((resolve, reject) => {
      Storage.set(selected.id, selected, (error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  }

  public loadSingleResult(id: string): Promise<MagazineSearchResult> {
    return new Promise((resolve, reject) => {
      Storage.get(id, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }

  public storeSelection(selected: MagazineSearchResult[]): Promise<any> {
    return new Promise((resolve, reject) => {
      Storage.set("lastSelected", selected, (error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  }

  public loadLastSelection(): Promise<MagazineSearchResult[]> {
    return new Promise((resolve, reject) => {
      Storage.get("lastSelected", (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }

  public activateSearch(search: MagazineSearch): Promise<any> {
    return new Promise((resolve, reject) => {
      Storage.set("activeSearch", search, (error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  }

  public loadActiveSearch(): Promise<MagazineSearch> {
    return new Promise((resolve, reject) => {
      Storage.get("activeSearch", (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }


  public storeSearch(search: MagazineSearch): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadAllSearches().then(savedSearches => {
        savedSearches.push(search)
        Storage.set("searchResults", savedSearches, (error) => {
          if (error) reject(error)
          else resolve()
        })
      }).catch(err => {
        reject(err)
      })
    })
  }

  public loadAllSearches(): Promise<MagazineSearch[]> {
    return new Promise((resolve, reject) => {
      Storage.get("searchResults", (error, result) => {
        if (error) reject(error)
        else resolve((!this.helperFunctions.checkEmpty(result)) ? [] : result)
      })
    })
  }
}