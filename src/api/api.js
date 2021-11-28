import axios from 'axios';

const apiKey = 'jgxOiHVRakum42fV22873f0QTGLHSXoV';

const instance = axios.create({
   baseURL: `https://limiapi.azurewebsites.net/api/`,
   headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
   },
});

export const getAllLessons = () => instance.get('lessons/getall');
