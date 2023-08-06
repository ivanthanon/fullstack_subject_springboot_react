package com.project.proyectospring;

import Connection.ConnectionDB;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

public class ProyectospringApplication {

	public static void main(String[] args) {
		ConnectionDB.openConn();
		SpringApplication.run(ProyectospringApplication.class, args);
	}
}
