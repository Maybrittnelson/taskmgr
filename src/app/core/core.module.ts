import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HttpModule} from '@angular/http';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { ServicesModule } from '../services/services.module' ;
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { loadSvgResources } from '../utils/svg.util';
import 'rxjs/add/operator/take';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    AppRoutingModule,
    ServicesModule.forRoot(),
    BrowserAnimationsModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule],
  providers: [
    {provide: 'BASE_CONFIG', useValue: 'http://localhost:3000'}
  ]
})
export class CoreModule {
  constructor (
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MdIconRegistry,
    ds: DomSanitizer
  ) {
      if (parent) {
        throw new Error('如果模块已经加载.不能再加载');
      }
      loadSvgResources(ir, ds);
  }
}
