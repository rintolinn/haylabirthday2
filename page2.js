window.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('surpriseVideo');
  const container = document.getElementById('container');
  const messageContainer = document.getElementById('messageContainer');
  const message1 = document.getElementById('message1');
  const message2 = document.getElementById('message2');
  const bgMusic = document.getElementById('bgMusic2');  // add this for your audio element

  video.volume = 0.7;

  video.addEventListener('ended', () => {
    // Slide the video container away
    container.classList.add('slide-away');

    // After slide animation (1s), hide video and show first message
    setTimeout(() => {
      video.style.display = 'none';
      container.classList.remove('slide-away');

      // Start playing the background music
      bgMusic.volume = 0.35;
      bgMusic.play().catch(() => {
        console.log("Audio playback requires user interaction.");
      });

      messageContainer.classList.remove('hidden');
      message1.classList.add('show');

      // After 4 seconds, fade out first message and fade in second
      setTimeout(() => {
        message1.classList.remove('show');
        message1.classList.add('hidden');

        message2.classList.remove('hidden');
        message2.classList.add('show');
      }, 4000);

    }, 1000);
  });
});
