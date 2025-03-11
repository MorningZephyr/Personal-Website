"use client"; // Needed for interactive components

import { useState } from "react";

export default function Piano() {
  const [currentSong, setCurrentSong] = useState("/canon_in_c.m4a");

  return (
    <div>
      <h1>Piano Music</h1>
      <p>Listen to my piano recordings here.</p>

      {/* Audio Player */}
      <audio key={currentSong} controls autoPlay>
        <source src={currentSong} type="audio/mp4" />
        Your browser does not support the audio element.
      </audio>

      {/* Song Selection */}
      <div>
        <button onClick={() => setCurrentSong("/canon_in_c.m4a")}>Canon in C</button>
        <button onClick={() => setCurrentSong("/song2.m4a")}>Play Song 2</button>
      </div>
    </div>
  );
}
