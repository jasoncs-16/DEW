<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// CONFIGURACION DE LA BASE DE DATOS
$host = 'localhost';
$dbname = 'Proyecto6';
$username = 'adminJcs';
$password = 'Admin123!';

// OPCIONES DE PDO
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4",
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, $options);
} catch(PDOException $e) {
    echo json_encode(['error' => 'Error de conexión a la base de datos: ' . $e->getMessage()]);
    exit();
}

// LEER DATOS JSON 
$input = file_get_contents('php://input');
$datos = json_decode($input, true);

if ($datos === null) {
    echo json_encode(['error' => 'Datos JSON inválidos']);
    exit();
}

if (!isset($datos['accion'])) {
    echo json_encode(['error' => 'Acción no especificada']);
    exit();
}

$accion = $datos['accion'];

// GUARDAR EN LA BASE DE DATOS 
if ($accion === 'guardar') {
    try {
        // VALIDAR QUE TODOS LOS CAMPOS NECESARIOS ESTÉN PRESENTES
        $camposRequeridos = ['nombre', 'apellidos', 'dni', 'fecNac', 'codPostal', 'email', 
                            'telFijo', 'telMovil', 'iban', 'tarjetaCredito', 'contrasenha', 'repetirCon'];
        
        foreach ($camposRequeridos as $campo) {
            if (!isset($datos[$campo]) || empty($datos[$campo])) {
                echo json_encode(['success' => false, 'error' => "El campo $campo es obligatorio"]);
                exit();
            }
        }
        
        // VERIFICAR SI YA EXISTE UN USUARIO CON ESE DNI
        $sqlCheck = "SELECT dni FROM usuario WHERE dni = :dni";
        $stmtCheck = $pdo->prepare($sqlCheck);
        $stmtCheck->execute([':dni' => $datos['dni']]);
        
        if ($stmtCheck->fetch()) {
            // SI EXISTE SE ACTUALIZA
            $sql = "UPDATE usuario SET 
                    nombre = :nombre,
                    apellidos = :apellidos,
                    fecNac = :fecNac,
                    codPostal = :codPostal,
                    email = :email,
                    telFijo = :telFijo,
                    telMovil = :telMovil,
                    iban = :iban,
                    tarjetaCredito = :tarjetaCredito,
                    contrasenha = :contrasenha,
                    repetirCon = :repetirCon
                    WHERE dni = :dni";
            $mensaje = 'Datos actualizados correctamente en la base de datos';
        } else {
            // SI NO EXISTE SE INSERTA UN NUEVO USUARIO
            $sql = "INSERT INTO usuario (nombre, apellidos, dni, fecNac, codPostal, email, telFijo, telMovil, iban, tarjetaCredito, contrasenha, repetirCon) 
                    VALUES (:nombre, :apellidos, :dni, :fecNac, :codPostal, :email, :telFijo, :telMovil, :iban, :tarjetaCredito, :contrasenha, :repetirCon)";
            $mensaje = 'Datos insertados correctamente en la base de datos';
        }
        
        $stmt = $pdo->prepare($sql);
        $resultado = $stmt->execute([
            ':nombre' => $datos['nombre'],
            ':apellidos' => $datos['apellidos'],
            ':dni' => $datos['dni'],
            ':fecNac' => $datos['fecNac'],
            ':codPostal' => $datos['codPostal'],
            ':email' => $datos['email'],
            ':telFijo' => $datos['telFijo'],
            ':telMovil' => $datos['telMovil'],
            ':iban' => $datos['iban'],
            ':tarjetaCredito' => $datos['tarjetaCredito'],
            ':contrasenha' => $datos['contrasenha'],
            ':repetirCon' => $datos['repetirCon']
        ]);
        
        if ($resultado) {
            echo json_encode(['success' => true, 'mensaje' => $mensaje]);
        } else {
            echo json_encode(['success' => false, 'error' => 'No se pudieron guardar los datos']);
        }
        
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error al guardar en la base de datos: ' . $e->getMessage()]);
    }
    
// OBTENER DESDE BASE DE DATOS
} elseif ($accion === 'obtener') {
    try {
        if (!isset($datos['dni']) || empty($datos['dni'])) {
            echo json_encode(['error' => 'Debe proporcionar un DNI para buscar']);
            exit();
        }
        
        $sql = "SELECT nombre, apellidos, dni, fecNac, codPostal, email, telFijo, telMovil, iban, tarjetaCredito, contrasenha, repetirCon 
                FROM usuario 
                WHERE dni = :dni";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':dni' => $datos['dni']]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($usuario) {
            echo json_encode($usuario);
        } else {
            echo json_encode(['error' => 'No se encontró ningún usuario con el DNI: ' . $datos['dni']]);
        }
        
    } catch(PDOException $e) {
        echo json_encode(['error' => 'Error al obtener datos de la base de datos: ' . $e->getMessage()]);
    }
    
} else {
    echo json_encode(['error' => 'Acción no válida: ' . $accion]);
}
?>