$(document).ready(function () {
    function firstConfig(){
        let validate = (document.cookie.theme  === '' || document.cookie.count === '' ||
                        document.cookie.sound  === '' || document.cookie.chrono === '');
        console.log(validate);
        if(!validate){
            document.cookie.theme  = 1;
            document.cookie.count  = 0;
            document.cookie.sound  = 1;
            document.cookie.chrono = 0;
            console.log("penis")
        }
    }
    function loadConfig(){
        $("#themes").val(document.cookie.theme);
        // console.log(localStorage.getItem("sound"));
        $("#chrono").prop("checked", document.cookie.chrono);
        $("#count").prop("checked", document.cookie.count);
        $("#sound").prop("checked", document.cookie.sound);
    }
    // Botones de control.
    $("#play").on("click", (e)=>{
        e.preventDefault();
        window.location.reload();
    });
    $("#stop").on("click", (e)=>{
        console.log("Parar cronómetro.");
    });
    $("#saveConfig").on("click", (e)=>{
        e.preventDefault();
        // Obtener información de los input.

    })
    firstConfig();
});