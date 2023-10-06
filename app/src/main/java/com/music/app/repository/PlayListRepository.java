package com.music.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.music.app.entity.PlayList;

 
public interface PlayListRepository extends JpaRepository<PlayList, Long> {

}