# Домашнее задание для ШРИ-2019 (Москва)

Сделать React приложение, которое будет показывать структуру файлов и директорий репозитория.

## Установка

    npm install
    cp .env.example .env

## Разработка

    npm start

Сервер будет доступен по адресу [http://localhost:7777/](http://localhost:7777/)
    
## Продакшен сборка

    npm run build
    
## Модульные тесты

    npm test

## Запуск e2e тестов

Перед запуском тестов нужно установить и запустить selenium:

    npm install selenium-standalone@latest -g
    selenium-standalone install 
    selenium-standalone start

Нужно инициализировать подмодули git с тестовыми репозиториями, 
они будут склонированы в директорию `./tests/e2e/repos`:

    git submodule init
    git submodule update  

Еще нужно запустить само приложение, которое будем тестировать.
Тесты полагаются, что сервер будет раздавать репозитории из папки `./tests/e2e/repos`:  

    REPOS_DIR=./tests/e2e/repos npm start

Запускаем тесты (hermione):

    npm run e2e
