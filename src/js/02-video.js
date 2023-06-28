import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

    player.on('play', function() {
        console.log('played the video!');
    });

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

const localStorageKey = 'videoplayer-current-time';

player.on('timeupdate', throttle(function(data) {
    const currentTime = data.seconds;
    localStorage.setItem(localStorageKey, currentTime);
}, 1000));

const savedTime = localStorage.getItem(localStorageKey);

// console.log(savedTime);

if (savedTime) {
    
  player.setCurrentTime(Number(savedTime))
    .then(function(seconds) {
      console.log('Current time:', seconds);
    })
    .catch(function(error) {
      switch (error.name) {
        case 'Error':
          console.error('Time out of range');
          break;

        default:
          console.error('Failed to set time played:', error);
          break;
      }
    });
}