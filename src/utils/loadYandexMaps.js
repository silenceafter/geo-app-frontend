// src/utils/loadYandexMaps.js

let loadingPromise = null;

export function loadYandexMaps() {
  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = new Promise((resolve, reject) => {
    if (window.ymaps) {
      return resolve(window.ymaps);
    }

    const apiKey = process.env.REACT_APP_API_YANDEX_KEY;
    if (!apiKey) {
      return reject(new Error('API key is missing'));
    }

    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;

    script.onload = () => {

      console.log('✅ Скрипт загрузился');

  // Проверяем через 1, 2, 3 секунды
  setTimeout(() => {
    console.log('Через 1 сек: window.ymaps =', window.ymaps);
  }, 1000);

  setTimeout(() => {
    console.log('Через 2 сек: window.ymaps =', window.ymaps);
  }, 2000);

  setTimeout(() => {
    console.log('Через 3 сек: window.ymaps =', window.ymaps);
  }, 3000);

      const check = setInterval(() => {
        if (window.ymaps) {
          clearInterval(check);
          resolve(window.ymaps);
        }
      }, 100);

      setTimeout(() => {
        clearInterval(check);
        reject(new Error('Yandex Maps failed to initialize'));
      }, 5000);
    };

    script.onerror = () => reject(new Error('Script load error'));

    document.head.appendChild(script);
  });

  return loadingPromise;
}