-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 01 Mar 2023 pada 10.24
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `optik_150k`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('pembelian','penjualan','kasir','admin') NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `uuid`, `username`, `password`, `role`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'a731d365-c456-41c8-84ad-48c8369ead4e', 'kasir', 'c7911af3adbd12a035b289556d96470a', 'kasir', 'KASIR NAMA', '2023-02-13 13:59:43', '2023-02-13 13:59:43'),
(2, '42359663-98fa-4ea3-8902-dad204ed6bda', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', 'Muharis', '2023-02-20 22:36:09', '2023-02-20 22:36:09');

-- --------------------------------------------------------

--
-- Struktur dari tabel `beli`
--

CREATE TABLE `beli` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `no_faktur_beli` varchar(100) NOT NULL,
  `beli_tanggal` datetime NOT NULL,
  `supplierId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `beli`
--

INSERT INTO `beli` (`id`, `uuid`, `no_faktur_beli`, `beli_tanggal`, `supplierId`, `createdAt`, `updatedAt`) VALUES
(2, '510d0f4a-20a7-46d3-997e-2f1a09d75569', 'BI-0000002', '2023-02-18 08:00:00', 1, '2023-02-18 13:29:07', '2023-02-18 13:29:07'),
(3, 'b14d1217-733f-4a1e-b7ee-ad00a994234c', 'BI-0000001', '2023-02-18 08:00:00', 1, '2023-02-18 13:29:22', '2023-02-18 13:29:22'),
(8, 'dda2349f-a178-48e9-8152-8f852ad7bf00', 'BI-0000004', '2023-02-18 13:00:00', 1, '2023-02-18 13:33:42', '2023-02-18 13:33:42'),
(9, 'eaa5a3b5-2a6b-492a-87eb-4bedf8bcc693', 'BI-0000005', '2023-02-15 13:00:00', 2, '2023-02-18 13:34:10', '2023-02-18 13:35:21'),
(10, '98c37785-a358-4489-bedb-c5ae91ee48d4', 'BI-0000006', '2023-02-24 00:52:43', 6, '2023-02-24 00:54:13', '2023-02-24 00:54:13'),
(11, '59cd7a32-c9ce-4613-97e0-9a786828ecf5', 'BI-0000007', '2023-02-24 00:54:38', 6, '2023-02-24 00:56:36', '2023-02-24 00:56:36'),
(12, '217ce9d9-47ee-4bf8-afac-210e95a3d670', 'BI-0000008', '2023-02-24 00:58:29', 6, '2023-02-24 00:59:46', '2023-02-24 00:59:46'),
(13, 'ba7e71aa-3a71-42a6-a095-d3439f2a81ff', 'BI-0000009', '2023-02-24 00:58:29', 6, '2023-02-24 01:00:24', '2023-02-24 01:00:24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `beli_detail`
--

CREATE TABLE `beli_detail` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `beliId` varchar(100) NOT NULL,
  `productId` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `beli_detail`
--

INSERT INTO `beli_detail` (`id`, `uuid`, `beliId`, `productId`, `price`, `qty`, `subtotal`, `createdAt`, `updatedAt`) VALUES
(1, 'dasdas', '8', '1', 10000, 1, 10000, '2023-02-18 12:56:09', '2023-02-18 12:56:09'),
(2, 'sadad', '8', '7', 12000, 1, 12000, '2023-02-18 12:56:09', '2023-02-18 12:56:09'),
(3, '9cd3b17c-a3dd-4f0f-b059-c9d3709833f4', '12', '13', 25000, 2, 50000, '2023-02-24 00:59:46', '2023-02-24 00:59:46'),
(4, '7803549d-43f4-415e-9566-a23b114a074d', '13', '13', 25000, 2, 50000, '2023-02-24 01:00:24', '2023-02-24 01:00:24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `broken_product`
--

CREATE TABLE `broken_product` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `productCode` varchar(100) NOT NULL,
  `qty` int(11) NOT NULL,
  `notes` text NOT NULL,
  `broken_date` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `broken_product`
--

INSERT INTO `broken_product` (`id`, `uuid`, `productCode`, `qty`, `notes`, `broken_date`, `createdAt`, `updatedAt`) VALUES
(1, 'c063a22a-4420-49a8-81e9-0114e1252sc5', 'BR0000005', 3, 'Barang Rusak, Diganti', '2023-02-15', '2023-02-15 14:37:18', '2023-02-15 14:37:18');

-- --------------------------------------------------------

--
-- Struktur dari tabel `broken_product_2`
--

CREATE TABLE `broken_product_2` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `productId` varchar(100) NOT NULL,
  `qty` int(11) NOT NULL,
  `notes` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `broken_product_2`
--

INSERT INTO `broken_product_2` (`id`, `uuid`, `productId`, `qty`, `notes`, `createdAt`, `updatedAt`) VALUES
(1, 'd29d68c3-8c98-42e7-b049-822ee0952dc5', '1', 1, 'Barang Rusak, Diganti', '2023-02-18 13:01:11', '2023-02-18 13:01:11'),
(2, 'f54b0ba9-c55b-4763-9ecc-e9590a841aef', '6', 1, 'Barang Rusak, Diganti', '2023-02-18 13:01:19', '2023-02-18 13:01:19'),
(4, '210cb99b-f46c-4a9f-be24-11906703b9d1', '1', 2, 'sadasda', '2023-02-24 01:10:44', '2023-02-24 01:10:44'),
(5, '4999dbd4-db1b-4ced-a305-76a328be193f', '1', 2, 'asdads', '2023-02-24 01:12:22', '2023-02-24 01:12:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cabang`
--

CREATE TABLE `cabang` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `nama_cabang` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `cabang`
--

INSERT INTO `cabang` (`id`, `uuid`, `nama_cabang`, `alamat`, `createdAt`, `updatedAt`) VALUES
(4, '', 'CABANG D EDIT', 'Jl. Sutrisno', '2023-02-14 12:53:27', '2023-02-14 13:02:53'),
(5, '', 'CABANG D', 'Jl. AR. HAKIM', '2023-02-14 12:53:36', '2023-02-14 12:53:36'),
(6, '', 'CABANG E', 'Jl. AR. HAKIM', '2023-02-14 13:02:01', '2023-02-14 13:02:01'),
(7, '', 'CABANG F', 'Jl. AR. HAKIM', '2023-02-14 13:02:05', '2023-02-14 13:02:05'),
(8, '', 'CABANG G', 'Jl. AR. HAKIM', '2023-02-14 13:02:07', '2023-02-14 13:02:07'),
(9, 'a48535d6-018b-4f7b-b265-bf24af727df9', 'CABANG G', 'Jl. AR. HAKIM', '2023-02-14 14:15:12', '2023-02-14 14:15:12'),
(10, 'dcc205b4-9ca9-4488-a1b9-3a98bd291142', 'cabang haris 2', 'asdadasd', '2023-02-22 10:01:06', '2023-02-22 10:01:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cara_bayar`
--

CREATE TABLE `cara_bayar` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `cara_bayar_name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `cara_bayar`
--

INSERT INTO `cara_bayar` (`id`, `uuid`, `cara_bayar_name`, `createdAt`, `updatedAt`) VALUES
(1, '51d96e37-0809-4591-ab88-e0a312916403', 'CASH', '2023-02-14 15:00:57', '2023-02-14 15:00:57'),
(2, '8f0de997-188f-46c3-adec-6deb6f4fbd95', 'CREDIT', '2023-02-14 15:01:04', '2023-02-14 15:01:04'),
(4, '3819ae95-ab33-48ba-8313-5140b74fdc7d', 'DANA', '2023-02-14 15:03:08', '2023-02-14 15:03:08'),
(5, '7ae4bd2d-5d0f-4a7b-8b91-877513f62e2b', 'GOPAY', '2023-02-14 15:03:16', '2023-02-14 15:03:16'),
(6, 'f84e638e-3cae-4ece-8def-744c4e3e0658', 'LINK', '2023-02-14 15:03:24', '2023-02-14 15:03:24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `uuid`, `category_name`, `createdAt`, `updatedAt`) VALUES
(2, '1348c78b-8a20-4ead-b403-e3931c655fcb', 'KACAMATA', '2023-02-13 16:31:15', '2023-02-14 11:44:25'),
(3, 'e2b65516-bbaa-4a6e-80c5-234f681f02c1', 'LENSA', '2023-02-14 14:13:09', '2023-02-14 14:13:09'),
(5, 'a78ae6cd-2b9c-4cb3-a7be-3f279f252bda', 'sarung', '2023-02-24 01:10:04', '2023-02-24 01:10:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `kdCustomer` varchar(100) NOT NULL,
  `customer_name` varchar(150) NOT NULL,
  `no_hp` varchar(20) NOT NULL,
  `alamat` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `customer`
--

INSERT INTO `customer` (`id`, `uuid`, `kdCustomer`, `customer_name`, `no_hp`, `alamat`, `createdAt`, `updatedAt`) VALUES
(1, 'b82f12a1-8de1-43db-9dbd-0be045f77b39', 'C-000001', 'Rahmat', '0812341567832', 'Jl. Jend. Sudirman', '2023-02-14 14:22:15', '2023-02-14 14:22:15'),
(3, '32bd18ee-3732-4641-8ff0-6aa85d817e21', 'C-000003', 'Fariz', '0812341565854', 'Jl. Cemara', '2023-02-14 14:25:06', '2023-02-14 14:25:06'),
(4, 'fa8ff8fe-f960-424f-aba6-3f55ca7904f7', 'C-000004', 'Muharis', '0822', 'jln. alamat', '2023-02-19 14:44:08', '2023-02-19 14:44:08'),
(5, '5ed2cc01-986c-421c-b77a-0010d32a4c95', 'C-000005', 'Muharis 23', '0811', 'jln bla balasdasd', '2023-02-21 20:50:22', '2023-02-25 12:21:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kwitansi`
--

CREATE TABLE `kwitansi` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `kwitansi_code` varchar(100) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `employee` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kwitansi`
--

INSERT INTO `kwitansi` (`id`, `uuid`, `kwitansi_code`, `amount`, `price`, `employee`, `createdAt`, `updatedAt`) VALUES
(1, '29fab6c4-650f-4350-bc03-babe46a8308c', 'KWI/00001/02/2023', 50000, 5000, 'Kasir', '2023-02-14 16:25:19', '2023-02-14 16:25:19'),
(4, 'd2e4dd4a-8077-4ff8-a64e-730d84a2bfd2', 'KWI/00002/02/2023', 500000, 15000, 'Kasir', '2023-02-14 16:27:22', '2023-02-14 16:27:22'),
(5, '76669c83-888a-4ec6-bc01-98b396e713f0', 'KWI/00003/02/2023', 500000, 15000, 'Admin', '2023-02-14 16:30:03', '2023-02-14 16:30:03'),
(7, '56e0dbdb-943d-4e40-87cd-051cbb660b5e', 'KWI/00005/02/2023', 500000, 15000, 'Kasir C', '2023-02-14 16:32:27', '2023-02-14 16:32:27'),
(8, 'cda4ac76-04ba-4312-b8c9-ce418ec3ea17', 'KWI/00001/03/2023', 500000, 15000, 'Kasir CE', '2023-02-14 16:33:50', '2023-02-14 16:33:50'),
(9, '554a6db2-f5d3-45db-8335-f42fe0831372', 'KWI/00006/02/2023', 2323, 2222, 'asdasdasd', '2023-02-24 01:49:46', '2023-02-24 01:49:46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengeluaran`
--

CREATE TABLE `pengeluaran` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `jenis_pengeluaran` varchar(100) NOT NULL,
  `amount` int(11) NOT NULL,
  `keterangan` text NOT NULL,
  `employee` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pengeluaran`
--

INSERT INTO `pengeluaran` (`id`, `uuid`, `jenis_pengeluaran`, `amount`, `keterangan`, `employee`, `createdAt`, `updatedAt`) VALUES
(1, '0ec69ba3-ee5a-408e-a22e-fea6ea4377c0', 'Minuman', 10000, 'Bayar Minum', 'Kasir A', '2023-02-28 19:19:13', '2023-02-18 12:38:44'),
(5, 'd96c6c6b-7cb5-48a2-af9b-a0769ecf16df', 'adasd', 2222, 'asdasd', 'asdasdasd', '2023-02-28 19:19:13', '2023-02-24 01:42:07');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `productCode` varchar(100) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `uom` enum('buah') NOT NULL,
  `capital_price` double NOT NULL,
  `price` double NOT NULL,
  `stock` int(11) NOT NULL,
  `min_stock` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id`, `uuid`, `productCode`, `product_name`, `uom`, `capital_price`, `price`, `stock`, `min_stock`, `categoryId`, `serial_number`, `createdAt`, `updatedAt`) VALUES
(1, 'c063a22a-4420-49a8-81e9-0114e125c73f', 'BR0000001', 'LENSA HITAM LS-100', 'buah', 5000, 8000, 100, 5, 1, 'LENSA', '2023-02-13 14:37:57', '2023-02-24 01:12:22'),
(6, '0', 'BR0000004', 'KACAMATA BLACK-250', 'buah', 18000, 25000, 100, 5, 2, 'KACAMATA', '2023-02-13 15:14:08', '2023-02-13 15:14:08'),
(7, 'd606bcf6-fd03-4904-b082-4e0a072a139d', 'BR0000005', 'KACAMATA BLACK-250', 'buah', 18000, 25000, 100, 5, 2, 'KACAMATA', '2023-02-13 15:15:09', '2023-02-13 15:15:09'),
(8, '86bfd31a-329a-4e30-9b3b-40a7aafe657e', 'BR0000006', 'KACAMATA BLACK-250', 'buah', 18000, 25000, 100, 5, 2, 'KACAMATA', '2023-02-13 15:15:18', '2023-02-13 15:15:18'),
(9, '988d965a-6182-4bf7-b750-fc6149a2a9c7', 'BR0000007', 'KACAMATA BLACK-250', 'buah', 18000, 25000, 97, 5, 2, 'KACAMATA', '2023-02-13 15:15:24', '2023-02-22 13:53:34'),
(10, 'ef4ed4e3-510c-4645-8465-5360f583a4ae', 'BR0000008', 'KACAMATA BLACK-250', 'buah', 18000, 25000, 99, 5, 2, 'KACAMATA', '2023-02-13 15:15:40', '2023-02-22 13:46:18'),
(12, '6eae14cb-dbd3-4ef0-9275-2d39322b89b5', 'BR0000010', 'KACAMATA BLACK-250', 'buah', 18000, 25000, 75, 5, 2, 'KACAMATA', '2023-02-13 15:15:42', '2023-02-22 13:55:37'),
(13, 'c1031057-35eb-4ff5-a067-19589222ef14', 'BR0000011', 'KACAMATA BLACK-250', 'buah', 18000, 25000, 104, 5, 2, 'KACAMATA', '2023-02-13 15:15:43', '2023-02-24 01:00:24'),
(14, '5cd2ca1a-b199-426c-b65b-e16481cb335f', 'BR0000012', 'Cairan Pembersih', 'buah', 2000, 25000, 101, 10, 5, '000222', '2023-02-19 15:37:17', '2023-02-24 01:15:24'),
(15, 'f8239975-0f3d-44c3-a1f4-0672a19bab04', 'BR0000013', 'Tempat Kacamata', 'buah', 0, 0, 98, 10, 1, '000223', '2023-02-19 16:06:08', '2023-02-22 14:14:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `supplier_name` varchar(200) NOT NULL,
  `supplier_address` text NOT NULL,
  `supplier_phone` varchar(15) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `supplier`
--

INSERT INTO `supplier` (`id`, `uuid`, `supplier_name`, `supplier_address`, `supplier_phone`, `createdAt`, `updatedAt`) VALUES
(1, '86bfd31a-329a-4e30-9b3b-40a7aafe657e', 'CEMERLANG', 'MEDAN', '9000', '2023-02-15 15:23:52', '2023-02-24 01:09:16'),
(3, 'ebb830b1-fdee-47ec-a993-9584e426f360', 'TOKO ABC', 'MEDAN', '081234567890', '2023-02-23 11:38:23', '2023-02-23 11:38:23'),
(5, 'a5e2746b-b473-4718-9f1f-4a2199f520f5', 'Supplier Muharis', 'tebing tinggi', '0822', '2023-02-23 19:04:50', '2023-02-23 19:04:50'),
(6, '44a984c3-9959-4f48-b69a-9088d3e17182', 'supplier muharis 2', 'medan', '082222', '2023-02-23 19:05:58', '2023-02-23 19:05:58');

-- --------------------------------------------------------

--
-- Struktur dari tabel `token`
--

CREATE TABLE `token` (
  `id` int(11) NOT NULL,
  `uuid_admin` text NOT NULL,
  `token` text DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `token`
--

INSERT INTO `token` (`id`, `uuid_admin`, `token`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6ImE3MzFkMzY1LWM0NTYtNDFjOC04NGFkLTQ4YzgzNjllYWQ0ZSIsInVzZXJuYW1lIjoia2FzaXIiLCJwYXNzd29yZCI6ImM3OTExYWYzYWRiZDEyYTAzNWIyODk1NTZkOTY0NzBhIiwicm9sZSI6Imthc2lyIiwibmFtZSI6IktBU0lSIE5BTUEiLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTEzVDEzOjU5OjQzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAyLTEzVDEzOjU5OjQzLjAwMFoiLCJpYXQiOjE2NzY3NjkwMDh9.tszZBC5I3wcSQ9Awn7TT955V2Uba2f4hEjJBIPE_C1I', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6ImE3MzFkMzY1LWM0NTYtNDFjOC04NGFkLTQ4YzgzNjllYWQ0ZSIsInVzZXJuYW1lIjoia2FzaXIiLCJwYXNzd29yZCI6ImM3OTExYWYzYWRiZDEyYTAzNWIyODk1NTZkOTY0NzBhIiwicm9sZSI6Imthc2lyIiwibmFtZSI6IktBU0lSIE5BTUEiLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTEzVDEzOjU5OjQzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAyLTEzVDEzOjU5OjQzLjAwMFoiLCJpYXQiOjE2NzY3NjkwMDh9.XmPXF7mLboKruFZbtSD_LEY8XDKDOJ8HFqgzSWe0VLk', '2023-02-13 14:03:28', '2023-02-19 01:10:08'),
(2, '2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXVpZCI6IjQyMzU5NjYzLTk4ZmEtNGVhMy04OTAyLWRhZDIwNGVkNmJkYSIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IjIxMjMyZjI5N2E1N2E1YTc0Mzg5NGEwZTRhODAxZmMzIiwicm9sZSI6ImFkbWluIiwibmFtZSI6Ik11aGFyaXMiLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTIwIDIyOjM2OjA5IiwidXBkYXRlZEF0IjoiMjAyMy0wMi0yMCAyMjozNjowOSIsImlhdCI6MTY3NzU5ODE3Nn0.w8UOxLY3Z6SJFUT3PI0llhqs_s_A6LriJ-7B975OacI', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXVpZCI6IjQyMzU5NjYzLTk4ZmEtNGVhMy04OTAyLWRhZDIwNGVkNmJkYSIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IjIxMjMyZjI5N2E1N2E1YTc0Mzg5NGEwZTRhODAxZmMzIiwicm9sZSI6ImFkbWluIiwibmFtZSI6Ik11aGFyaXMiLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTIwIDIyOjM2OjA5IiwidXBkYXRlZEF0IjoiMjAyMy0wMi0yMCAyMjozNjowOSIsImlhdCI6MTY3NzU5ODE3Nn0.4dsrMxen3gLbx4BPDCUfusVrPiJ5Lx0KQ1UqEBk5-rA', '2023-02-20 22:36:34', '2023-02-28 22:29:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `no_faktur` varchar(100) NOT NULL,
  `transaksi_status` enum('COMPLETE','CANCEL','DP','CREDIT') NOT NULL,
  `total_transaksi` int(11) NOT NULL,
  `uang1` int(11) NOT NULL,
  `uang2` int(11) NOT NULL DEFAULT 0,
  `total_uang` int(11) NOT NULL,
  `customerId` varchar(100) NOT NULL,
  `payment_method1` varchar(100) NOT NULL,
  `payment_method2` varchar(100) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id`, `uuid`, `no_faktur`, `transaksi_status`, `total_transaksi`, `uang1`, `uang2`, `total_uang`, `customerId`, `payment_method1`, `payment_method2`, `discount`, `createdAt`, `updatedAt`, `notes`) VALUES
(50, '9cd0b4c3-2f13-417c-a724-201c06abc658', '20022023000001', 'CANCEL', 25000, 20000, 0, 20000, '3', 'Cash', 'Cash', 0, '2023-02-28 19:18:53', '2023-02-20 22:02:29', 'adasda'),
(51, '7e5287e0-08cd-4bf5-80f3-9e5e1618b194', '20022023000002', 'COMPLETE', 50000, 20000, 30000, 50000, '4', 'Cash', 'Cash', 0, '2023-02-28 19:18:53', '2023-02-20 01:33:01', 'adsasdasd'),
(52, 'ecd5dcac-2978-4dc1-9e32-274feb3ba685', '20022023000003', 'CANCEL', 125000, 0, 125000, 125000, '4', 'Cash', 'Cash', 0, '2023-02-28 19:18:53', '2023-02-20 22:24:46', 'adsasdad'),
(53, '7e4655f6-0829-4ffe-a781-e22dd11db1d8', '20022023000004', 'COMPLETE', 25000, 25000, 0, 25000, '', 'Cash', 'Cash', 0, '2023-02-28 19:18:53', '2023-02-20 01:38:06', 'aaaa'),
(54, '605663c5-dc4d-4a64-9a20-56f2d2bed82a', '20022023000005', 'COMPLETE', 0, 0, 0, 0, '', 'Cash', 'Cash', 0, '2023-02-28 19:18:53', '2023-02-20 01:41:52', ''),
(55, '9e241ac0-102f-4b75-ad98-320cd90f4737', '20022023000006', 'COMPLETE', 0, 0, 0, 0, '', 'Cash', 'Cash', 0, '2023-02-28 19:18:53', '2023-02-20 01:54:10', ''),
(56, 'b59b0cf7-9229-4288-a501-f27d0358f031', '20022023000007', 'COMPLETE', 0, 0, 0, 0, '', 'Cash', 'Cash', 0, '2023-02-28 19:18:53', '2023-02-20 01:54:49', ''),
(57, 'a357ea46-fd7d-47ba-8626-f98cb601ccb6', '21022023000001', 'CANCEL', 50000, 20000, 20000, 50000, '5', 'Cash', 'Debit', 0, '2023-02-28 19:18:53', '2023-02-21 20:52:26', 'asdasdasd'),
(58, 'fc025254-9859-4b52-bf07-dbb374bd98be', '22022023000001', 'DP', 25000, 5000, 0, 5000, '5', 'Cash', 'Cash', 0, '2023-02-28 19:18:53', '2023-02-22 13:46:18', 'asdasdasd'),
(59, 'ec917f42-d681-4c67-9c66-6e4c193ce6c3', '22022023000002', 'DP', 50000, 20000, 0, 20000, '4', 'Credit', 'Cash', 0, '2023-02-28 19:18:53', '2023-02-22 13:50:32', 'aaa'),
(60, 'cbb4fb12-539e-4e0e-9f36-7d928e0daa4e', '22022023000003', 'DP', 75000, 20000, 0, 20000, '5', 'Cash', 'Credit', 0, '2023-02-28 19:18:53', '2023-02-22 13:53:34', 'aaaaa transaksi'),
(61, '656e559a-06da-46ec-9a0e-d18429336b8b', '22022023000004', 'COMPLETE', 250000, 200000, 50000, 250000, '4', 'Cash', 'OVO', 0, '2023-02-28 19:18:53', '2023-02-22 13:55:58', 'aaa transaksi'),
(62, '3b109194-e0f0-48dd-881d-624d55c89f34', '22022023000005', 'COMPLETE', 50000, 20000, 30000, 50000, '3', 'DANA', 'GOPAY', 0, '2023-02-28 19:18:53', '2023-02-22 14:23:12', 'adsasdasd'),
(63, '299bfc6c-9009-49a7-be0c-15d0b3a2706e', '22022023000006', 'COMPLETE', 75000, 25000, 50000, 75000, '3', 'LINK', 'Credit', 0, '2023-02-28 19:18:53', '2023-02-24 00:00:00', 'aaaaa'),
(64, '299bfc6c-9009-49a7-be0c-15d0b3a2706easdsd', '22022023000007', 'COMPLETE', 75000, 25000, 50000, 75000, '3', 'LINK', 'Credit', 0, '2023-02-28 19:18:53', '2023-02-24 00:00:00', 'aaaaa');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi_cabang`
--

CREATE TABLE `transaksi_cabang` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `no_faktur` varchar(100) NOT NULL,
  `total_transaksi_cabang` int(11) NOT NULL,
  `uang1` int(11) NOT NULL,
  `uang2` int(11) NOT NULL,
  `uang_total` int(11) NOT NULL,
  `cabangId` int(11) NOT NULL,
  `payment_method1` varchar(100) NOT NULL,
  `payment_method2` varchar(100) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `surat_jalan` varchar(100) DEFAULT NULL,
  `transaksi_status` enum('COMPLETE','CANCEL','DP','KREDIT') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi_cabang`
--

INSERT INTO `transaksi_cabang` (`id`, `uuid`, `no_faktur`, `total_transaksi_cabang`, `uang1`, `uang2`, `uang_total`, `cabangId`, `payment_method1`, `payment_method2`, `discount`, `surat_jalan`, `transaksi_status`, `createdAt`, `updatedAt`, `notes`) VALUES
(1, 'dasdas', 'KD-000001', 10000, 10000, 0, 10000, 9, 'Cash', 'Debit', 0, 'SJ-12345', 'CANCEL', '2023-02-28 19:18:18', '2023-02-20 21:50:23', NULL),
(2, 'cff18d53-14a9-47dd-824e-7695ee827e06', '18022023000002', 25000, 25000, 0, 0, 1, 'CASH', '', 0, 'SJ18022023/02/2023/00001', 'CANCEL', '2023-02-28 19:18:18', '2023-02-20 21:59:13', NULL),
(3, '635dc7c2-4b27-40c5-93b0-fa509326670b', '18022023000003', 21000, 21000, 0, 0, 1, 'CASH', '', 0, 'SJ18022023/02/2023/00002', 'CANCEL', '2023-02-28 19:18:18', '2023-02-20 21:58:51', NULL),
(5, '85d01dae-030e-40d7-8370-147a494d573f', '22022023000001', 250000, 200000, 0, 200000, 10, 'CASH', 'CREDIT', 0, 'SJ22022023/02/2023/00003', 'KREDIT', '2023-02-28 19:18:18', '2023-02-22 12:24:07', 'aaaa transaksi'),
(6, 'e16fdc34-7655-4c42-9e90-5c1636ff2889', '22022023000002', 75000, 25000, 50000, 25000, 10, 'DANA', 'LINK', 0, 'SJ22022023/02/2023/00004', 'COMPLETE', '2023-02-28 19:18:18', '2023-02-22 14:28:45', 'asdasdasd'),
(7, '16e0acb1-17e5-42f6-8636-5bcbc9c9e90d', '22022023000003', 25000, 5000, 20000, 5000, 10, 'CASH', 'LINK', 0, 'SJ22022023/02/2023/00005', 'COMPLETE', '2023-02-28 19:18:18', '2023-02-22 14:27:52', 'adasdasd'),
(8, '79f593c3-08a5-468b-836f-dabc88520a3c', '22022023000004', 50000, 40000, 10000, 40000, 10, 'CREDIT', 'GOPAY', 0, 'SJ22022023/02/2023/00006', 'COMPLETE', '2023-02-28 19:18:18', '2023-02-22 14:07:46', 'adasdad');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi_cabang_detail`
--

CREATE TABLE `transaksi_cabang_detail` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `transaksiCabangId` varchar(100) NOT NULL,
  `productId` varchar(100) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `subtotal` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi_cabang_detail`
--

INSERT INTO `transaksi_cabang_detail` (`id`, `uuid`, `transaksiCabangId`, `productId`, `qty`, `price`, `discount`, `subtotal`, `createdAt`, `updatedAt`, `notes`) VALUES
(1, 'asdadasd', '1', '1', 1, 123131, 0, 123131, '2023-02-28 19:09:24', '2023-02-20 11:39:46', NULL),
(2, '650cd4c1-aea4-4a4e-8dca-4125de6ee0a5', '5', '12', 11, 25000, 0, 250000, '2023-02-28 19:09:24', '2023-02-22 12:24:07', 'adasd'),
(3, 'ac20aae3-090b-457a-a838-28427bae093a', '6', '12', 3, 25000, 0, 75000, '2023-02-28 19:09:24', '2023-02-22 12:28:59', 'asdad product'),
(4, '85a3192e-896d-423e-ab7f-983d1760a62e', '7', '12', 1, 25000, 0, 25000, '2023-02-28 19:09:24', '2023-02-22 13:30:04', 'aaa product'),
(5, '91789aef-3c85-4bcd-9587-33ac430a9d7d', '8', '13', 2, 25000, 0, 50000, '2023-02-28 19:09:24', '2023-02-22 13:32:00', 'asdasda');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi_detail`
--

CREATE TABLE `transaksi_detail` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `transaksiId` varchar(100) NOT NULL,
  `productId` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `subtotal` int(11) NOT NULL,
  `notes` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi_detail`
--

INSERT INTO `transaksi_detail` (`id`, `uuid`, `transaksiId`, `productId`, `price`, `qty`, `discount`, `subtotal`, `notes`, `createdAt`, `updatedAt`) VALUES
(23, '82b48bac-7220-4095-8b9d-df8fcaec46f4', '50', '14', 0, 1, 0, 0, '-', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(24, '051fb607-5536-4a76-bcfe-f55aa78df32d', '50', '13', 25000, 1, 0, 25000, 'asdasd', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(25, '3884ad88-fe04-4d31-9fc3-022c41359e97', '51', '15', 0, 1, 0, 0, '-', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(26, '6cf5c1b5-5061-4c2c-bd97-6ae7cc1122a4', '51', '13', 25000, 2, 0, 50000, 'asdasd', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(27, 'da580c28-3ef7-4895-b70e-7ce25e45881f', '52', '13', 25000, 5, 0, 125000, 'asdasdasd', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(28, '0c3d474a-9b96-4184-930b-a4ede176a53a', '52', '15', 0, 1, 0, 0, '-', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(29, '4ad8eab5-a14d-47fd-8c3e-3e8f528ed6e6', '53', '13', 25000, 1, 0, 25000, 'adsasd', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(31, '7cb66773-7894-4af3-91e0-c1bfc7652b87', '57', '12', 25000, 2, 0, 50000, '100', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(32, 'b3869562-c16a-451e-a875-d73205294a23', '57', '14', 0, 1, 0, 0, '-', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(33, '150ab136-ed07-44ac-b0a4-a560f19db2ed', '57', '15', 0, 1, 0, 0, '-', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(34, '2dc57321-3294-4dd9-93ec-6f3850b0761a', '58', '15', 0, 1, 0, 0, '-', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(35, 'dccac029-50a0-4faa-b7be-2533a66ff700', '58', '10', 25000, 1, 0, 25000, 'aaa product', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(36, '81bb824f-9703-4df9-b68c-068a58c809b7', '59', '12', 25000, 2, 0, 50000, 'aaaa produk', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(37, 'd3b58cff-90dd-41a8-a61e-733fa8c54a86', '59', '15', 0, 1, 0, 0, '-', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(38, 'b0d1bbf0-a654-4e3e-a036-b06a71fed10e', '60', '9', 25000, 3, 0, 75000, 'aaa product', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(39, '1a5776be-7a24-43db-8a3b-988eac2e975d', '60', '14', 0, 1, 0, 0, '-', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(40, '3423b0c5-1adb-4af1-9f2a-919bd9b80c22', '61', '12', 25000, 10, 0, 250000, 'aaaaaa', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(41, '77b761a9-7ca5-4441-87bc-35e3c925ebab', '61', '15', 0, 1, 0, 0, '-', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(42, 'e9709d34-d5ef-48c3-b025-47ff1c4b3b11', '62', '14', 0, 1, 0, 0, '-', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(43, '6d24ff67-39cf-40a7-886e-c56e1ecf83f4', '62', '13', 25000, 2, 0, 50000, 'aaa product', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(44, '703c5ae4-8946-4ea1-b95d-306c3686cc24', '63', '13', 25000, 3, 0, 75000, 'asdasd', '2023-02-28 19:16:19', '0000-00-00 00:00:00'),
(45, '9c693f3a-265d-4b4e-8f52-361b80ac7c99', '63', '15', 0, 1, 0, 0, '-', '2023-02-28 19:16:19', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `beli`
--
ALTER TABLE `beli`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `no_faktur_beli` (`no_faktur_beli`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `beli_detail`
--
ALTER TABLE `beli_detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `broken_product`
--
ALTER TABLE `broken_product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `productCode` (`productCode`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `broken_product_2`
--
ALTER TABLE `broken_product_2`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `cabang`
--
ALTER TABLE `cabang`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `cara_bayar`
--
ALTER TABLE `cara_bayar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cara_bayar_name` (`cara_bayar_name`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_name` (`category_name`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kdCustomer` (`kdCustomer`);

--
-- Indeks untuk tabel `kwitansi`
--
ALTER TABLE `kwitansi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kwitansi_code` (`kwitansi_code`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `pengeluaran`
--
ALTER TABLE `pengeluaran`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `jenis_pengeluaran` (`jenis_pengeluaran`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_code` (`productCode`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `supplier_name` (`supplier_name`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid_admin` (`uuid_admin`) USING HASH;

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `no_faktur` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_2` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_3` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_4` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_5` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_6` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_7` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_8` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_9` (`no_faktur`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_2` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_3` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_4` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_5` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_6` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_7` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_8` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_9` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `transaksi_cabang`
--
ALTER TABLE `transaksi_cabang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `no_faktur` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_2` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_3` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_4` (`no_faktur`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_2` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_3` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_4` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `transaksi_cabang_detail`
--
ALTER TABLE `transaksi_cabang_detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_2` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_2` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_3` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_4` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_5` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_6` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_7` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_8` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_9` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_10` (`uuid`) USING HASH,
  ADD UNIQUE KEY `uuid_11` (`uuid`) USING HASH;

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `beli`
--
ALTER TABLE `beli`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `beli_detail`
--
ALTER TABLE `beli_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `broken_product`
--
ALTER TABLE `broken_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `broken_product_2`
--
ALTER TABLE `broken_product_2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `cabang`
--
ALTER TABLE `cabang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `cara_bayar`
--
ALTER TABLE `cara_bayar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `kwitansi`
--
ALTER TABLE `kwitansi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `pengeluaran`
--
ALTER TABLE `pengeluaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT untuk tabel `transaksi_cabang`
--
ALTER TABLE `transaksi_cabang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `transaksi_cabang_detail`
--
ALTER TABLE `transaksi_cabang_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
