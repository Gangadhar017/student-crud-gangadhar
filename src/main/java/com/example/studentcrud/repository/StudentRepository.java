package com.example.studentcrud.repository;

/**
 * Name: Gangadhar
 * Roll Number: 2315100006
 * Section: CG
 */

import com.example.studentcrud.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class StudentRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private RowMapper<Student> rowMapper = new RowMapper<Student>() {
        @Override
        public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
            Student student = new Student();
            student.setId(rs.getInt("id"));
            student.setName(rs.getString("name"));
            student.setEmail(rs.getString("email"));
            student.setCourse(rs.getString("course"));
            return student;
        }
    };

    public int save(Student student) {
        String sql = "INSERT INTO student (name, email, course) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, student.getName(), student.getEmail(), student.getCourse());
    }

    public List<Student> findAll() {
        String sql = "SELECT * FROM student";
        return jdbcTemplate.query(sql, rowMapper);
    }

    public Student findById(Integer id) {
        String sql = "SELECT * FROM student WHERE id = ?";
        List<Student> students = jdbcTemplate.query(sql, rowMapper, id);
        return students.isEmpty() ? null : students.get(0);
    }

    public int update(Integer id, Student student) {
        String sql = "UPDATE student SET name = ?, email = ?, course = ? WHERE id = ?";
        return jdbcTemplate.update(sql, student.getName(), student.getEmail(), student.getCourse(), id);
    }

    public int deleteById(Integer id) {
        String sql = "DELETE FROM student WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
