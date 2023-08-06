package ObjectsFromFront;

public class Fields {
    private String name, credits, type, year, cuatrimestre, profesorId, gradoId, ident;


    public Fields() {}

    public String getIdent() {
        return ident;
    }

    public String getValue(String key) {
        switch (key) {
            case "name":
                return getName();
            case "creditos":
                return getCredits();
            case "type":
                return getType();
            case "year":
                return getYear();
            case "cuatrimestre":
                return getCuatrimestre();
            case "profesor":
                return getProfesorId();
            case "grado":
                return getGradoId();
            case "id":
                return getIdent();
        }
        return "";
    }


    public String getName() {
        return name;
    }

    public String getCredits() {
        return credits;
    }

    public String getType() {
        return type;
    }

    public String getYear() {
        return year;
    }

    public String getCuatrimestre() {
        return cuatrimestre;
    }

    public String getProfesorId() {
        return profesorId;
    }

    public String getGradoId() {
        return gradoId;
    }
}
