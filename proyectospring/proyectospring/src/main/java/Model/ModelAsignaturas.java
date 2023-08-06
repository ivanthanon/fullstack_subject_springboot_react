package Model;


import Connection.ConnectionDB;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;

public class ModelAsignaturas {
    private Statement stmt;

    public ArrayList<String[]> getAllRegisters() {
        ArrayList<String[]> register = new ArrayList();

        try {
            stmt = ConnectionDB.getStmt();
            ResultSet rs = stmt.executeQuery("select * from asignatura");
            String [] fields = {"id","nombre","creditos","tipo","curso","cuatrimestre","id_profesor","id_grado"};

            while (rs.next()) {
                String [] data = new String[8];
                for (int i = 0; i < data.length; i++) {
                    data[i] = rs.getString(fields[i]);
                }
                register.add(data);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return register;
    }

    public boolean addBD (String [] array) {
        try {
            stmt = ConnectionDB.getStmt();
            String query = "INSERT INTO Asignatura (nombre, creditos, tipo, curso, cuatrimestre, id_profesor, id_grado)" +
                        " VALUES ("
                        + "'" + array[0] +"',"
                        + "'" + array[1] +"',"
                        + "'" + array[2] +"',"
                        + "'" + array[3] +"',"
                        + "'" + array[4] +"',"
                        + "'" + array[5] +"',"
                        + "'" + array[6]
                        + "')";

                stmt.executeUpdate(query);
                return true;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }


    public boolean deleteBD (String id) {
        try {
            stmt = ConnectionDB.getStmt();
            String query = "DELETE FROM asignatura WHERE id = " + id + ";";
            stmt.executeUpdate(query);
            return true;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    public boolean modifyBD (String [] data, String id) {
        try {
            stmt = ConnectionDB.getStmt();
            String query = "UPDATE asignatura SET nombre='" + data[0] + "', creditos="
                    + data[1] + ", tipo='" + data[2] + "', curso=" + data[3]
                    + ", cuatrimestre=" + data[4] + ", id_profesor=" + data[5]
                    + ", id_grado=" + data[6] + " WHERE id=" + id;
            stmt.executeUpdate(query);
            System.out.println(Arrays.toString(data)+" + id:" + id);
            return true;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return false;
    }
}
