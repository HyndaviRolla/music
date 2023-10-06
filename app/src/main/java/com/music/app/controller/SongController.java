package com.music.app.controller; 
import java.util.List; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.music.app.entity.PlayList;
import com.music.app.entity.Song;
import com.music.app.entity.User;
import com.music.app.repository.PlayListRepository;
import com.music.app.repository.UserRepository;
import com.music.app.service.SongService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class SongController {
	private final SongService songService;

	@Autowired
	public SongController(SongService songService) {
		this.songService = songService;
	}
	@Autowired
	private PlayListRepository playListRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserRepository userRepository;
	@GetMapping("/song")
	public List<Song> getAllSong() {
		return songService.getAllSong();
	}

	@PostMapping("/addSong")
	public ResponseEntity<Song> addSong(@RequestBody Song song) {
		Song addedSong = songService.addSong(song);
		return new ResponseEntity<>(addedSong, HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteSong(@PathVariable Long id) {
		songService.deleteSong(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@GetMapping("/search")
	public List<Song> searchMusic(@RequestParam String searchTerm, @RequestParam String searchType) {
		switch (searchType.toLowerCase()) {
		case "title":
			return songService.searchByTitle(searchTerm);
		case "artist":
			return songService.searchByArtist(searchTerm);
		case "musicdirector":
			return songService.searchByMusicDirector(searchTerm);
		default: 
			throw new IllegalArgumentException("Invalid search type");
		}
	}


	@GetMapping("/sort")
	public List<Song> sortMusic(@RequestParam String sortBy) {
		return songService.sortMusic(sortBy);
	}
	@PostMapping("/addToRecentPlaylist/{songId}/{recentplaylistId}")
	public ResponseEntity<?> addToRecentSongs(@PathVariable Long songId, @PathVariable Long recentplaylistId) {
		Song song = songService.addToRecentSongs(songId, recentplaylistId);
		return new ResponseEntity<>(song, HttpStatus.OK);
	}

	@GetMapping("/recentplaylist/{recentplaylistId}")
	public ResponseEntity<List<Song>> getSongsInRecentPlayedSongs(@PathVariable Long recentplaylistId) {
		List<Song> songsInPlaylist = songService.getSongsInRecentPlayedSongs(recentplaylistId);
		return new ResponseEntity<>(songsInPlaylist, HttpStatus.OK);
	}

	@PostMapping("/addToPlaylist/{songId}/{playlistId}")
	public ResponseEntity<?> addToPlaylist(@PathVariable Long songId, @PathVariable Long playlistId) {
		Song song = songService.addToPlaylist(songId, playlistId);
		return new ResponseEntity<>(song, HttpStatus.OK);
	}

	@GetMapping("/playlist/{playlistId}")
	public ResponseEntity<List<Song>> getSongsInPlaylist(@PathVariable Long playlistId) {
		List<Song> songsInPlaylist = songService.getSongsInPlaylist(playlistId);
		return new ResponseEntity<>(songsInPlaylist, HttpStatus.OK);
	}
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody User user) {

		try {

			if (userRepository.existsByName(user.getName())) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
			}
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userRepository.save(user);
			return ResponseEntity.ok("User registered successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
		}

	}

	private boolean userMatchesPassword(User user, String password) {
		return user.getPassword().equals(password);
	}

}
