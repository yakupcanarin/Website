<?php 

  $conn = new mysqli("localhost","root","","websiteproject") or die ("Connect failed");
  
  $name = $_POST['namesurname'];
  $mail =  $_POST['SignUpemail'];
  $password =  $_POST['SignUppassword'];
  
  $query = "INSERT INTO login (Name_Surname, Email, Password) VALUES ('".$name."', '".$mail."', '".$password."')";
  
  
	if ($conn->query($query) === TRUE) {
		echo "eklendi..";
		header("Location: Login.html");
	}
	else 
	{
		echo "Error: " . $query . "<br>" . $conn->error;
	}
	
 

mysqli_close($conn);

	/*$name = $_POST['namesurname'];
	  $mail =  $_POST['SignUpemail'];
	  $password =  $_POST['SignUppassword'];

	$db = new PDO("mysql:host=localhost;dbname=websiteproject", "root", "");
	
	$db->query("SET CHARACTER SET utf8");
	
	$query = $db->prepare("INSERT INTO login SET
	Name_Surname = ?,
	Email  = ?,
	Password = ?");
	$insert = $query->execute(array(
		 $name, $mail, $password
	));
	if ( $insert ){
		$last_id = $db->lastInsertId();
		print "insert işlemi başarılı!";
	}
	// buradan devam et sen :)
	//ben anlamadım ki ne sikim yaptığını :D çok hızlı yaptın aq :D bekjle aq*/

?>