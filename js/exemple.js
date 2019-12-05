$(document).ready(function() {
    // Insert your JQuery code for the game

    var tab_game = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];  // ce tableau represente la grille de jeu (6 de hauteur, 7 de largeur), il vous sera très utile pour identifier le nombre de jeton aligner !

    var player_turn = 1; // permet de determiner a quelle joueur c'est le tour (joueur1 = 1, joueur2 = 2)

    // exemple d'utilisation :

    $("td").click(function() {

        let row_id = $(this).attr('data-id'); // récupere l'index de la case cliker
        let col_id = $(this).parent().attr('data-id'); // récupere l'index de la colonne correspondant a la case clicker


        if (player_turn === 1) {  // player 1 turn

            tab_game[col_id][row_id] = 1; // on definis un jeton pour le player 1 dans notre tableau représentant notre grille de jeu

            player_turn = 2; // Comme le player 1 viens de jouer on definis player_turn à 2 pour indiquez que c'est au player 2 de jouer

            $(this).children().attr('src', 'img/jetonswag.png'); // on affiche visuellement sur la grille de jeu le jeton correspondant au player 1

        }
        else { // player 2 turn

            tab_game[col_id][row_id] = 2; // on definis un jeton pour le player 2 dans notre tableau représentant notre grille de jeu

            player_turn = 1; // Comme le player 2 viens de jouer on definis player_turn à 1 pour indiquez que c'est au player 1 de jouer

            $(this).children().attr('src', 'img/jetonalien.png'); // on affiche visuellement sur la grille de jeu le jeton correspondant au player 2

        }




    });

    // ATTENTION ! Dans l'exemple ci-dessus on insere directement le jeton sur l'élement de la colonne clicker ->
    // au puissance4 on veut que le jeton descende au plus bas de la colonne clicker en fonction de si il y a des jeton en dessous ou pas ->
    // qui plus est si vous tester vous verrez que l'on peut placer un jeton sur un autre jeton, encore une fois ceci n'est qu'un exemple pour vous aider a démarrer !

    // Cette exemple est codé en 'procédural', le faire en orienté objet avec une class Game serait peut etre plus adapter ;-)


});
