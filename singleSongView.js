function hideView () {
    let x = document.getElementById("secondView"); 

    if (x.style.display === "none") {
        x.style.display = "block";
        document.querySelector('#firstView').style.display = 'none';

      } else {
        x.style.display = "none";
        document.querySelector('#firstView').style.display = 'block';
      }
    }


