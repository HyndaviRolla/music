import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongComponent } from './song/song.component';
import { FormsModule } from '@angular/forms'; 
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthInterceptor } from './auth.interceptor';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component'; 
import { PlaylistComponent } from './playlist/playlist.component';
import { RecentPlayListComponent } from './recent-play-list/recent-play-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
  
    AppComponent,
    SongComponent,
    LoginComponent,
    NavbarComponent,
    SearchComponent,
    AdminComponent,
    PlaylistComponent,
    RecentPlayListComponent
     
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
 

      {
  
        provide: HTTP_INTERCEPTORS,
  
        useClass: AuthInterceptor,  
  
        multi: true,
  
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
