import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocalStorageRepositoryService } from '../../storage/local-storage-repository.service';
import { SearchOptionsOrdering, SearchOptions } from '../../yumpu-stuff/models';
import * as moment from 'moment';

interface FilterOptions {
  name: string,
  value: SearchOptionsOrdering
}

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  currentSearchOptions: SearchOptions

  filterOptions: FilterOptions[] = [
    {
      name: "Views absteigend",
      value: SearchOptionsOrdering.VIEWS_DESC
    },
    {
      name: "Views aufsteigend",
      value: SearchOptionsOrdering.VIEWS_ASC
    },
    {
      name: "Erstelldatum absteigend",
      value: SearchOptionsOrdering.CREATE_DATE_DESC
    },
    {
      name: "Views aufsteigend",
      value: SearchOptionsOrdering.CREATE_DATE_ASC
    },
    {
      name: "Seitenanzahl absteigend",
      value: SearchOptionsOrdering.PAGES_DESC
    },
    {
      name: "Seitenanzahl aufsteigend",
      value: SearchOptionsOrdering.PAGES_ASC
    },
  ]

  constructor(
    public dialogRef: MatDialogRef<AdvancedSearchComponent>,
    private localStorage: LocalStorageRepositoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.currentSearchOptions = (data.searchOptions) ? data.searchOptions : new SearchOptions()
  }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.currentSearchOptions)
  }

}
