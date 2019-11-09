import { Component, OnInit, OnDestroy } from '@angular/core';
import { YumpuApiService } from '../../yumpu-stuff/providers/yumpu-api.service';
import { LocalStorageRepositoryService } from '../../storage/local-storage-repository.service';
import { Location } from '@angular/common';
import { MagazineSearchResult, MagazineSearch } from '../../yumpu-stuff/models';
import moment from "moment"
import { Router } from '@angular/router';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-magazine-export',
  templateUrl: './magazine-export.component.html',
  styleUrls: ['./magazine-export.component.scss']
})
export class MagazineExportComponent implements OnInit, OnDestroy {

  currentSelection: MagazineSearchResult[] = []
  currentSearch: MagazineSearch
  archived: boolean = false

  constructor(
    public yumpuService: YumpuApiService,
    public localStorage: LocalStorageRepositoryService,
    public router: Router,
    public location: Location,
    public electronService: ElectronService
  ) {
    this.archived = router.url.includes("archived")

    if (this.archived) {
      this.localStorage.loadActiveSearch().then(search => {
        this.currentSelection = search.results
        this.currentSearch = search
      }).catch(err => this.location.back())
    } else {
      this.localStorage.loadLastSelection().then(result => {
        this.currentSelection = result
      }).catch(error => this.location.back())
    }
  }

  saveSearch() {
    this.localStorage.storeSearch(new MagazineSearch(moment(), this.yumpuService.currentSearchSettings, this.currentSelection)).then(() => {
      this.router.navigate(["/"])
    }).catch(err => console.log(err))
  }

  deleteSearch() {
    alert("TODO")
  }

  openAll() {
    this.currentSelection.forEach(selection => {
      this.electronService.shell.openExternal(selection.url)
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.localStorage.storeSelection([])
  }
}
