package com.project.proyectospring;

import Model.ModelAsignaturas;
import ObjectsFromFront.Fields;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class RestApi {
    String[] fields = {"name", "creditos", "type", "year", "cuatrimestre", "profesor", "grado"};

    @GetMapping(path = "/")
    public ArrayList<String[]> completeTable() {
        ModelAsignaturas model = new ModelAsignaturas();
        return model.getAllRegisters();
    }

    @PostMapping("/deleteUser")
    public boolean deleteUser(@RequestBody String id) {
        ModelAsignaturas model = new ModelAsignaturas();
        return model.deleteBD(id);
    }

    @PostMapping("/addUser")
    public boolean addUser(@RequestBody Fields params) {
        String[] data = new String[7];

        for (int i = 0; i < data.length; i++) {
            data[i] = params.getValue(fields[i]);
        }


        ModelAsignaturas model = new ModelAsignaturas();
        return model.addBD(data);
    }

    @PostMapping("/updateUser")
    public boolean updateUser(@RequestBody Fields params) {
        String[] data = new String[7];

        for (int i = 0; i < data.length; i++) {
            data[i] = params.getValue(fields[i]);
        }

        ModelAsignaturas model = new ModelAsignaturas();
        return model.modifyBD(data, params.getIdent());
    }
}
