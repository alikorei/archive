'use strict'

const openModel = () => document.getElementById('model').classList.add('active')

const closeModel = () => {
    clearFields()
    document.getElementById('model').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_student')) ?? []
const setLocalStorage = (db_student) => localStorage.setItem('db_student', JSON.stringify(db_student))

const readStudent = () => getLocalStorage()

const createStudent = (student) => {
    const db_student = getLocalStorage()
    db_student.push(student)
    setLocalStorage(db_student)
}

const updateStudent = (index, student) => {
    const db_student = readStudent()
    db_student[index] = student
    setLocalStorage(db_student)
}


const deleteStudent = (index) => {
    const db_student = readStudent()
    db_student.splice(index, 1)
    setLocalStorage(db_student)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.model-field')
    fields.forEach(field => field.value = "")
}

const saveStudent = () => {
    if (isValidFields()) {
        const student = {
                ID: document.getElementById('ID').value,
                Nom_complet: document.getElementById('Nom_complet').value,
                Addresse_Email: document.getElementById('Addresse_Email').value,
                Tel: document.getElementById('Tel').value,
                Heure_de_depart: document.getElementById('Heure_de_depart').value,
                Villes_de_depart_arrivee: document.getElementById('Villes_de_depart_arrivee').value,
                Date_de_reservation: document.getElementById('Date_de_reservation').value,
                Mode_de_paiement: document.getElementById('Mode_de_paiement').value,
            }
            //console.log('The Cadastral student: ' + student)
        const index = document.getElementById('ID').dataset.index
        if (index == 'new') {
            createStudent(student)
            listStudent()
            closeModel()
        } else {
            updateStudent(index, student)
            listStudent()
            closeModel()
        }
    }
}


const createRow = (student, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
	            <td>${student.ID}</td>			
                <td>${student.Nom_complet}</td>
				<td>${student.Addresse_Email}</td>
				<td>${student.Tel}</td>
				<td>${student.Heure_de_depart}</td>
				<td>${student.Villes_de_depart_arrivee}</td>
				<td>${student.Date_de_reservation}</td>
                <td>${student.Mode_de_paiement}</td>
				<td>
					<button type="button" class="button green" id="edit-${index}">Modifier</button>
					<button type="button" class="button red" id="delete-${index}">Supprimer</button>
				</td>
			`
    document.querySelector('#tblStudent>tbody').appendChild(newRow)
}

const crearTable = () => {
    const rows = document.querySelectorAll('#tblStudent>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const listStudent = () => {
    const students = readStudent()
        // console.log(students)
    crearTable()
    students.forEach(createRow)
}

const fillFields = (student) => {
    document.getElementById('ID').value = student.ID
    document.getElementById('Nom_complet').value = student.Nom_complet
    document.getElementById('Addresse_Email').value = student.Addresse_Email
    document.getElementById('Tel').value = student.Tel
    document.getElementById('Heure_de_depart').value = student.Heure_de_depart
    document.getElementById('Villes_de_depart_arrivee').value = student.Villes_de_depart_arrivee
    document.getElementById('Date_de_reservation').value = student.Date_de_reservation
    document.getElementById('Mode_de_paiement').value = student.Mode_de_paiement

    document.getElementById('ID').dataset.index = student.index
}

const editStudent = (index) => {
    const student = readStudent()[index]
    student.index = index
    fillFields(student)
    openModel()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editStudent(index)
        } else {
            const student = readStudent()[index]
            const response = confirm(`Are you sure to delete the student ${student.name}`)
            if (response) {
                deleteStudent(index)
                listStudent()
            }
        }
    }
}

listStudent()

document.getElementById('idStudent').addEventListener('click', openModel)
document.getElementById('modelClose').addEventListener('click', closeModel)
document.getElementById('cancel').addEventListener('click', closeModel)
document.getElementById('save').addEventListener('click', saveStudent)
document.querySelector('#tblStudent>tbody').addEventListener('click', editDelete)