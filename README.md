## Как запустить
- npm start

## Что почитать

- https://angular.io/guide/user-input
- https://angular.io/guide/lifecycle-hooks
- https://angular.io/guide/pipes
- https://angular.io/guide/inputs-outputs
- https://angular.io/guide/template-reference-variables
- https://www.telerik.com/blogs/simplifying-angular-change-detection


## Установить 
- https://material.angular.io/
- https://angular.io/guide/ngmodules + https://angular.io/guide/feature-modules
- https://angular.io/guide/rx-library - Must read

# Разработка приложения

## Фукнции

1. Выбор года (done)
2. Выбор месяца (done)
3. Выбор числа (done)
4. Выбор временного промежутка
5. Создание event с диалогом (partially)
6. Два вида отображения (месяц/день)

### Задачи FE

1. При выборе год/месяца/числа - идет перерисовка страниц(если мы сменили дату) (done)
2. Вид просмотра месяц/день (если клавиши вперед/назад)
3. Собитие отображается путем закрашивания области на ячейке дня (событие с 5-12) должно быть закрашено с 5/24 до 12/24 процента(событие только с 0 до 24)
4. Создание событый с валидацией (нельзя создать пустое/нельзя время создания больше времени начала) (partially)


### Задачи BE

1. Сервис отдает массив событий
2. Создается новое событие
3. Удаляется событие


### Усложенные задачи

1. Можно создавать событие на несколько дней
2. API имеет фильтры и отдает событие по фильтрам
3. Недельний вид календаря
4. Draft режим (мы не нажали сохранить событие) (done)
