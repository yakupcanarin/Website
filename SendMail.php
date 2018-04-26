<?php
	
	use \PHPMailer;
	date_default_timezone_set('Etc/UTC');
	
	require 'C:/wamp64/apps/phpmyadmin4.7.9/vendor/autoload.php';
	$mail = new PHPMailer;
	$mail->isSMTP();
	$mail->SMTPDebug = 2;
	$mail->Host = 'mail.gmail.com';
	$mail->Port = 25;
	$mail->setFrom('c.yakup10@gmail.com', 'Burak Last');
	$mail->addAddress('ykpcn.arn@hotmail.com', 'Yakup Can Arın');
	$mail->Subject = 'PHPMailer SMTP without auth test';
	$mail->msgHTML(file_get_contents('contents.html'), __DIR__);
	$mail->AltBody = 'This is a plain-text message body';
	if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
	/*$nameSurname = strip_tags($_POST['namesurname']);
	$mailaddrs = strip_tags($_POST['mailaddress']);
	$subject = strip_tags($_POST['subject']);
	$text = strip_tags($_POST['mailtext']);
	mail("ykpcn.arn@hotmail.com",$subject,$text);*/
?>