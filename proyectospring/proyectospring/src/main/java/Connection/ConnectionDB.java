package Connection;

import javax.swing.*;
import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ConnectionDB {

    private static Connection conn = null;
    private static final String url = "jdbc:mysql://localhost";
    private static final String port = "3306";
    private static final String user = "root";
    private static final String passwd = "rootroot";
    private static final String db = "universidad";
    private static Statement stmt;
    private static ResultSet rs;


    public static void openConn() {

        // Primero se comprueba que carga el controlador (Si está la librería necesaria)
        try {
            Class.forName( "com.mysql.jdbc.Driver").newInstance();
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, "Error al cargar el controlador");
        }

        // Seguidamente se intenta establecer al conexión
        try {
            String sUrl = url + ":" + port + "/" + db + "?zeroDateTimeBehavior=convertToNull&useUnicode=true&characterEncoding=UTF-8";
            conn = DriverManager.getConnection(sUrl, user, passwd);
            System.out.println(sUrl);

        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Error en la conexión");
        }

        // Por último se carga el objeto de la clase Statement que se utilizará para realizar las consultas
        try {
            stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
        } catch (SQLException ex) {
            System.out.println("SQL EXCEPTION");
        }
    }

    public static Connection getConn() {
        return conn;
    }

    //Cuando se cierre la aplicación hay que cerrar la conexión a la BBDD
    public static void closeConn() {
        try {
            JOptionPane.showMessageDialog(null, "Se cerró la conexión con la BBDD");
            conn.close();
        } catch (SQLException ex) {
            Logger.getLogger(Connection.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static Statement getStmt() {
        return stmt;
    }
}