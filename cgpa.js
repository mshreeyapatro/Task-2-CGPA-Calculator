// Grade to point mapping
const gradePoints = {
    S: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    F: 0
};

let subjects = [];
let editIndex = -1;

// Utility: Update the table and CGPA display
function updateDisplay() {
    const subjectList = document.getElementById('subjectList');
    subjectList.innerHTML = '';
    subjects.forEach((subj, idx) => {
        subjectList.innerHTML += `
            <tr>
                <td>${subj.subject}</td>
                <td>${subj.grade}</td>
                <td>${subj.credit}</td>
                <td>
                    <button onclick="editSubject(${idx})">Edit</button>
                    <button onclick="deleteSubject(${idx})">Delete</button>
                </td>
            </tr>
        `;
    });
    calculateCGPA();
}

// Add or Edit Subject
function addSubject() {
    const subject = document.getElementById('subject').value.trim();
    const grade = document.getElementById('grade').value;
    const credit = Number(document.getElementById('credit').value);

    document.getElementById('inputError').innerText = '';
    document.getElementById('creditError').innerText = '';

    // Validation
    if (!subject) {
        alert("Please enter a subject name.");
        document.getElementById('inputError').innerText = "Subject name required.";
        return;
    }
    if (!credit || credit < 1) {
        alert("Please enter a valid credit (minimum 1).");
        document.getElementById('creditError').innerText = "Credit must be at least 1.";
        return;
    }

    // Check for duplicate subject (when adding, not editing)
    if (editIndex === -1 && subjects.some(s => s.subject.toLowerCase() === subject.toLowerCase())) {
        alert("Subject already exists. Use Edit to modify.");
        document.getElementById('inputError').innerText = "Duplicate subject.";
        return;
    }

    const subjectObj = { subject, grade, credit };

    if (editIndex === -1) {
        // Add new
        subjects.push(subjectObj);
        alert("Subject added successfully!");
    } else {
        // Edit existing
        subjects[editIndex] = subjectObj;
        alert("Subject updated successfully!");
        editIndex = -1;
    }

    document.getElementById('cgpaForm').reset();
    updateDisplay();
}

// Edit Subject
function editSubject(index) {
    const subj = subjects[index];
    document.getElementById('subject').value = subj.subject;
    document.getElementById('grade').value = subj.grade;
    document.getElementById('credit').value = subj.credit;
    editIndex = index;
}

// Delete Subject
function deleteSubject(index) {
    if (confirm("Are you sure you want to delete this subject?")) {
        subjects.splice(index, 1);
        alert("Subject deleted.");
        updateDisplay();
    }
}

// Calculate CGPA
function calculateCGPA() {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach(subj => {
        totalPoints += gradePoints[subj.grade] * subj.credit;
        totalCredits += subj.credit;
    });

    let cgpa = totalCredits ? (totalPoints / totalCredits) : 0;
    document.getElementById('cgpa').innerText = cgpa.toFixed(2);
}

// Reset Form & Data
function resetForm() {
    if (confirm("This will clear all data. Continue?")) {
        subjects = [];
        editIndex = -1;
        document.getElementById('cgpaForm').reset();
        document.getElementById('inputError').innerText = '';
        document.getElementById('creditError').innerText = '';
        updateDisplay();
        alert("Form reset!");
    }
}

// Initial table update
updateDisplay();
