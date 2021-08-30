import { Connection } from "typeorm";

export default class Database {

  private static connection: Connection;

  public static setConnection(conn: Connection){
    this.connection = conn;
  }

  public static getConnection(){
    if(!(this.connection instanceof Connection)) throw new Error('Database not connected');

    return this.connection;
  }

  public static closeConnection(){
    if(!(this.connection instanceof Connection)) throw new Error('Database not connected');
    this.connection.close();
  }
}

