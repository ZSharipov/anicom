1. Создаем таблицу (*MySQL*) <br>
```sql
CREATE TABLE `product_list` (
  `id_list` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `img` blob,
  `product` varchar(45) NOT NULL,
  `id_tab` int(10) unsigned NOT NULL,
  `pcs` int(10) unsigned NOT NULL,
  `price` float unsigned NOT NULL,
  PRIMARY KEY (`id_list`)
)

CREATE TABLE `tabs` (
  `id_tab` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tab_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tab`),
  UNIQUE KEY `id_tabs_UNIQUE` (`id_tab`),
  UNIQUE KEY `tab_name_UNIQUE` (`tab_name`)
)

INSERT INTO `tabs` VALUES (3,'Зеленый'),(1,'Красный'),(2,'Синий');
```

2. Редактируем файл "service_sql.js" <br>
```js
        const db = mysql.createPool({
            `host: 'localhost'`,//сервер
            `user: 'root'`,     //пользователь
            `password: 'pwd'`,  //Ваш пароль
            `database: 'test'`  //Название базы
        });
```
3. Запускаем установку зависимостей **$ npm install**<br>
4. Запускаем сервер **$ node service_sql.js**<br>
5. Запускаем **$ npm start**<br>
![](../master/screenshot/1.png "Product List")
![](../master/screenshot/2.png "Product List")
![](../master/screenshot/3.png "Product List")
