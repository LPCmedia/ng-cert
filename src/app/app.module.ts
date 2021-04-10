import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ZipCodeService } from './shared/zip-code.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  providers:    [ ZipCodeService],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
