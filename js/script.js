/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов

6) удаление фильмов 
*/

'use strict';

const promoAdv = document.querySelectorAll('.promo__adv');
const imgAdvertising = document.querySelectorAll('.promo__adv img');
const promoBgImg = document.querySelector('.promo__bg');
const promoGenre = promoBgImg.querySelector('.promo__genre');
const filmList = document.querySelector('.promo__interactive-list');
const listItem = filmList.querySelectorAll('.promo__interactive-item')
let input = document.querySelector('.adding__input');
const form = document.querySelector('.add');
const formBtn = form.querySelector('button');
const checkbox = document.querySelector('[type="checkbox"]');

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const deleteAdvertising = (arr) => {
    arr.forEach(item => {
        item.remove(arr)
    });
}
deleteAdvertising(imgAdvertising);

const makeChanges = () => {
    promoGenre.textContent = 'ДРАМА';
    promoBgImg.style.backgroundImage = 'url("img/bg.jpg")';
}
makeChanges();

const sortArray = (array) => {
    array.sort();
}

function createMovieList(films, parent) {
    parent.innerHTML = '';
    sortArray(films);
    films.forEach((item, i) => {
        parent.innerHTML += `<li class="promo__interactive-item">${i + 1} ${item}
    <div class="delete"></div>
</li>`

    });
    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            movieDB.movies.splice(i, 1);
            createMovieList(movieDB.movies, filmList);
        });
    })
}

createMovieList(movieDB.movies, filmList);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newFilm = input.value;
    const faivorite = checkbox.checked;
    if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0,22)}...`
    }
    if (faivorite) {
        console.log('Добавляем любимый фильм')
    }
    if (newFilm) {
        movieDB.movies.push(newFilm)
        sortArray(movieDB.movies);
        createMovieList(movieDB.movies, filmList);

    }

    e.target.reset();
});

const deleteTask = () => {
    filmList.removeChild(listItem);
}