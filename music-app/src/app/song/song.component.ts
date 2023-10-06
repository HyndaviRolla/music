import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { Song } from '../song.model';
 

 
@Component({
  selector: 'app-song-list',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
})

export class SongComponent implements OnInit {
  
  
  playlistId = 1;  
  recentplaylistId = 1;
  songsInPlaylist!: Song[];

  songList: Song[] = [];
   
  newSong: Song = { id: 0, title: '', artist: [''], musicDirector:' ' ,genre: '' };
 
  constructor(private songService: SongService) {}

  ngOnInit(): void { 
     
     
    
      this.loadSongList();
  }

  loadSongList(): void {
      this.songService.getAllSong().subscribe((song) => {
          this.songList = song;
      });
  }
  

   
   
  addToPlaylist(songId: number): void {
    
    const playlistId = 1;  
    this.songService.addToPlaylist(songId, playlistId).subscribe(
      (addedSong) => {
        console.log('Song added to playlist:', addedSong);
      } 
    );
  }
 

      
  addToRecentPlaylist(songId: number): void {
    const recentplaylistId = 1;  
    this.songService.addToRecentPlaylist(songId, recentplaylistId).subscribe(
      (addedSong) => {
        console.log('Song added to playlist:', addedSong);
      } 
    );
  }
 
 


}
