let doctor = document.getElementById("doctor");
let patientName = document.getElementById("patientName");
let appointmentDate = document.getElementById("appointmentDate");
let time = document.getElementById("time");
let formBox = document.getElementById("formBox");
let appointments = document.getElementById("appointments");


let appointmentsData = JSON.parse(localStorage.getItem("appointments")) || [];

/* LOGIN */
function login(){
  let r = role.value;
  let u = username.value;
  let p = password.value;

  if(r==="admin" && u==="admin" && p==="admin123"){
    showAdmin();
  }
  else if(r==="patient"){
    showPatient();
  }
  else{
    loginMsg.innerText="Invalid Login";
  }
}

/* PAGE SWITCH */
function showPatient(){
  loginPage.classList.add("hidden");
  patientPage.classList.remove("hidden");
}

function showAdmin(){
  loginPage.classList.add("hidden");
  adminPage.classList.remove("hidden");
  render();
}

/* PATIENT */
function openForm(d){
  formBox.style.display="block";
  doctor.value=d;
}

function saveAppointment(e){
  e.preventDefault();

  if(!appointmentDate.value){
    alert("Please select date");
    return;
  }

  appointmentsData.push({
    doctor: doctor.value,
    patient: patientName.value,
    date: appointmentDate.value,
    time: time.value
  });

  localStorage.setItem("appointments", JSON.stringify(appointmentsData));
  alert("Appointment Booked Successfully ✅");
  e.target.reset();
  formBox.style.display = "none";
}


/* ADMIN */
function render(){
  appointments.innerHTML="";
  appointmentsData.forEach((a,i)=>{
    appointments.innerHTML+=`
      <tr>
        <td>${a.doctor}</td>
        <td>${a.patient}</td>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td>
          <button class="edit" onclick="editApp(${i})">Edit</button>
          <button class="delete" onclick="deleteApp(${i})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function editApp(i){
  let name = prompt("Edit Patient Name",appointmentsData[i].patient);
  if(name){
    appointmentsData[i].patient=name;
    localStorage.setItem("appointments",JSON.stringify(appointmentsData));
    render();
  }
}

function deleteApp(i){
  if(confirm("Delete Appointment?")){
    appointmentsData.splice(i,1);
    localStorage.setItem("appointments",JSON.stringify(appointmentsData));
    render();
  }
}

function logout(){
  location.reload();
}
