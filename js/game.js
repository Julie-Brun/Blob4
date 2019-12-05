$(document).ready(function(){

    class Puissance4 {
        constructor( grid_dimensions = {x: 7, y: 6} ){
             // Attributs Joueurs
            this.player_one = 1;
            this.player_two = 2;
            this.player_turn = this.player_one;
            this.winner = null;

            // Attributs Grille
            this.grid = [];
            this.grid_dimensions = grid_dimensions;

            // Attributs Tours
            this.max_turn = this.grid_dimensions.x*this.grid_dimensions.y;
            this.count_turn = 0;

            // Appelle la méthode pour générer la grille
            this.generate_grid();
            
            // Logique du jeu
            $("#puissance4").click((event) => this.handle_click(event));

            // Reset du jeu
            $("#reset").click((event) => this.reset_click(event));

            // Restart du jeu
            // $(document).on("click", ".button-restart", (event) => this.restart_click(event));

            // Montre joueur courant
            $("#player").html(this.player_turn);

        }

        // Méthodes
        // Génère la grille
        generate_grid() {         
            for (let h = 0; h < this.grid_dimensions.y; h++) {
                this.grid[h] = [];
                for (let l = 0; l < this.grid_dimensions.x; l++) {
                    this.grid[h][l] = 0;
                }
            }
            console.log("base grid: ", this.grid);
        }

        // Vérifie si une case est libre
        check_last_index(x) {
            for (let h = this.grid_dimensions.y - 1; h >= 0 ; h--) {
                if(this.grid[h][x] === 0){
                    return h;
                }
            }
        }

        // Place les jetons
        add_token(y, x) {
            // Update de la grille JS
            this.grid[y][x] = this.player_turn;
            console.log("updated grid: ", this.grid);

            this.count_turn ++;

            // Update de la table HTML (Pour placer visuellement le jeton)
            if (this.player_turn === this.player_one) {
                $("tr:nth-child(" + (y+1) + ") td:nth-child(" + (x+1) + ") img").attr("src", "./img/Vert02.png");
            } else {
                $("tr:nth-child(" + (y+1) + ") td:nth-child(" + (x+1) + ") img").attr("src", "./img/Violet02.png");
            }
            
            // Check si gagnant + Montre gagnant
            var win = this.check_win(y, x, this.player_turn);
            this.show_winner(win);

            // Partie continue ou game over ?
            this.game_over(this.turn, this.max_turn);
            this.play_continue(this.player_turn, this.winner);

            // Changement joueur courant
            this.player_turn = 3 - this.player_turn;
            $("#player").html(this.player_turn);
            
            console.log(win);
            console.log("turn: ", this.count_turn);
        }

        check_win(y, x, player) {
            // Check horizontal
            let count = 0;
            var tab_win = [];
            for (let l = 0; l < this.grid_dimensions.x; l++) {
                count = (this.grid[y][l] == player) ? count+1 : 0;
                if (this.grid[y][l] == player) {
                    tab_win.push({x: l, y: y});
                }
                if (count >= 4) {
                    this.highlight(tab_win);                    
                    return true;
                }
            };
            console.log(tab_win);

            // Check vertical
            count = 0;
            tab_win = [];
            for (let h = 0; h < this.grid_dimensions.y; h++) { 
                count = (this.grid[h][x] == player) ? count+1 : 0;
                if (this.grid[h][x] == player) {
                    tab_win.push({x: x, y: h});
                }
                if (count >= 4) {
                    this.highlight(tab_win);
                    return true;
                };
            }; 

            // Check diagonal
            count = 0;
            tab_win = [];
            let shift = y - x;
            for (let d = Math.max(shift, 0); d < Math.min(this.grid_dimensions.y, this.grid_dimensions.x + shift); d++) {
                count = (this.grid[d][d - shift] == player) ? count+1 : 0;
                if (this.grid[d][d - shift] == player) {
                    tab_win.push({x: d - shift, y: d});
                }
                if (count >= 4) {
                    this.highlight(tab_win);
                    return true;
                }; 
            };

            // Check anti-diagonal
            count = 0;
            tab_win = [];
            shift = x + y;
            for (let a = Math.max(shift - this.grid_dimensions.x + 1, 0); a < Math.min(this.grid_dimensions.y, shift + 1); a++) {
                count = (this.grid[a][shift - a] == player) ? count+1 : 0;
                if (this.grid[a][shift - a] == player) {
                    tab_win.push({x: shift - a, y: a});
                }
                if (count >= 4) {
                    this.highlight(tab_win);
                    return true;
                };
            };

            return false; 
        }

        // Révèle la ligne gagnante
        highlight(tab) {
            for (let i = 0; i < tab.length; i++) {
                let y = tab[i].y;
                let x = tab[i].x;

                if (this.player_turn === this.player_one) {
                    $("tr:nth-child(" + (y+1) + ") td:nth-child(" + (x+1) + ") img").attr("src", "./img/Vert06.png").css("zIndex", "30");
                } else {
                    $("tr:nth-child(" + (y+1) + ") td:nth-child(" + (x+1) + ") img").attr("src", "./img/Violet06.png").css("zIndex", "30");
                }
            }
        }

        // Montre le gagnant
        show_winner(win) {
            if (win === true) {
                this.winner = 1;
            } else {
                this.winner = null;
            }
        }

        // Game over
        game_over(turn, max_turn) {
            if ( turn === max_turn) {
                this.winner = 2;
            }
        }

        // Vérifie si la partie continue
        play_continue(player, winner) {
            if (winner !== null) {
                // Si la partie s'arrête, génère un écran de fin et cache les boutons
                let victory_screen = $("<div class='victory_screen'></div>");
                $(victory_screen).css({
                    "z-index": "20", 
                    "position": "absolute",
                    // "background-color": "rgba(0,0,0,0.7)", 
                    "width": "44%", 
                    "height": "80%",});
                $("#game").append(victory_screen);
                $(".button").not("#reset").hide();

                // Si gagnant
                if (winner === 1) {                    
                    let win = $("#buttons p");
                    $(win).empty();
                    $(win).html("Le joueur " + player + " a gagné et devient l'élu des Blobs !");

                };

                // Si pas de gagnant
                if (winner === 2) {
                    let win = $("#buttons p");
                    $(win).empty();
                    $(win).html("Pas de gagnant !");

                };

                // Propose le "Restart" et transforme le bouton "Reset"
                $("#restart").html("Rejouer ?");
                $("#reset").html("Rejouer");

            } else {
                this.winner = null;
            }
        }

        // Reset du jeu au clic
        reset_click() {
            for (let h = 0; h < this.grid_dimensions.y; h++) {
                for (let l = 0; l < this.grid_dimensions.x; l++) {
                this.grid[h][l] = 0;
                }
            }
            this.count_turn = 0;
            this.winner = null;
            this.player_turn = 1;

            $(".button").show();
            $("#buttons p").html("Au joueur &#160;<span id='player'>" + this.player_turn + "</span>&#160; !")
            $("#restart").empty();
            $("#reset").html("Recommencer");

        }

        // Gère les évènements au clic 
        handle_click(event) {

            let x = parseFloat($(event.target).parent().attr("data-col"));
            let y = this.check_last_index(x);
            console.log(x, y);

            this.add_token(y, x);
        }
    }

    $(".splashScreen").fadeOut("slow");

    var game = new Puissance4();

    // Boutons
    // Règles
    $("#rules").click(function(){
        let rules = $("<div class='rules'></div>");
        $("body").append(rules);
        $(rules).css({
            "z-index": "20", 
            "position": "absolute",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "background-color": "rgba(0,0,0,0.7)", 
            "width": "100%", 
            "height": "100%",
            "font-family": "'McLaren', cursive",
            "font-size": "35px",
            "color": "#FFFFFF",
            "text-align": "center"})
            .html("<p>Soyez le premier à aligner quatre jetons horizontalement, verticalement ou en diagonale pour remporter la partie !<br> Si lors de la partie, tous les jetons sont joués sans qu'il y est d'alignement, c'est le Game Over.</p>");
        
        $("body div p").css("margin", "150px");
    });

    $(document).on("click", ".rules", function(){
        $(this).remove();
    });

    // Reset
    let $defaultTable = $("#puissance4").clone(true);
    $("#reset").click(function(){
        $("#puissance4").replaceWith($defaultTable.clone(true));
    })

    // Menu
    $("#menu").click(function(){
        window.location.href = "menu.html";
    });
    
})