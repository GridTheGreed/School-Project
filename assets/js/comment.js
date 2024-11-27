//sent the message to the email  tapo ito is sa file ng comment ng java
function sendMail(){
    let parms = {   
        name : document.getElementById("name").value, 
        // get the value of name, email and message
        email : document.getElementById("email").value,
        message : document.getElementById("message").value,
    }
    emailjs.send("service_1ls2hfg","template_nq365wq",parms).then(alert("Message Sent!")) 
    //by using emailjs it can sent the message to the email address
}