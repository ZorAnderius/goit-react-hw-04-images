import axios from 'axios';

// const BASIC_URL = 'https://pixabay.com/api/';
const API_KEY = '36805938-0e5858f236185e483726e7849';

// export const fetchAPI = async imageName => {
//   const response = await fetch(`${BASIC_URL}?key=${API_KEY}&q=${imageName}`);
//   if (!response.ok) {
//     throw new Error('Could not fetch img');
//   }
//   return await response.json();
// };

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const axiosAPI = async (imageName, page, per_page) => {
  return await axios({
    params: {
      key: API_KEY,
      page: page,
      per_page: per_page,
      q: imageName,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
};
