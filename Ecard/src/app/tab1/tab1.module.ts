import { IonicModule } from '@ionic/angular';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { QRCodeModule } from 'angularx-qrcode';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserModule } from '@angular/platform-browser';


import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  // schemas: [NO_ERRORS_SCHEMA],

  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    QRCodeModule
    // BrowserAnimationsModule,
    // BrowserModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
