const URL = 'https://pixabay.com/api/';
const KEY = '31784289-8c5c8bddae77d61fff616be96';
const FILTER = '&image_type=photo&orientation=horizontal&per_page=12';

export function fetchImages(query, page = 1) {
  return fetch(`${URL}?q=${query}&page=${page}&key=${KEY}${FILTER}`).then(
    response => response.json()
  );
}
