import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatsKeyPatchInterceptorService } from 'src/core/interceptors/cats-key-header-patch-interceptor.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpRequestsInterceptor } from 'src/core/interceptors/http-requests-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [
    {
			provide: HTTP_INTERCEPTORS,
			useClass: CatsKeyPatchInterceptorService,
			multi: true,
		},
    {
			provide: HTTP_INTERCEPTORS,
			useClass: HttpRequestsInterceptor,
			multi: true,
		},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
