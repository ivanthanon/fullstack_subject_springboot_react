package Model;


import Connection.ConnectionDB;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ModelAsignaturas {
    private Statement stmt;

    public ArrayList<String[]> getAllRegisters() {
        ConnectionDB.openConn();
        ArrayList<String[]> register = new ArrayList();

        try {
            stmt = ConnectionDB.getStmt();
            ResultSet rs = stmt.executeQuery("select * from asignatura");
            String [] fields = {"id","nombre","creditos","tipo","curso","cuatrimestre","id_profesor","id_grado"};

            while (rs.next()) {
                String [] data = new String[8];
                for (int i = 0; i < data.length; i++) {
                    data[i] = rs.getString(fields[i]);
                    if (i == 6) {
                        data[i] = getTeacherName(data[i]);
                    }
                    if (i == 7) {
                        data[i] = getGradoName(data[i]);
                    }
                }
                register.add(data);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return register;
    }

    private String getGradoName(String gradoName) {
        switch (gradoName) {
            case "1":
                return "Ing.Infor";
            case "2":
                return "Física";
            case "3":
                return "Derecho";
            case "4":
                return "ADE";
            case "5":
                return "Ing.Quimica";

            default: return "";
        }
    }

    private String getTeacherName(String teacherId) {
        switch (teacherId) {
            case "1":
                return "Juan Hernandez";
            case "2":
                return "Ruben Gomez";
            case "3":
                return "Carlos Ferran";
            case "4":
                return "Asdrubal Gonzalez";
            case "5":
                return "Kilian Perez";

                default: return "";
        }
    }

    public boolean addBD (String [] array) {
        try {
            ConnectionDB.openConn();
            stmt = ConnectionDB.getStmt();
            stmt = ConnectionDB.getConn().createStatement(); // Reemplaza el Statement si está cerrado

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

            stmt.execute(query, Statement.RETURN_GENERATED_KEYS);





            stmt = ConnectionDB.getConn().createStatement(); // Reemplaza el Statement si está cerrado

            String queryForId = "SELECT id FROM Asignatura WHERE nombre = '" + array[0] + "'";
            ResultSet rs = stmt.executeQuery(queryForId);

            int idAsignatura = -1;
            if (rs.next()) {
                idAsignatura = rs.getInt("id");
            }


            // Consulta para insertar en grado_asignatura
            String query2 = "INSERT INTO grado_asignatura (id_grado, id_asignatura) VALUES ("
                    + "'" + array[6] + "',"
                    + "'" + idAsignatura + "')";
            stmt = ConnectionDB.getConn().createStatement(); // Reemplaza el Statement si está cerrado

            // Ejecutar el segundo INSERT
            stmt.execute(query2);
            return true;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }


    public boolean deleteBD (String id) {
        try {
            ConnectionDB.openConn();
            stmt = ConnectionDB.getStmt();

            stmt = ConnectionDB.getConn().createStatement(); // Reemplaza el Statement si está cerrado
            String querySelect = "SELECT id_grado FROM Asignatura WHERE id = " + id;
            ResultSet resultSet = stmt.executeQuery(querySelect);

            int idGrado = -1;
            if (resultSet.next()) {
                idGrado = resultSet.getInt("id_grado");
            }

            if (idGrado == -1) {
                throw new SQLException("No se encontró un id_grado para la asignatura con id: " + id);
            }


            stmt = ConnectionDB.getConn().createStatement(); // Reemplaza el Statement si está cerrado
            String query = "DELETE FROM asignatura WHERE id = " + id + ";";
            stmt.executeUpdate(query);


            stmt = ConnectionDB.getConn().createStatement(); // Reemplaza el Statement si está cerrado
            // Eliminar las relaciones de la tabla grado_asignatura
            String queryDeleteRelation = "DELETE FROM grado_asignatura WHERE id_grado = " + idGrado + " AND id_asignatura = " + id;
            stmt.executeUpdate(queryDeleteRelation);
            return true;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    public boolean modifyBD (String [] data, String id) {
        try {
            ConnectionDB.openConn();
            stmt = ConnectionDB.getStmt();
            stmt = ConnectionDB.getConn().createStatement(); // Reemplaza el Statement si está cerrado

            String querySelectGrados = "SELECT id_grado FROM grado_asignatura WHERE id_asignatura = " + id;

            ResultSet rs = stmt.executeQuery(querySelectGrados);

            List<Integer> gradosActuales = new ArrayList<>();
            while (rs.next()) {
                gradosActuales.add(rs.getInt("id_grado"));
            }

            stmt = ConnectionDB.getConn().createStatement(); // Reemplaza el Statement si está cerrado

            String queryDeleteRelation = "DELETE FROM grado_asignatura WHERE id_grado = " + gradosActuales.get(0) + " AND id_asignatura = " + id + ";";
            stmt.executeUpdate(queryDeleteRelation);

            stmt = ConnectionDB.getConn().createStatement(); // Reemplaza el Statement si está cerrado

            String query = "UPDATE asignatura SET nombre='" + data[0] + "', creditos="
                    + data[1] + ", tipo='" + data[2] + "', curso=" + data[3]
                    + ", cuatrimestre=" + data[4] + ", id_profesor=" + data[5]
                    + ", id_grado=" + data[6] + " WHERE id=" + id;
            stmt.executeUpdate(query);


            String query2 = "INSERT INTO grado_asignatura (id_grado, id_asignatura) VALUES ("
                    + "'" + data[6] + "',"
                    + "'" + id + "')";

            stmt = ConnectionDB.getConn().createStatement(); // Reemplaza el Statement si está cerrado

            stmt.executeUpdate(query2);

            System.out.println(Arrays.toString(data)+" + id:" + id);
            return true;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return false;
    }
}
