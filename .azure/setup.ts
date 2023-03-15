import { connect } from "mssql";
import { readFile } from "fs/promises";
import { join } from "path";

async function getQuestions() {
  const questions = await readFile(
    join(__dirname, "./questions.json"),
    "utf-8"
  );
  return JSON.parse(questions);
}

async function setupSql() {
  const config = {
    user: process.env.SQL_USER || "sa", // better stored in an app setting such as process.env.DB_USER
    password: process.env.SQL_PASSWORD || "", // better stored in an app setting such as process.env.DB_PASSWORD
    server: process.env.SQL_HOST || "sql", // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: "master", // better stored in an app setting such as process.env.DB_NAME
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };

  const poolConnection = await connect(config);

  const dbCount = await poolConnection
    .request()
    .query(
      "SELECT COUNT(name) as count FROM sys.databases WHERE name = 'trivia'"
    );
  if (dbCount.recordset[0].count === 0) {
    await poolConnection.request().query("CREATE DATABASE trivia");
  }

  const tableCount = await poolConnection
    .request()
    .query(
      "SELECT COUNT(TABLE_NAME) as count FROM trivia.INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'question'"
    );
  if (tableCount.recordset[0].count === 0) {
    const sql = await readFile(join(__dirname, "./mssql.sql"), "utf-8");

    await poolConnection.request().query(sql);
  }

  const questions = await getQuestions();
  for (const question of questions) {
    const insertResult = await poolConnection
      .request()
      .input("json", JSON.stringify(question)).query(`
        INSERT INTO trivia.dbo.question
        SELECT * FROM OPENJSON(@json)
        WITH (
            question nvarchar(max) '$.question',
            correct_answer nvarchar(max) '$.correct_answer',
            incorrect_answers nvarchar(max) '$.incorrect_answers' AS JSON
        )`);
    console.log(insertResult);
  }
}

export async function setup() {
  await setupSql();
}
