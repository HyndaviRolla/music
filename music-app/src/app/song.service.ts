import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Song } from './song.model';

 
@Injectable({
  providedIn: 'root',
})
export class SongService {
  private baseUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}
 
  getAllSong(): Observable<Song[]> {
      return this.http.get<Song[]>(`${this.baseUrl}/song`);
  }

  addSong(song: Song): Observable<Song> {
      return this.http.post<Song>(`${this.baseUrl}/addSong`, song);
  }

  deleteSong(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
 
  searchMusic(searchTerm: string, searchType: string): Observable<Song[]> {
    const url = `${this.baseUrl}/search?searchTerm=${searchTerm}&searchType=${searchType}`;
    return this.http.get<Song[]>(url);
   }
   

  sortMusic(sortBy: string): Observable<Song[]> {
    const url = `${this.baseUrl}/sort?sortBy=${sortBy}`;
    return this.http.get<Song[]>(url);
  }
  // addToPlaylist(songId: number, playlistId: number): Observable<Song> {
  //   const url = `${this.baseUrl}/addToPlaylist/${songId}/${playlistId}`;
  //   return this.http.post<Song>(url, {}).pipe(
  //     catchError((error) => {
  //       console.error('Error adding to playlist', error);
  //       throw error;
  //     })
  //   );
  // }
  addToPlaylist(songId: number, playlistId: number): Observable<Song> {
    const url = `${this.baseUrl}/addToPlaylist/${songId}/${playlistId}`;
    
    return this.http.post<Song>(url,{}) ;
  }
  

  getSongsInPlaylist(playlistId: number): Observable<Song[]> {
    
    return this.http.get<Song[]>(`${this.baseUrl}/playlist/${playlistId}`);
  } 
  addToRecentPlaylist(songId: number, recentplaylistId: number): Observable<Song> {
    const url = `${this.baseUrl}/addToRecentPlaylist/${songId}/${recentplaylistId}`;
    return this.http.post<Song>(url, {}).pipe(
      catchError((error) => {
        console.error('Error adding to playlist', error);
        throw error;
      })
    );
  }

  getSongsInRecentPlaylist(recentplaylistId: number): Observable<any> {
    return this.http.get<Song[]>(`${this.baseUrl}/recentplaylist/${recentplaylistId}`);
  } 
  
}
