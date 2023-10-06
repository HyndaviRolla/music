import { Component } from '@angular/core';
import { SongService } from '../song.service';
import { Song } from '../song.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
   
  searchTerm = '';
  searchType = 'title'; 
  Results: Song[] = [];
  songList: Song[] = []; 
  sortBy: string = '';

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.loadSongList();
}

  loadSongList(): void {
    this.songService.getAllSong().subscribe((song) => {
        this.songList = song;
    });
}
 

 
search(): void {
  if (this.searchTerm.trim() !== '') {
    this.songService.searchMusic(this.searchTerm, this.searchType)
      .subscribe(results => this.Results = results);
  }
}

sortMusic() {
  if (this.sortBy.trim() !== '') {
    this.songService.sortMusic(this.sortBy).subscribe(
      (data: Song[]) => {
        this.songList = data;
      } 
    );
  } else {
    this.loadSongList();
  }
}
 

}