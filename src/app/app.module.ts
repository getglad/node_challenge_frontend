import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { NvD3Component } from 'ng2-nvd3';
import { StoreModule } from '@ngrx/store';

import 'hammerjs/hammer.js';
// d3 and nvd3 should be included somewhere
import 'd3';
import 'nvd3';

import { FrameworkSharedModule } from './modules/framework-shared/framework-shared.module';

import { Neo4jService } from './neo4j.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    NvD3Component,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FrameworkSharedModule,
    HttpModule,
    JsonpModule,
  ],
  providers: [
    Neo4jService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
