<?php

if(isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $mailTo = "jonathan.a.calderon3@gmail.com";
    $headers = "From: ".$email;
    $txt = "You have received an email from ".$name.".\n\n".$message;

    mail($mailTo, $headers, $txt);
    header("Location: index.html?mailsend");
}
