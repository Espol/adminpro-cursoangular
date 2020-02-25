import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingService, SidebarService, SharedService} from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SettingService,
    SidebarService,
    SharedService
  ]
})
export class ServiceModule { }
