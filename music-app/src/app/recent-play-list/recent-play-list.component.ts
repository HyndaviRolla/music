import { Component } from '@angular/core';
import { Song } from '../song.model';
import { SongService } from '../song.service';
@Component({
  selector: 'app-recent-play-list',
  templateUrl: './recent-play-list.component.html',
  styleUrls: ['./recent-play-list.component.css']
})
export class RecentPlayListComponent {


recentplaylistId = 1;  
recentsongsInPlaylist!: Song[];


ngOnInit(): void {
  
  this.getSongsInRecentPlaylist();
 
}

constructor(private songService: SongService) {}

getSongsInRecentPlaylist() {
this.songService.getSongsInRecentPlaylist(this.recentplaylistId).subscribe(
  (songs) => {
    this.recentsongsInPlaylist = songs;
    console.log('Songs in playlist:', this.recentsongsInPlaylist);
  } 
);
}

}