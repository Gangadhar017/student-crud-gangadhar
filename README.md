# Student CRUD Application

**Name:** Gangadhar  
**Roll Number:** 2315100006  
**Section:** CG  

## Description
This is a Spring Boot application that connects to a PostgreSQL database using JDBC (JdbcTemplate) and performs CRUD operations on a single `Student` table. 

## Requirements Implemented
1. **Entity Design**: Student class with id, name, email, and course fields.
2. **Database Setup**: Auto-initialization script (`schema.sql`) and configuration in `application.properties`.
3. **CRUD Operations**: Implemented standard Create, Read, Update, and Delete operations using `JdbcTemplate` (no ORM/Hibernate used).
4. **REST API Endpoints**:
   - `POST /students`
   - `GET /students`
   - `GET /students/{id}`
   - `PUT /students/{id}`
   - `DELETE /students/{id}`
5. **Layered Architecture**: Divided code cleanly into Controller, Service, and Repository layers following best practices.
