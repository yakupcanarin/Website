<?php
		
	$Name = $_POST['namesurname']; //senders name 
	$email = $_POST['mailaddress'];; //senders e-mail adress 
	$recipient = "c.yakup10@gmail.com"; //recipient 
	$mail_body = $_POST['mailtext'];; //mail body 
	$subject = $_POST['subject'];; //subject 
	$header = "From: ". $Name . " <" . $email . ">\r\n"; //optional headerfields 

	ini_set('smtp','smtp.gmail.com');
	ini_set('smtp_port','587');
	ini_set('sendmail_from',$email);
	
	mail($recipient, $subject, $mail_body, $header);

?>