import { Component, NgZone } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { LocalStorageRepositoryService } from './storage/local-storage-repository.service';
import { MagazineExportComponent } from './magazine-selection/magazine-export/magazine-export.component';
import { MagazineSearchResult, MagazineSearch } from './yumpu-stuff/models';
import { YumpuApiService } from './yumpu-stuff/providers/yumpu-api.service';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  searches: MagazineSearch[] = []
  currentUrl: string = "nothing"

  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    public router: Router,
    public location: Location,
    public activatedRoute: ActivatedRoute,
    public storage: LocalStorageRepositoryService,
    public yumpuService: YumpuApiService,
    private zone: NgZone
  ) {

    translate.setDefaultLang('en');

    if (electronService.isElectron()) {
    } else {
    }

    this.refreshSearches()

    router.events.subscribe(event => {
      this.zone.run(() => {
        if (event instanceof NavigationEnd && event.url === "/") this.refreshSearches()
        if (event instanceof NavigationEnd || event instanceof NavigationStart) {
          this.currentUrl = event.url
        }
      })
    })
  }

  refreshSearches() {
    this.storage.loadAllSearches().then(result => {
      this.searches = result
    }).catch(err => {

    })
  }

  openSearch(search: MagazineSearch) {
    this.storage.activateSearch(search).then(() => {
      this.router.navigate(["/export/archived"])
    })
  }
}
