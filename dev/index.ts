import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');
  wb.addEventListener('waiting', (event) => {
    wb.addEventListener('controlling', () => {
      window.location.reload();
    });
    wb.messageSkipWaiting();
  });
  wb.register();
}

const input = <HTMLInputElement>document.getElementById('ipfs-url');
const button = <HTMLInputElement>document.getElementById('ipfs-get');
const show = <HTMLInputElement>document.getElementById('ipfs-show');

if (button && input) {
  button.addEventListener('click', (event) => {
    const value = input.value;
    if (value) {
      show.innerHTML = '';
      fetch(value).then((res) => {
        if (res.status >= 400) {
          show.appendChild(document.createTextNode('Request failed with error code: ' + res.status));
        } else {
          res.blob().then((file) => {
            show.appendChild(document.createTextNode('Request succeed with type: ' + file.type));
            if (/^image\//.test(file.type)) {
              const img = document.createElement('img');
              img.src = URL.createObjectURL(file);
              show.appendChild(document.createElement('br'));
              show.appendChild(img);
            }
          });
        }
      });
    }
  });
}
