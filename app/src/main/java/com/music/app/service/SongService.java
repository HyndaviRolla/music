package com.music.app.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.music.app.entity.PlayList;
import com.music.app.entity.RecentPlayList;
import com.music.app.entity.Song;
import com.music.app.repository.PlayListRepository;
import com.music.app.repository.RecentPlayListRepository;
import com.music.app.repository.SongRepository;

@Service
public class SongService {
	@Autowired
	private  SongRepository songRepository;

	@Autowired
	private RecentPlayListRepository recentplaylistRepository;



	@Autowired
	private PlayListRepository playlistRepository;


	public List<Song> getAllSong() {
		return songRepository.findAll();
	}

	public Song addSong(Song song) {

		return songRepository.save(song);
	}

	public void deleteSong(Long id) {
		songRepository.deleteById(id);
	}

	public List<Song> searchByTitle(String title) { 
		return songRepository.findByTitleContainingIgnoreCase(title);
	}

	public List<Song> searchByArtist(String artist) {

		return songRepository.findByArtistContainingIgnoreCase(artist);
	}

	public List<Song> searchByMusicDirector(String musicdirector) {

		return songRepository.findByMusicDirectorContainingIgnoreCase(musicdirector);
	}

	public List<Song> sortMusic(String sortBy) {
		if (sortBy.equals("title")) {
			return songRepository.findAllByOrderByTitle();
		} else if (sortBy.equals("artist")) {
			return songRepository.findAllByOrderByArtist();
		}
		return getAllSong();
	}

	public Song addToPlaylist(Long songId, Long playlistId) {
		Song song = songRepository.findById(songId)
				.orElseThrow(() -> new RuntimeException("Song not found"));

		PlayList playlist = playlistRepository.findById(playlistId)
				.orElseThrow(() -> new RuntimeException("Playlist not found"));

		List<Song> songsInPlaylist = playlist.getSongs(); 
		if (!songsInPlaylist.contains(song)) {
			songsInPlaylist.add(song);
			playlist.setSongs(songsInPlaylist);
			playlistRepository.save(playlist);
			return song;
		} else {

			throw new RuntimeException("Song is already in the playlist");
		}
	}


	public List<Song> getSongsInPlaylist(Long playlistId) {
		PlayList playlist = playlistRepository.findById(playlistId)
				.orElseThrow(() -> new RuntimeException("Playlist not found"));

		return playlist.getSongs();
	} 

	public Song addToRecentSongs(Long songId, Long recentplayListId) {
		Song song = songRepository.findById(songId)
				.orElseThrow(() -> new RuntimeException("Song not found"));

		RecentPlayList recentplaylist = recentplaylistRepository.findById(recentplayListId)
				.orElseThrow(() -> new RuntimeException("Playlist not found")); 
		List<Song> songsInRecentPlaylist = recentplaylist.getSongs();
		if (!songsInRecentPlaylist.contains(song)) {
			songsInRecentPlaylist.add(song);
			recentplaylist.setSongs(songsInRecentPlaylist); 
			recentplaylistRepository.save(recentplaylist); 
			return song;
		}
		else{

			throw new RuntimeException("Song is already in the playlist");
		}
	}


	public List<Song> getSongsInRecentPlayedSongs(Long playlistId) {
		RecentPlayList recentplaylist = recentplaylistRepository.findById(playlistId)
				.orElseThrow(() -> new RuntimeException("Playlist not found"));

		return recentplaylist.getSongs();
	} 

}
