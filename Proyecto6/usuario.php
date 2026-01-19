<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// INICIAR SESION 
session_start();

// LEER DATOS JSON RECIBIDOS
$datosRecibidos = file_get_contents("php://input");
$datos = json_decode($datosRecibidos, true);

if ($datos === null) {
    echo json_encode(["error" => "JSON inválido"]);
    exit;
}

// VERIFICAR ACCION SOLICITADA
if (!isset($datos["accion"])) {
    echo json_encode(["error" => "Error"]);
    exit;
}

$accion = $datos["accion"];

if ($accion === "guardar") {
    // GUARDAR DATOS DEL FORMULARIO
    // ELIMINAR EL CAMPO "accion" ANTES DE GUARDAR
    unset($datos["accion"]);
    
    // GUARDAR EN SESION
    $_SESSION["datosUsuario"] = json_encode($datos);
    
    // RESPONDER CON CONFIRMACION
    echo json_encode([
        "success" => true,
        "message" => "Datos guardados correctamente",
        "timestamp" => date("Y-m-d H:i:s"),
        "datosRecibidos" => $datos
    ]);
    
} elseif ($accion === "obtener") {
    // OBTENER DATOS GUARDADOS
    if (isset($_SESSION["datosUsuario"]) && !empty($_SESSION["datosUsuario"])) {
        $datosGuardados = json_decode($_SESSION["datosUsuario"], true);
        
        if ($datosGuardados === null) {
            echo json_encode(["error" => "Error"]);
        } else {
            echo json_encode($datosGuardados);
        }
    } else {
        echo json_encode(["error" => "No hay datos guardados"]);
    }
    
} else {
    echo json_encode(["error" => "Error: " . $accion]);
}
?>