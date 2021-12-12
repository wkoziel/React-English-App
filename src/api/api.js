import axios from 'axios';

const apiKey = process.env.REACT_APP_KEY;

const instance = axios.create({
   baseURL: process.env.REACT_APP_API,
   headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiKey,
   },
});

export const getLessonSiteData = (login) => instance.get(`userslessonssite/${login}`);

export const getUserLessons = (login) => instance.get(`userslessons/${login}`);

export const getAllLessons = () => instance.get('lessons/getall');

export const getLessonData = (lessonID) => instance.get(`lessons/${lessonID}`);

export const getLessonWords = (lessonID) => instance.get(`words/${lessonID}`);

export const signIn = (data) => instance.post('users/log', data);

export const signUp = (data) => instance.post('users/add', data);

export const activateAccount = (token) => instance.get(`users/confirm/${token}`);

export const remindPassword = (data) => instance.post('users/reset_password_mail', data);

export const sendNewPassword = (token, data) => instance.post(`/users/reset_password/${token}`, data);

export const testCompleted = (data) => instance.post('userslessons/add', data);

export const addLearnedWords = (data) => instance.post('userswords/add', data);

export const getUser = (login) => instance.get(`users/${login}`);
