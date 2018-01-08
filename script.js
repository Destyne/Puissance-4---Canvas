(function($) {
  $.fn.puissane = function(x = 6, y = 6, couleurJ1 = "red", couleurJ2 ="yellow")
  {

    const MARGE = 5;
    const PION = 60;
    const RAYON = PION/2;
    const CASE = MARGE + PION;
    var player = 1;
    var canvas = document.createElement("canvas");
    var scoresj1 = 1;
    var scoresj2 = 1;
    canvas.innerHTML = "Active javascript";
    canvas.width = x * (PION + MARGE);
    canvas.height = y * (PION + MARGE);
    document.body.appendChild(canvas);

    var div_score = document.createElement("div");
    div_score.setAttribute("id", "scores");
    document.body.appendChild(div_score);
    var style = document.createElement("style");
    style.innerHTML= "#scores{width : 12rem; color : green;}";
    document.body.appendChild(style);

    var div_score1 = document.createElement("div");
    div_score1.setAttribute("id", "scores1");
    document.body.appendChild(div_score1);
    var style = document.createElement("style");
    style.innerHTML= "#scores1{width : 20rem; color : green;}";
    document.body.appendChild(style);

    function generate_array(x, y){
      var p4 = [];
      for(var i = 0; i < y; i++){
        p4.push(new Array());
        for(var j = 0; j < x; j++){
         p4[i].push(null);
       }
     }
     return p4;
   }
   var arraytab = generate_array(x, y);


   /* J'affiche la view ainsi que mon tableau genérer précedement */
   function generate_view(x, y, canvas){
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, x * (PION + MARGE), y * (PION + MARGE));
    for(var i = 0; i < y; i++){
      for(var j = 0; j < x; j++){
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(j * (MARGE + PION) + RAYON + MARGE/2, i *(PION + MARGE) + RAYON + MARGE/2, RAYON, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
      }
    }
  }

  var div_dec = document.createElement("div");
  div_dec.innerHTML = "A toi de jouer Joueur 1";
  div_dec.className = "tour_jeux";
  div_dec.classList.add("tour_jeux");
  div_dec.setAttribute("class", "tour_jeux");
  var style = document.createElement("style");
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(div_dec);
  function getCoords(el,event) {
    var ox = -el.offsetLeft,
    oy = -el.offsetTop;
    while(el=el.offsetParent){
      ox += el.scrollLeft - el.offsetLeft;
      oy += el.scrollTop - el.offsetTop;
    }
    return {x:event.clientX + ox , y:event.clientY + oy};
  }

  generate_view(x, y, canvas);

  /* Je crée mes pions */
  $(canvas).click(function(e) { 
    var position = getCoords(canvas, e);
    for(var i = 0; i < y; i++){
      for(var j = 0; j < x; j++){
        if(position.x > j * CASE && position.x < (j + 1) * CASE &&
         position.y > i * CASE && position.y < (i + 1) * CASE) {
          var ligne = x - 1;
        for(z = ligne; ligne >= 0; z--) {
          console.log(arraytab);
          console.log("Z=" + z + " - J=" + j);
          if(arraytab[z] == undefined){
           alert("Vous ne pouvez pas reposer des pions dans cette ligne");
         }
         if (arraytab[z][j] == null) {
          if(player == 1) {
            $( ".tour_jeux").replaceWith("<p class='tour_jeux'> A ton tour Joueur 1</p>");
            add_pion(j, z, canvas, couleurJ1);
            arraytab[z][j] = 1;
            if (check_v(z, j) || check_h(z, j) || check_diagonal1(z, j) || check_diagonal2(z, j)) {
              alert("joueur 1 a gagner");
               $( "canvas" ).remove();
              div_score.innerHTML = "joueur 1 a marquer: " + scoresj1++ + "pts  Relancez le plugin " ;
            }
            player = 2;
            break;
          }
          if( player == 2){
            $( ".tour_jeux").replaceWith("<p class='tour_jeux'> A ton tour Joueur 2</p>");
            add_pion(j, z, canvas, couleurJ2);
            arraytab[z][j] = 2;
            if (check_v(z, j) || check_h(z, j) || check_diagonal1(z, j) || check_diagonal2(z, j)) {
              alert("joueur 2 a gagner");
               $( "canvas" ).remove();
              div_score1.innerHTML = "joueur 2 a marquer: " + scoresj2++ + "pts   Relancez le plugin " ;
            }
          }
          player = 1;
          break;
        }       
      }
    }
  }
}
});

  function add_pion( j, i, canvas, couleur){
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = couleur;
    ctx.arc(j * (MARGE + PION) + RAYON + MARGE/2, i *(PION + MARGE) + RAYON + MARGE/2, RAYON, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
  }

  function check_v(i, j){
  //console.log(arraytab[i][j]);
  var c_y = i;
  var c_x = j;
  var total = 1;
  for (var y = 1; y <= 4; y++)
  {
    if (arraytab[c_y + y] === undefined)
      continue;

    if(player == arraytab[c_y + y][j]){
      total += 1;
    }
    else{
      break;
    }
  }
  console.log("Joueur " + player + ": " + total);
  return total >= 4;
}

function check_h(i, j){
  var c_y = i;
  var c_x = j;
  var total = 1;
  for (var x = 1; x <= 4; x++)
  {
    if (arraytab[c_y][c_x + x] === undefined)
      continue;

    if(player == arraytab[c_y][c_x + x]){
      total += 1;
    }
    else{
      break;
    }
  }
  for (var x = 1; x <= 4; x++)
  {
    if (arraytab[c_y][c_x -x] === undefined)
      continue;

    if(player == arraytab[c_y][c_x -x]){
      total += 1;
    }
    else{
      break;
    }
  }
  console.log("Joueur " + player + ": " + total);
  return total >= 4;
}

function check_diagonal1(i, j){
  var c_y = i;
  var c_x = j;
  var total = 1;
  for (var i = 1; i <= 4; i++)
  {
    if (arraytab[c_y + i] == undefined || arraytab[c_y + i][c_x + i] === undefined)
      continue;

    if (player == arraytab[c_y  + i][c_x + i]){
      total += 1;
    }
    else{
      break;
    }
  }
  for (var i = 1; i <= 4; i++)
  {
    if (arraytab[c_y - i] == undefined || arraytab[c_y - i][c_x - i] === undefined)
      continue;

    if (player == arraytab[c_y - i][c_x - i]){
      total += 1;
    }
    else{
      break;
    }
  }
  console.log("Joueur " + player + ": " + total);
  return total >= 4;
}

function check_diagonal2(i, j){
  var c_y = i;
  var c_x = j;
  var total = 1;
  for (var i = 1; i <= 4; i++)
  {
    if (arraytab[c_y - i] == undefined || arraytab[c_y - i][c_x + i] === undefined)
      continue;

    if (player == arraytab[c_y - i][c_x + i]){
      total += 1;
    }
    else{
      break;
    }
  }

  for (var i = 1; i <= 4; i++)
  {
    if (arraytab[c_y + i] == undefined || arraytab[c_y + i][c_x - i] === undefined)
      continue;

    if (player == arraytab[c_y + i][c_x - i]){
      total += 1;
    }
    else{
      break;
    }
  }
  console.log("Joueur " + player + ": " + total);
  return total >= 4;
}
}
})(jQuery);