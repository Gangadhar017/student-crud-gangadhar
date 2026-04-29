const API_URL = '/students';

const form = document.getElementById('studentForm');
const idInput = document.getElementById('studentId');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const courseInput = document.getElementById('course');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const tableBody = document.getElementById('studentTableBody');
const toast = document.getElementById('toast');

let isEditing = false;

document.addEventListener('DOMContentLoaded', fetchStudents);


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const student = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        course: courseInput.value.trim()
    };

    if (isEditing) {
        await updateStudent(idInput.value, student);
    } else {
        await createStudent(student);
    }
});

cancelEditBtn.addEventListener('click', resetForm);

async function fetchStudents() {
    try {
        const response = await fetch(API_URL);
        const students = await response.json();
        renderTable(students);
    } catch (error) {
        showToast('Failed to load students. Ensure backend is running.', true);
    }
}

async function createStudent(student) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        });
        
        if (response.ok) {
            showToast('Student added successfully!');
            resetForm();
            fetchStudents();
        } else {
            throw new Error('Error creating');
        }
    } catch (error) {
        showToast('Failed to add student', true);
    }
}

async function updateStudent(id, student) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        });
        
        if (response.ok) {
            showToast('Student updated successfully!');
            resetForm();
            fetchStudents();
        } else {
            throw new Error('Error updating');
        }
    } catch (error) {
        showToast('Failed to update student', true);
    }
}

async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this record?')) return;
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showToast('Student deleted successfully!');
            fetchStudents();
        } else {
            throw new Error('Error deleting');
        }
    } catch (error) {
        showToast('Failed to delete student', true);
    }
}

function renderTable(students) {
    tableBody.innerHTML = '';
    
    if (students.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">No students found. Add one on the left!</td></tr>`;
        return;
    }

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${student.id}</td>
            <td style="font-weight: 500;">${student.name}</td>
            <td>${student.email}</td>
            <td><span style="background: rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 12px; font-size: 0.85rem;">${student.course}</span></td>
            <td>
                <button class="btn action-btn edit-btn" onclick="editStudent(${student.id}, '${student.name.replace(/'/g, "\\'")}', '${student.email.replace(/'/g, "\\'")}', '${student.course.replace(/'/g, "\\'")}')">Edit</button>
                <button class="btn action-btn delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

window.editStudent = function(id, name, email, course) {
    isEditing = true;
    idInput.value = id;
    nameInput.value = name;
    emailInput.value = email;
    courseInput.value = course;
    
    submitBtn.textContent = 'Update Student';
    cancelEditBtn.classList.remove('hidden');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
};


function resetForm() {
    isEditing = false;
    form.reset();
    idInput.value = '';
    submitBtn.textContent = 'Save Student';
    cancelEditBtn.classList.add('hidden');
}

function showToast(message, isError = false) {
    toast.textContent = message;
    if (isError) {
        toast.classList.add('error');
    } else {
        toast.classList.remove('error');
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
