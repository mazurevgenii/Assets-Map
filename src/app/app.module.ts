import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {AssetsComponent} from './assets/assets.component';
import {AddNewModalComponent} from './add-new-modal/add-new-modal.component';
import {DeleteModalComponent} from './delete-modal/delete-modal.component';
import {SearchPipe} from './shared/search.pipe';
import {AssetServices} from './shared/asset.services';
import {MapComponent} from './map/map.component';
import {SortPipe} from './shared/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AssetsComponent,
    AddNewModalComponent,
    DeleteModalComponent,
    MapComponent,
    SearchPipe,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  exports: [],
  providers: [AssetServices],
  entryComponents: [
    AddNewModalComponent,
    DeleteModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
