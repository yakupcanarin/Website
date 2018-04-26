<?php 

  $conn = new mysqli("localhost","root","","websiteproject") or die ("Connect failed");
  
  $mail = $_POST['email'];
  $password = $_POST['password'];
  $query = "SELECT * FROM login WHERE Email='$mail' AND Password='$password'";
  
  if ($result = mysqli_query($conn,$query))
  {

	while ($row = mysqli_fetch_row($result))
    {
		if($row[2] == $mail && $row[3] == $password )
		{
			 header ("Location: Main.html");
		}
		else {
			echo 'YANLIS';
		}
    }
  mysqli_free_result($result);
}

mysqli_close($conn);
exit();
?>