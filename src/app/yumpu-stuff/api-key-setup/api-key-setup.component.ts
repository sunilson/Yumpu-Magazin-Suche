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
  canCancel: boolean = false

  constructor(
    public dialogRef: MatDialogRef<ApiKeySetupComponent>,
    private localStorage: LocalStorageRepositoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.localStorage.getApiKey().then(key => {
      if (key.length > 0) this.canCancel = true
      this.key = key
    })
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close()
  }

  storeKey() {
    if (this.key) {
      this.localStorage.setApiKey(this.key).then(() => {
        this.dialogRef.close(this.key)
      }).catch(error => {
        alert("Error")
      })
    }
  }
}
