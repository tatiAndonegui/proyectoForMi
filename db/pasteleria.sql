-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2024 at 03:51 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pasteleria`
--

-- --------------------------------------------------------

--
-- Table structure for table `ingrendientes`
--

CREATE TABLE `ingrendientes` (
  `idIngrendientes` int(11) NOT NULL,
  `descripcionIngrediente` varchar(80) DEFAULT NULL,
  `receta_idReceta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ingrendientes`
--

INSERT INTO `ingrendientes` (`idIngrendientes`, `descripcionIngrediente`, `receta_idReceta`) VALUES
(1, '225 g manteca', 1),
(2, '100 g azúcar', 1),
(3, '200 g harina', 1),
(4, '100 g maizena', 1),
(5, '360 g azúcar impalpable', 1),
(6, '2 cucharas soperas merengue en polvo', 1),
(7, '1 cucharita esencia de vainilla', 1),
(8, '6 a 10 cucharadas agua', 1),
(9, 'Colorante vegetal blanco', 1),
(10, 'Colorante vegetal blanco2', 8),
(26, 'Nuevo ingrediente21', 8),
(28, 'Nuevo ingrediente', 9),
(30, 'Nuevo ingrediente', 1);

-- --------------------------------------------------------

--
-- Table structure for table `paso`
--

CREATE TABLE `paso` (
  `idPaso` int(11) NOT NULL,
  `descripcionPaso` varchar(250) DEFAULT NULL,
  `receta_idReceta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paso`
--

INSERT INTO `paso` (`idPaso`, `descripcionPaso`, `receta_idReceta`) VALUES
(1, 'Precalentamos el horno a 180 grados', 1),
(2, 'Tamizar la harina y la maicena en un bowl. En la procesadora molemos el azúcar para que quede más fina y separamos en otro bowl. A el azúcar le agregamos la manteca a temperatura ambiente y amasamos integrando todo.', 1),
(3, 'De a poco incorporamos la harina y amasamos solo un poco. Llevar a la heladera por 5 minutos con un papel film o un trapo.', 1),
(4, 'Con ayuda de un palo de amasar y harina sobre una superficie plana estiramos nuestra masa y con nuestros cortadores de galletas marcamos las fórmulas deseadas. Con una espátula las sacamos y las colocamos sobre una asadera para horno previamente acei', 1),
(5, 'Llevar al horno 10 minutos (ir chequeando cada 3 minutos) hasta que estén doradas. Dejar enfriar por completo para agregar el glaseado.', 1),
(6, 'Para el glaseado poner el azúcar impalpable y en merengue en polvo en un bowl y mezclar. Agregar la esencia de vainilla y el agua e ir mezclando hasta que quede consistencia merengue.', 1),
(7, 'Separar en bowls y teñir con los colorantes y cubrir con papel film. Rellenar mangas y colocar una gomita al final de la manga para que el merengue no se seque. Preparar los confites para agregarlo cuando el merengue aún este húmedo.', 1),
(8, 'Decorar las galletas y dejarlas separadas para que se sequen. Una vez secas, Disfrutar', 1);

-- --------------------------------------------------------

--
-- Table structure for table `receta`
--

CREATE TABLE `receta` (
  `idReceta` int(11) NOT NULL,
  `nombreReceta` varchar(45) NOT NULL,
  `descripcionReceta` varchar(250) DEFAULT NULL,
  `foto` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receta`
--

INSERT INTO `receta` (`idReceta`, `nombreReceta`, `descripcionReceta`, `foto`) VALUES
(1, 'Galletitas Navideñas', 'Galletitas de manteca con glaseado real.', NULL),
(8, 'Galletitas Navideñas123', 'test', NULL),
(9, 'test2', 'SADASDSA', NULL),
(10, 'test3', 'asdasdasd', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombreUsuario` varchar(45) NOT NULL,
  `apellidoUsuario` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `clave` varchar(45) NOT NULL,
  `nivel` varchar(45) DEFAULT NULL,
  `fechaAlta` datetime DEFAULT NULL,
  `estado` enum('activo','baneado') NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombreUsuario`, `apellidoUsuario`, `email`, `clave`, `nivel`, `fechaAlta`, `estado`) VALUES
(1, 'tatiana', 'andonegui', 'tati@gmail.com', '123', 'admin', '2022-12-18 17:35:46', 'activo'),
(2, 'rosa', 'gomez', 'gomez1@yahoo.com.ar', '456', 'usuario', '2022-12-18 17:36:46', 'activo'),
(3, 'holi', 'holi', 'holi@holi', '202cb962ac59075b964b07152d234b70', 'admin', '2024-06-17 17:53:03', 'activo'),
(4, 'test1', 'test1', 'test1@gmail.com', '662af1cd1976f09a9f8cecc868ccc0a2', 'usuario', '2024-06-29 12:01:47', 'activo'),
(5, 'test2', 'test2', 'test2@gmail.com', 'cc03e747a6afbbcbf8be7668acfebee5', 'admin', '2024-06-29 13:30:14', 'activo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ingrendientes`
--
ALTER TABLE `ingrendientes`
  ADD PRIMARY KEY (`idIngrendientes`);

--
-- Indexes for table `paso`
--
ALTER TABLE `paso`
  ADD PRIMARY KEY (`idPaso`);

--
-- Indexes for table `receta`
--
ALTER TABLE `receta`
  ADD PRIMARY KEY (`idReceta`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ingrendientes`
--
ALTER TABLE `ingrendientes`
  MODIFY `idIngrendientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `paso`
--
ALTER TABLE `paso`
  MODIFY `idPaso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `receta`
--
ALTER TABLE `receta`
  MODIFY `idReceta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
