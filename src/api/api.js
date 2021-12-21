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

export const getUserPhoto = (login) => instance.get(`users/get_photo/${login}`);

export const userChangePhoto = (data) => instance.post('users/update_photo', data);

export const getUsersWeek = (login) => instance.get(`userswords/week/${login}`);

export const changeUserPassword = (data) => instance.post('users/update_password', data);

export const updateUserProfile = (data) => instance.post('users/update_user', data);

export const fetchUserProfile = (login) => instance.get(`users/site/${login}`);

export const updateDailyGoal = (data) => instance.post('users/update_daily_goal', data);

export const deleteAccount = (login) => instance.delete(`/users/delete/${login}`);

export const resetAccount = (data) => instance.post(`/users/reset`, data);

export const getSASToken = () => instance.get('/users/create_sas_token');

export const getRepeatWords = (params) => instance.get('userswords/repeat', { params });

export const getRepeatWordsCount = (login) => instance.get(`userswords/repeat/${login}`);

export const deleteUserPhoto = (data) => instance.post(`/users/delete_photo`, data);
