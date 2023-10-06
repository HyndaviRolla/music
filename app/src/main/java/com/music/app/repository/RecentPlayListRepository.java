package com.music.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.music.app.entity.RecentPlayList;
 
public interface RecentPlayListRepository extends JpaRepository<RecentPlayList, Long> {

}