import { Injectable } from '@angular/core';
import * as Storage from "electron-json-storage";
import { resolve } from 'dns';
import { MagazineSearchResult } from '../yumpu-stuff/models';

@Injectable()
export class LocalStorageRepositoryService {

  constructor() {
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
}