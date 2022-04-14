import avatar from '../assets/avatar-female.svg';
import achivement from '../assets/achivement.svg';

export const profileData = {
   achievements: [
      {
         achievement_displayed: 'Miesiąc',
         achievement_name: 'Miesiąc',
         description: 'Jesteś z nami już miesiąc',
         image: achivement,
      },
      {
         achievement_displayed: 'Dwadzieścia lekcji',
         achievement_name: 'Miesiąc',
         description: 'Ukończono 20 lekcji',
         image: achivement,
      },
      {
         achievement_displayed: 'Sto słówek',
         achievement_name: 'Miesiąc',
         description: 'Poznano 100 nowych słówek',
         image: achivement,
      },
      {
         achievement_displayed: 'Czterdzieci słowek jednego dnia',
         achievement_name: 'Miesiąc',
         description: 'Poznano 40 nowych słówek jednego dnia',
         image: achivement,
      },
      {
         achievement_displayed: 'Pięć lekcji jednego dnia',
         achievement_name: 'Miesiąc',
         description: 'Przerobiono 5 nowych lekcji jednego dnia',
         image: achivement,
      },
   ],
   daily_words: {
      '2021-12-15': '',
      '2021-12-16': '',
      '2021-12-17': '',
      '2021-12-18': '',
      '2021-12-19': '',
      '2021-12-20': '',
      '2021-12-21': '',
   },
   stats: {
      lessons_count: 20,
      repeats_count: 80,
      words_count: 200,
   },
   user: {
      activated: '',
      active_token: '',
      created: 'Fri, 03 Dec 2021 16:27:47 GMT',
      daily_goal: 30,
      gender: 'female',
      login: 'user',
      mail: 'user@gmail.com',
      name: 'Użytkownik',
      password: '12345678',
      photo: avatar,
      surname: 'Demo',
   },
};
