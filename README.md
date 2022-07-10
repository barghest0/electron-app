# electron-application

## Библиотеки

- Node - 16.15.1
- Npm - 8.11.0
- Typescript - 4.6.2
- Webpack - 5.70.0
- React - 18.0.0
- Electron - 19.0.8
- Formik - 2.2.9
- Yup - 0.32.1
- Styled Components - 5.3.6

## Команды

Команды могут осуществляться с помощью `npm` или `yarn` пакетных менеджеров:

Установка зависимостей - `npm i | yarn`

#### Development

Отдельно react - `(npm run | yarn) dev:react`

Отдельно electron - `(npm run | yarn) dev:electron`

Все приложение - `(npm run | yarn) dev:app`

> Сервер запускается по адресу `http://localhost:8080`

#### Production

Отдельно react - `(npm run | yarn) build:react`

Отдельно electron - `(npm run | yarn) build:electron`

Все приложение - `(npm run | yarn) build:app`

> Сборка сохраняется в директории `dist`

#### Installation

Формирование установщика - `(npm run | yarn) build:package`

> Установщих сохраняется в директории `application`
