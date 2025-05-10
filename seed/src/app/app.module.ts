// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

// project import
import { ErrorInterceptor } from 'src/app/@theme/helpers/error.interceptor';
import { BasicAuthInterceptor } from 'src/app/@theme/helpers/basic-auth.interceptor';

// project import
import { SharedModule } from './demo/shared/shared.module';
import { GuestModule } from './demo/layout/front';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [AppComponent,FooterComponent],
  bootstrap: [AppComponent],

  imports: [AppRoutingModule, SharedModule, BrowserAnimationsModule, BrowserModule, GuestModule, CarouselModule,FormsModule,HomepageComponent,CommonModule,RouterModule],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    [provideHttpClient(withInterceptorsFromDi())]
  ]
})
export class AppModule {}
