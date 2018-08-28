import { Component, OnInit } from '@angular/core';
import { YumpuApiService } from '../../yumpu-stuff/providers/yumpu-api.service';
import { LocalStorageRepositoryService } from '../../storage/local-storage-repository.service';
import { Location } from '@angular/common';
import { MagazineSearchResult } from '../../yumpu-stuff/models';

@Component({
  selector: 'app-magazine-export',
  templateUrl: './magazine-export.component.html',
  styleUrls: ['./magazine-export.component.scss']
})
export class MagazineExportComponent implements OnInit {

  currentSelection: MagazineSearchResult[] = []

  constructor(public yumpuService: YumpuApiService, public localStorage: LocalStorageRepositoryService, public location: Location) {
    this.localStorage.loadLastSelection().then(result => {
      this.currentSelection = result
    }).catch(error => {
      this.location.back()
    })
  }

  ngOnInit() {
  }

}
