

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    document.getElementById("user_div").style.display = "block"; 
    document.getElementById("login_div").style.display = "none"; 

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Добро пожаловать, на сайт жалоб: " + email_id;

    }

    } else {

    document.getElementById("user_div").style.display = "none"; 
    document.getElementById("login_div").style.display = "block";

  }
});

function register() {
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Ошибка!");
  }).then(() => console.log('success'));
}

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {

    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Ошибка : Пользователь не зарегистрирован или не верный пароль!");

  }).then(() => console.log('entered'));

}


function logout(){
  firebase.auth().signOut();
}

var database = firebase.database();

function saveToFirebase(event) {
  var contactName = document.getElementById('contactName').value.trim();
  var contactMessage = document.getElementById('contactMessage').value.trim();
  var contactSubject = document.getElementById('contactSubject').value.trim();
  var contactEmail = document.getElementById('contactEmail').value.trim();
  var msgId =  Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  if (contactName.length > 0) {
      writeMessageData(msgId, contactName, contactEmail, contactSubject, contactMessage);
  }
  document.getElementById('contactForm').style.display = 'none';

  document.getElementById('contactResult').innerHTML = '<p>Ваше сообщение отправлено, в ближайшее время я свяжусь с вами.</p>';

  console.log('msgId: ' + msgId);
  return false;
};

function writeMessageData(msgId, name, email, subject, message) {
  firebase.database().ref('messages/' + msgId).set({
    username: name,
    email: email,
    subject: subject,
    message: message
  });
};

function conclusion(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {

    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Ошибка : Пользователь не зарегистрирован или не верный пароль!");

  }).then(() => console.log('entered'));

}



