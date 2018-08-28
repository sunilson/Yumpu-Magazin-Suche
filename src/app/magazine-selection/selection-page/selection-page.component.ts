import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { YumpuApiService } from '../../yumpu-stuff/providers/yumpu-api.service';
import { Router } from '@angular/router';
import { trigger, style, animate, transition, state, keyframes } from '@angular/animations';
import { FormatDatePipe } from '../../util/format-date.pipe';
import { LocalStorageRepositoryService } from '../../storage/local-storage-repository.service';
import { MagazineSearchResult } from '../../yumpu-stuff/models';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('800ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateY(0)', opacity: 1 }),
          animate('200ms', style({ transform: 'translateY(20px)', opacity: 0 }))
        ])
      ]
    ),
    trigger(
      'slideAnimation', [
        transition(':enter', [
          style({ transform: 'translateY(50px)', opacity: 0 }),
          animate('800ms', style({ transform: 'translateY(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateY(0)', opacity: 1 }),
          animate('200ms', style({ transform: 'translateY(50px)', opacity: 0 }))
        ])
      ]
    )
  ]
})
export class SelectionPageComponent implements OnInit, OnDestroy {

  selectedMagazines: {} = {}
  loading: boolean = false
  doneClicked: boolean = false

  constructor(public yumpuService: YumpuApiService, public router: Router, private zones: NgZone, public storage: LocalStorageRepositoryService) {
    this.storage.loadLastSelection().then(result => {
      if (this.checkEmpty(result)) {
        this.selectedMagazines = {}
        result.forEach(element => {
          this.selectedMagazines[element.id] = element
        });
      }
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (!this.doneClicked) this.storage.storeSelection([])
  }

  restartSearch() {
    this.router.navigate([""])
  }

  selectMagazine(element: MagazineSearchResult) {
    this.zones.run(() => {
      (this.selectedMagazines[element.id]) ? delete this.selectedMagazines[element.id] : this.selectedMagazines[element.id] = element
    })
  }

  done() {
    this.doneClicked = true
    this.storage.storeSelection(Object.values(this.selectedMagazines))
    this.router.navigate(['export'])
  }

  checkEmpty(object: {}): boolean {
    return Object.keys(object).length > 0
  }

  continueSearch() {
    this.loading = true
    this.yumpuService.continueSearch().subscribe(result => {
      this.loading = false
    }, error => {
      this.loading = false
    })
  }
}
