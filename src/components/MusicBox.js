import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const AlbumCover = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    animation: ${rotate} 20s linear infinite;
    animation-play-state: ${({ isPlaying }) => (isPlaying ? 'running' : 'paused')};
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
    transform: none;
  }
`;

const TrackInfo = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  
  h3 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
  }
  
  p {
    color: ${({ theme }) => theme.colors.lightText};
    margin: ${({ theme }) => theme.spacing.xs} 0;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  margin-top: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  position: relative;
`;

const Progress = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: 2px;
  width: ${({ progress }) => progress}%;
  transition: width 0.1s linear;
`;

const MusicBox = ({ track = { title: "Sample Track", artist: "Na Fir", cover: "/images/album-cover.jpg" } }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current.duration);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  const updateProgress = () => {
    if (audioRef.current) {
      const value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(value);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = (x / width) * 100;
      const time = (percentage / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(percentage);
    }
  };

  return (
    <Container>
      <AlbumCover isPlaying={isPlaying}>
        <motion.img 
          src={track.cover} 
          alt={track.title}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </AlbumCover>
      
      <TrackInfo>
        <h3>{track.title}</h3>
        <p>{track.artist}</p>
      </TrackInfo>

      <Controls>
        <Button onClick={handlePlayPause}>
          {isPlaying ? '⏸' : '▶'}
        </Button>
      </Controls>

      <ProgressBar ref={progressRef} onClick={handleProgressClick}>
        <Progress progress={progress} />
      </ProgressBar>

      <audio ref={audioRef} src={track.audioUrl} />
    </Container>
  );
};

export default MusicBox;
