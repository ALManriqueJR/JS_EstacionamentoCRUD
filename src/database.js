import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


export const abrirGavetaDB = async (request, response) => {
    return await open({
        filename: './src/database.db',
        driver: sqlite3.Database
    });
}
