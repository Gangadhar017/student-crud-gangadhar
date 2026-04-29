package com.example.studentcrud.service;

/**
 * Name: Gangadhar
 * Roll Number: 2315100006
 * Section: CG
 */

import com.example.studentcrud.model.Student;
import com.example.studentcrud.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public void createStudent(Student student) {
        studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Integer id) {
        return studentRepository.findById(id);
    }

    public void updateStudent(Integer id, Student student) {
        studentRepository.update(id, student);
    }

    public void deleteStudent(Integer id) {
        studentRepository.deleteById(id);
    }
}
