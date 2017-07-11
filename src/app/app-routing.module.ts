import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    /*
    children: [
      {
          path: 'form',
          component: MainComponent,
      },
    ]
    */
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routedComponents: any[] = [
    AppComponent, MainComponent
];
