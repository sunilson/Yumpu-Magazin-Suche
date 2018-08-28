import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageRepositoryService } from './local-storage-repository.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [LocalStorageRepositoryService]
})
export class StorageModule {
  /*
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StorageModule,
      providers: [LocalStorageRepositoryService]
    }
  }
  */
}