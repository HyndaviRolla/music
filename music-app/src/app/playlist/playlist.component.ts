 
import { Component, OnInit } from '@angular/core';  
import { SongService } from '../song.service';
import { Song } from '../song.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit  {
  
  playlistId = 1;  
  songsInPlaylist!: Song[];
 

  ngOnInit(): void {
    
    this.getSongsInPlaylist();
   
  }

  constructor(private songService: SongService) {}
 
getSongsInPlaylist() {
  this.songService.getSongsInPlaylist(this.playlistId).subscribe(
    (songs) => {
      this.songsInPlaylist = songs;
      console.log('Songs in playlist:', this.songsInPlaylist);
    } 
  );
}

}

