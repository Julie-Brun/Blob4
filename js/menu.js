$(document).ready(function() {
    $("#play").click(function(){
        $(".button").remove();
        $("#blobBondissant").remove();
        
        setTimeout(function(){
            $("#blobAccueil").attr("src", "./img/BlobEngloutissant.gif").css("width", "70%");
        }, 500);

        setTimeout(function(){
            let div = $("<div class='splashScreen'></div>");
            $("body").append(div);
            $(div).css({
                "z-index": "10",
                "position": "absolute",
                "width": "100%",
                "height": "100%",
                "backgroundColor": "#9D7ACC",
            });
        }, 1000);
        
        setTimeout(function(){
            window.location.href = "game.html";
        }, 2000);
    });

    $("#rules").click(function(){
        let div = $("<div class='rules'></div>");
        $("body").append(div);
        $(div).css({
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
            "text-align": "center"
        }).html("<p>Soyez le premier à aligner quatre jetons horizontalement, verticalement ou en diagonale pour remporter la partie !<br> Si lors de la partie, tous les jetons sont joués sans qu'il y est d'alignement, c'est le Game Over.</p>");
        
        $("body div p").css("margin", "150px");
    });

    $(document).on("click", ".rules", function(){
        $(this).remove();
    });
})
