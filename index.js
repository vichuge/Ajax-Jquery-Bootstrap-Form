//Inicio del script para uso de datos
$(document).ready(function() {
    //Se oculta la alerta
    $("#alertAccepted").hide()
        //Ajax que solicita el listado de paises
    $.ajax({
        //Url para tomar los paises
        url: 'http://localhost:8080/servicio/paises',
        type: "GET",
        success: function(response) {
            $.each(response, function(index, value) {
                crearOpcion('selectPais', value['nombre'], value['id'])
            });
        }
    })

    //Función que inicializa si hay alguna selección en el dropdown de pais
    $("#selectPais").change(function() {

        //Remueve las opciones de estado y ciudad, ya que el pais es diferente
        $("#selectEstado").find('option').remove()

        //La función crearOpcion crea la opcion en cualquier select
        crearOpcion('selectEstado', '--Selecciona un estado--', "")

        $("#selectCiudad").find('option').remove()
        crearOpcion('selectCiudad', '--Selecciona una ciudad--', "")

        //Toma el valor de pais
        let idPais = $("select[id=selectPais] option").filter(':selected').val()
            //Validador de pais
        if (idPais != "") {
            //Ajax que toma el listado de estados acorde al pais seleccionado
            $.ajax({
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                //Url para tomar los estados
                url: 'http://localhost:8080/servicio/estados',
                type: "POST",
                data: idPais,
                success: function(response) {
                    //Lista los estados
                    $.each(response, function(index, value) {
                        crearOpcion('selectEstado', value['nombre'], value['id'])
                    });
                }
            })
        }
    })

    //Función que inicializada al cambiar el estado seleccionado
    $("#selectEstado").change(function() {
        //Se remueven las opciones de ciudades al cambiar el estado
        $("#selectCiudad").find('option').remove()
        crearOpcion('selectCiudad', '--Selecciona una ciudad--', "")
        let idEstado = $("select[id=selectEstado] option").filter(':selected').val()
        if (idEstado != "") {
            //Ajax que enlista las ciudades de acuerdo al estado seleccionado
            $.ajax({
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                //Url para tomar las ciudades
                url: 'http://localhost:8080/servicio/ciudades',
                type: "POST",
                data: idEstado,
                success: function(response) {
                    //Función que enlista las ciudades
                    $.each(response, function(index, value) {
                        crearOpcion('selectCiudad', value['nombre'], value['id'])
                    });
                }
            })
        }

    })

    //Función que inicializa al hacer click en el boton de submit
    $("#btnSubmit").click(function() {

        //Primero hace una validación
        if ($("form")[0].checkValidity()) {

            //Toma los valores de los inputs en la página
            let nombre = $("#nombre").val()
            let edad = $("#edad").val()
            let idCiudad = $("select[id=selectCiudad] option").filter(':selected').val()
                //La variable allIsCorrect se encarga de contar las validaciones que no se hayan cumplido
            let allIsCorrect = 0

            //Validación del tamaño del nombre
            if (nombre.length > 50) {
                allIsCorrect++
            }

            //Validación de cada caractér del nombre
            for (i = 0; i <= nombre.length; i++) {
                //La función isChar se encarga de que todos los caractéres sean válidos de acuerdo a lo requerido
                let isValidate = isChar(nombre.charAt(i))
                if (isValidate == false) {
                    allIsCorrect++
                }
            }

            //Validación de la edad
            if (edad < 18 || edad > 99) {
                allIsCorrect++
            }

            //Si allIsCorrect no tiene datos, entonces se pueden enviar los datos
            if (allIsCorrect <= 0) {
                //Creamos la data con stringify
                let JSONs = JSON.stringify({
                    ciudadId: idCiudad,
                    nombre: nombre,
                    edad: edad
                })

                //El ajax se encarga de enviar los datos a la API
                $.ajax({
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    //Url para guardar los datos del usuario
                    url: 'http://localhost:8080/servicio/guardar',
                    type: "POST",
                    data: JSONs,
                    success: function(response) {
                        $("#alertText").text(response['resultado'])
                        $("#alertAccepted").show()
                        console.log(response['resultado'])
                        setTimeout(function() {
                            $("#alertAccepted").hide()
                        }, 2000)
                    }
                })
            }

        } else {
            console.log('Formato no valido')
        }
    })


})

//Función que se encarga de crear una opción para los diferentes selects en la página
function crearOpcion(elementoId = "", texto = "", id = 0) {
    let sel = document.getElementById(elementoId)
    let opt = document.createElement('option')
    opt.text = texto
    opt.value = id
    sel.add(opt)
}

//Función que se encarga de validar que los caractéres cumplan con lo requerido en el campo "Nombre"
function isChar(value) {
    if (value != "A" ||
        value != "E" ||
        value != "I" ||
        value != "O" ||
        value != "U" ||
        value != "Á" ||
        value != "É" ||
        value != "Í" ||
        value != "Ó" ||
        value != "Ú" ||
        value != "a" ||
        value != "e" ||
        value != "i" ||
        value != "o" ||
        value != "u" ||
        value != "á" ||
        value != "é" ||
        value != "í" ||
        value != "ó" ||
        value != "ú" ||
        value != "B" ||
        value != "C" ||
        value != "D" ||
        value != "F" ||
        value != "G" ||
        value != "H" ||
        value != "J" ||
        value != "K" ||
        value != "L" ||
        value != "M" ||
        value != "N" ||
        value != "P" ||
        value != "Q" ||
        value != "R" ||
        value != "S" ||
        value != "T" ||
        value != "V" ||
        value != "W" ||
        value != "X" ||
        value != "Y" ||
        value != "Z" ||
        value != "Ñ" ||
        value != "b" ||
        value != "c" ||
        value != "d" ||
        value != "f" ||
        value != "g" ||
        value != "h" ||
        value != "j" ||
        value != "k" ||
        value != "l" ||
        value != "m" ||
        value != "n" ||
        value != "p" ||
        value != "q" ||
        value != "r" ||
        value != "s" ||
        value != "t" ||
        value != "v" ||
        value != "w" ||
        value != "x" ||
        value != "y" ||
        value != "z" ||
        value != "ñ" ||
        value != " " ||
        value != ".") {
        return true
    } else {
        return false
    }
}