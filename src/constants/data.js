import { routes } from '../routes';

export const languageOptions = ['Polski', 'Angielski'];
export const languageOptionsFlashcards = ['Polski', 'Angielski', 'Oba'];

export const timesOptions = ['1 razie', '2 razach', '3 razach'];

export const loginStatus = {
   success: 'Udało się zalogować',
   wrongPassword: 'Błędne hasło',
   inactiveAccount: 'Konto nie zostało aktywowane',
   noUser: 'Użytkownik nie istnieje',
};

export const registerStatus = {
   success: 'Udało się zarejestrować',
   fail: 'Nie udało się zarejestrować',
};

export const navLinks = [
   { name: 'Strona główna', route: routes.home },
   { name: 'Lekcje', route: routes.lessons },
   { name: 'Powtórka', route: routes.repeat },
   { name: 'Profil', route: routes.profile },
];
