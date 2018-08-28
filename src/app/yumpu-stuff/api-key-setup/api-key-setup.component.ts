import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LocalStorageRepositoryService } from '../../storage/local-storage-repository.service';

@Component({
  selector: 'app-api-key-setup',
  templateUrl: './api-key-setup.component.html',
  styleUrls: ['./api-key-setup.component.scss']
})
export class ApiKeySetupComponent implements OnInit {

  key: string = ""

  constructor(
    public dialogRef: MatDialogRef<ApiKeySetupComponent>,
    private localStorage: LocalStorageRepositoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  storeKey() {
    alert(this.key)
    if (this.key) {
      this.localStorage.setApiKey(this.key).then(() => {
        this.dialogRef.close()
      }).catch(error => {
        alert("Error")
      })
    }
  }
}
