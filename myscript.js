document.getElementById('myButton').onclick = function() {
  window.location.href = 'page2.html';  // Change to your target page
};
window.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bgMusic');
  const btn = document.getElementById('muteButton');

  music.volume = 0.35; // 35% volume

  // Retrieve saved mute state or default to true (muted)
  let isMuted = localStorage.getItem('musicMuted');
  if (isMuted === null) {
    isMuted = 'true'; // start muted by default
  }
  music.muted = (isMuted === 'true');

  btn.textContent = music.muted ? 'Unmute Music' : 'Mute Music';

  btn.onclick = () => {
    music.muted = !music.muted;
    localStorage.setItem('musicMuted', music.muted);
    btn.textContent = music.muted ? 'Unmute Music' : 'Mute Music';
  };

  // Try to unmute and play music on first user interaction anywhere on page (if muted)
  let userInteracted = false;

  const tryUnmute = () => {
    if (!userInteracted && music.muted) {
      music.muted = false;
      localStorage.setItem('musicMuted', 'false');
      btn.textContent = 'Mute Music';
      music.play();
      userInteracted = true;
      window.removeEventListener('click', tryUnmute);
      window.removeEventListener('keydown', tryUnmute);
    }
  };

  window.addEventListener('click', tryUnmute);
  window.addEventListener('keydown', tryUnmute);

  // Start playing music (muted or not depending on saved state)
  music.play().catch(() => {
    // Autoplay might fail silently — user interaction needed to play
  });
});