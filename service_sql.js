const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Javac#14',
    database: 'anicom'
});

app.get('/tabs', (req, res) => {
    db.query('SELECT * FROM tabs', (err, result) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка выборки");
            return
        } else {
            res.send(result);
        }
    });
});

app.get('/products', function(req, res) {
    db.query(`SELECT id_list, CONVERT(img USING utf8) img, product, l.id_tab, tab_name, pcs ,price, (pcs*price) as total    
    FROM product_list l 
    LEFT JOIN tabs t on l.id_tab = t.id_tab`, (err, result) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка выборки");
            return
        }
        res.send(result);
    });
});


//POST's

app.post('/products', function(req, res) {
    db.query(`INSERT INTO product_list set ?`, req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при вставке");
            return
        }
        res.send({
            status: 'Запись успешно создана!',
        });
    });
});


//DELETE's

app.delete('/products', function(req, res) {
    db.query('DELETE FROM product_list  WHERE `id_list` = ?', req.body, (err) => {
        if (err) {
            console.error(err);
            res.send("возникла ошибка при удаление");
            return
        }
        res.send({
            status: 'Запись успешно удалена!',
        });
    });
});


app.listen(3210, () => {
    console.log('Server active in port 3210')
});