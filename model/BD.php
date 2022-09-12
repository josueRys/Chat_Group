<?php

    class BD{

        private $sql;

        public function __construct(){
            $this->sql = new mysqli("localhost","root","josue","chat");

            if($this->sql->errno){
                echo "Error en conexion";
            }
        }

        public function getMessageJSON($space){
            $msg = array();
            $consulta = "SELECT *FROM msg where space = '$space'";
            $resultado = $this->sql->query($consulta);

            while($fila = $resultado->fetch_assoc()){
                $user = $fila['user'];
                if($_SESSION["user"] == $fila['user']){
                    $user = 'local';
                }
				$data_message = array(
					'createdDate' => $fila['createdDate'],
					'user' => $user,
					'message' => $fila['message'],
                    'space' => $fila['space']
                );

				array_push($msg, $data_message);

			}

            $data = json_encode($msg);

            echo $data;
        }

        public function insertMessage($message, $user, $space){
            $consulta = "INSERT INTO msg(message,user,space) VALUES('$message','$user','$space')";
            $resultado = $this->sql->query($consulta);
        }

    }

?>