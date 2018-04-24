<?php 

  $conn = new mysqli("localhost","root","","websiteproject") or die ("Connect failed");
  
  $id = $_POST['ID'];
  $query = "SELECT * FROM login WHERE id='$id'";
  
  if ($result = mysqli_query($conn,$query))
  {

  while ($row = mysqli_fetch_row($result))
    {
		if($row[0] == $id)
		{
			 header ("Location: Main.html");
		}
    }
  // Free result set
  mysqli_free_result($result);
}

mysqli_close($conn);
exit();
?>