# TODO

* manifest
* gzip
* Что делать с опциональными ключами из clojure.spec?
  Есть опциональный ключ,
  с сервера пришел null в этом поле,
  в форме в поле стоит дефолтное значение,
  пользователь отредактировал,
  стёр,
  все выглядит как и раньше,
  но теперь вместо null будет дефолтное значение(пустая строка),
  а оно может быть невалидно для этого поля.
  Видимо, нужно их особым образом обрабатывать.
* Работа с коллекциями.
  + случай 1.
    Редактируются элементы коллекции,
    элементы не добавляются и не удаляются.
  + случай 2.
    Отображаются элементы коллекции,
    рядом с ними выбор действия: удалить, архивировать и т.п.
    Ниже отдельный компонент для добавления новых элементов.
    В этом компоненте можно удалять ранее добавленные новые элементы.