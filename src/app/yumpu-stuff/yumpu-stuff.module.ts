import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiKeySetupComponent } from './api-key-setup/api-key-setup.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { Language } from './models';
import { YUMPU_LANGUAGES } from './tokens';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { GoogleSearchService } from '../google-search/google-search.service';
import { GoogleSearchModule } from '../google-search/google-search.module';
import { YumpuApiService } from './providers/yumpu-api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    GoogleSearchModule
  ],
  declarations: [ApiKeySetupComponent],
  entryComponents: [ApiKeySetupComponent],
  providers: [
    YumpuApiService,
    {
      provide: YUMPU_LANGUAGES, useValue: [
        new Language("de", "Deutsch"),
        new Language("en", "Englisch"),
        new Language("pt", "Portugiesisch"),
        new Language("fr", "Französisch"),
        new Language("it", "Italienisch"),
        new Language("es", "Spanisch")
      ]
    }]
})

export class YumpuStuffModule {
  static withLanguages(languages: Language[]): ModuleWithProviders {
    return {
      ngModule: YumpuStuffModule,
      providers: [
        {
          provide: YUMPU_LANGUAGES, useValue: languages
        }
      ]
    }
  }
}
