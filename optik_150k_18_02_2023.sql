-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 18 Feb 2023 pada 17.41
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
(1, 'a731d365-c456-41c8-84ad-48c8369ead4e', 'kasir', 'c7911af3adbd12a035b289556d96470a', 'kasir', 'KASIR NAMA', '2023-02-13 13:59:43', '2023-02-13 13:59:43');

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
(9, 'eaa5a3b5-2a6b-492a-87eb-4bedf8bcc693', 'BI-0000005', '2023-02-15 13:00:00', 2, '2023-02-18 13:34:10', '2023-02-18 13:35:21');

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
(1, 'dasdas', '1', '1', 10000, 1, 10000, '2023-02-18 12:56:09', '2023-02-18 12:56:09'),
(2, 'sadad', '1', '7', 12000, 1, 12000, '2023-02-18 12:56:09', '2023-02-18 12:56:09');

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
(2, 'f54b0ba9-c55b-4763-9ecc-e9590a841aef', '6', 1, 'Barang Rusak, Diganti', '2023-02-18 13:01:19', '2023-02-18 13:01:19');

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
(9, 'a48535d6-018b-4f7b-b265-bf24af727df9', 'CABANG G', 'Jl. AR. HAKIM', '2023-02-14 14:15:12', '2023-02-14 14:15:12');

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
(3, 'e2b65516-bbaa-4a6e-80c5-234f681f02c1', 'LENSA', '2023-02-14 14:13:09', '2023-02-14 14:13:09');

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
(3, '32bd18ee-3732-4641-8ff0-6aa85d817e21', 'C-000003', 'Fariz', '0812341565854', 'Jl. Cemara', '2023-02-14 14:25:06', '2023-02-14 14:25:06');

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
(8, 'cda4ac76-04ba-4312-b8c9-ce418ec3ea17', 'KWI/00001/03/2023', 500000, 15000, 'Kasir CE', '2023-02-14 16:33:50', '2023-02-14 16:33:50');

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
(1, '0ec69ba3-ee5a-408e-a22e-fea6ea4377c0', 'Minuman', 10000, 'Bayar Minum', 'Kasir A', '2023-02-18 12:38:44', '2023-02-18 12:38:44');

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
(1, 'c063a22a-4420-49a8-81e9-0114e125c73f', 'BR0000001', 'LENSA HITAM LS-100', 'buah', 5000, 8000, 100, 5, 1, 'LENSA', '2023-02-13 14:37:57', '2023-02-13 16:16:08'),
(6, '0', 'BR0000004', 'KACAMATA BLACK-250', 'buah', 18000, 25000, 100, 5, 2, 'KACAMATA', '2023-02-13 15:14:08', '2023-02-13 15:14:08'),
(7, 'd606bcf6-fd03-4904-b082-4e0a072a139d', 'BR0000005', 'KACAMATA BLACK-250', 'buah', 18000, 25000, 100, 5, 2, 'KACAMATA', '2023-02-13 15:15:09', '2023-02-13 15:15:09'),
(8, '86bfd31a-329a-4e30-9b3b-40a7aafe657e', 'BR0000006', 'KACAMATA BLACK-250', 'buah', 18000, 25000, 100, 5, 2, 'KACAMATA', '2023-02-13 15:15:18', '2023-02-13 15:15:18'),
(9, '988d965a-6182-4bf7-b750-fc6149a2a9c7', 'BR0000007', 'KACAMATA BLACK-250', 'buah', 18000, 25000, 100, 5, 2, 'KACAMATA', '2023-02-13 15:15:24', '2023-02-13 15:15:24'),
(10, 'ef4ed4e3-510c-4645-8465-5360f583a4ae', 'BR0000008', 'KACAMATA BLACK-250', 'buah', 18000, 25000, 100, 5, 2, 'KACAMATA', '2023-02-13 15:15:40', '2023-02-13 15:15:40'),
(12, '6eae14cb-dbd3-4ef0-9275-2d39322b89b5', 'BR0000010', 'KACAMATA BLACK-250', 'buah', 18000, 25000, 100, 5, 2, 'KACAMATA', '2023-02-13 15:15:42', '2023-02-13 15:15:42'),
(13, 'c1031057-35eb-4ff5-a067-19589222ef14', 'BR0000011', 'KACAMATA BLACK-250', 'buah', 18000, 25000, 100, 5, 2, 'KACAMATA', '2023-02-13 15:15:43', '2023-02-13 15:15:43');

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
(1, '86bfd31a-329a-4e30-9b3b-40a7aafe657e', 'CEMERLANG', 'MEDAN', '-', '2023-02-15 15:23:52', '2023-02-15 15:23:52');

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
(1, '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6ImE3MzFkMzY1LWM0NTYtNDFjOC04NGFkLTQ4YzgzNjllYWQ0ZSIsInVzZXJuYW1lIjoia2FzaXIiLCJwYXNzd29yZCI6ImM3OTExYWYzYWRiZDEyYTAzNWIyODk1NTZkOTY0NzBhIiwicm9sZSI6Imthc2lyIiwibmFtZSI6IktBU0lSIE5BTUEiLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTEzVDEzOjU5OjQzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAyLTEzVDEzOjU5OjQzLjAwMFoiLCJpYXQiOjE2NzYyOTcwMDh9.xMw-sOY49-d_8j4kBwwiVUrJRN5CKfjLxgEtKZ1juzY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6ImE3MzFkMzY1LWM0NTYtNDFjOC04NGFkLTQ4YzgzNjllYWQ0ZSIsInVzZXJuYW1lIjoia2FzaXIiLCJwYXNzd29yZCI6ImM3OTExYWYzYWRiZDEyYTAzNWIyODk1NTZkOTY0NzBhIiwicm9sZSI6Imthc2lyIiwibmFtZSI6IktBU0lSIE5BTUEiLCJjcmVhdGVkQXQiOiIyMDIzLTAyLTEzVDEzOjU5OjQzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAyLTEzVDEzOjU5OjQzLjAwMFoiLCJpYXQiOjE2NzYyOTcwMDh9.Nef01TVSL49hOgtxoppa83bkTW8yhL9SBwgx3Bejrvk', '2023-02-13 14:03:28', '2023-02-13 14:03:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int(11) NOT NULL,
  `uuid` text NOT NULL,
  `no_faktur` varchar(100) NOT NULL,
  `transaksi_status` enum('COMPLETE','CANCEL','DP','KREDIT') NOT NULL,
  `total_transaksi` int(11) NOT NULL,
  `uang1` int(11) NOT NULL,
  `uang2` int(11) NOT NULL DEFAULT 0,
  `total_uang` int(11) NOT NULL,
  `customerId` varchar(100) NOT NULL,
  `payment_method1` varchar(100) NOT NULL,
  `payment_method2` varchar(100) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id`, `uuid`, `no_faktur`, `transaksi_status`, `total_transaksi`, `uang1`, `uang2`, `total_uang`, `customerId`, `payment_method1`, `payment_method2`, `discount`, `createdAt`, `updatedAt`) VALUES
(2, '08241cc8-bc7f-4235-ab3b-84f8bd8bb51e', '17022023000002', 'COMPLETE', 12000, 12000, 0, 12000, '1', 'Cash', '', 0, '2023-02-17 00:00:00', '2023-02-18 15:03:05'),
(3, '009cd8c0-014c-4992-833e-ad36fb065196', '18022023000001', 'COMPLETE', 24000, 24000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:03:53', '2023-02-18 15:03:53'),
(4, '376b5fe3-6753-4442-9a76-1b87fe57cadd', '18022023000002', 'COMPLETE', 24000, 24000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:37:56', '2023-02-18 15:37:56'),
(5, '28362e07-2c0e-4a6f-9582-a6bec9878506', '18022023000003', 'COMPLETE', 24000, 24000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:39:15', '2023-02-18 15:39:15'),
(6, 'a3143d1b-ca73-4d7c-ba78-4f2212ca63a7', '18022023000004', 'COMPLETE', 24000, 24000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:40:48', '2023-02-18 15:40:48'),
(7, '5024ec59-645c-46cb-88e5-67dba21fdf32', '18022023000005', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:42:29', '2023-02-18 15:42:29'),
(8, 'ed0c006b-5444-4b1b-92dc-bd212a30f3a7', '18022023000006', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:44:30', '2023-02-18 15:44:30'),
(9, '35098ec5-15d1-4e67-a2ca-8be45e09550c', '18022023000007', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:45:21', '2023-02-18 15:45:21'),
(10, '4759afb5-2a06-4d74-ad3d-22f222329a0c', '18022023000008', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:45:29', '2023-02-18 15:45:29'),
(11, '8b90571e-aa70-428e-afc4-f9f681095156', '18022023000009', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:45:44', '2023-02-18 15:45:44'),
(12, 'efcc8c7f-a4d9-4fdd-8146-bac33af5efdc', '18022023000010', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:45:50', '2023-02-18 15:45:50'),
(13, 'b52b2aa4-eff4-4c7e-b4df-82d4360ef9a6', '18022023000011', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:45:55', '2023-02-18 15:45:55'),
(14, '38732f3b-8290-4878-81ea-077fdbd67aa0', '18022023000012', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:46:26', '2023-02-18 15:46:26'),
(15, '1b7d95fb-2040-4e01-b759-a523e1c9a027', '18022023000013', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:46:35', '2023-02-18 15:46:35'),
(16, 'b6cce275-f1ee-488b-8d85-20f4b6d1b4ab', '18022023000014', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:46:49', '2023-02-18 15:46:49'),
(17, 'daced916-fbc0-4cfd-bc6b-953ceebb96ea', '18022023000015', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:47:11', '2023-02-18 15:47:11'),
(18, '1fa5f752-b75f-40ac-98ae-6a0cfa2c704e', '18022023000016', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:47:15', '2023-02-18 15:47:15'),
(19, 'bc5ecc70-0dac-4b00-9390-222660c6909a', '18022023000017', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:47:21', '2023-02-18 15:47:21'),
(20, 'e9188a99-ef3e-4db3-a9d3-d4047aafc901', '18022023000018', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:47:33', '2023-02-18 15:47:33'),
(21, '0d263ca2-8253-4e53-b218-0f399df37e2a', '18022023000019', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:47:51', '2023-02-18 15:47:51'),
(22, '3eb30513-8c12-485f-b04a-900e32a9d9bb', '18022023000020', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:48:32', '2023-02-18 15:48:32'),
(23, '6b1b760b-91bb-4d33-9aae-f4803db88a17', '18022023000021', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:55:17', '2023-02-18 15:55:17'),
(24, '863e341c-23cb-4bc9-a923-0ea98647bfdf', '18022023000022', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:55:34', '2023-02-18 15:55:34'),
(25, '3dfacae3-5389-4f7f-a063-8338420f2b11', '18022023000023', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:55:58', '2023-02-18 15:55:58'),
(26, '8b1b47e4-06c9-43b0-9031-bde63c7300c0', '18022023000024', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:56:15', '2023-02-18 15:56:15'),
(27, 'ec0be3e8-1882-457b-805c-fddd809a6b8a', '18022023000025', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:56:47', '2023-02-18 15:56:47'),
(28, '49062fe5-5aa6-48c0-b062-de86aabb6a25', '18022023000026', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:56:58', '2023-02-18 15:56:58'),
(29, 'd2e4cd9c-8756-4d3d-ba46-74486bd8f0f9', '18022023000027', 'COMPLETE', 24000, 25000, 0, 24000, '1', 'Cash', '', 0, '2023-02-18 15:57:11', '2023-02-18 15:57:11');

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
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi_cabang`
--

INSERT INTO `transaksi_cabang` (`id`, `uuid`, `no_faktur`, `total_transaksi_cabang`, `uang1`, `uang2`, `uang_total`, `cabangId`, `payment_method1`, `payment_method2`, `discount`, `surat_jalan`, `transaksi_status`, `createdAt`, `updatedAt`) VALUES
(1, 'dasdas', 'KD-000001', 10000, 10000, 0, 10000, 1, 'Cash', NULL, 0, 'SJ-12345', 'KREDIT', '2023-02-18 11:48:16', '2023-02-18 11:48:16'),
(2, 'cff18d53-14a9-47dd-824e-7695ee827e06', '18022023000002', 25000, 25000, 0, 0, 1, 'CASH', '', 0, 'SJ18022023/02/2023/00001', 'KREDIT', '2023-02-18 16:28:05', '2023-02-18 16:28:05'),
(3, '635dc7c2-4b27-40c5-93b0-fa509326670b', '18022023000003', 21000, 21000, 0, 0, 1, 'CASH', '', 0, 'SJ18022023/02/2023/00002', 'KREDIT', '2023-02-18 16:29:15', '2023-02-18 16:29:15');

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
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi_detail`
--

INSERT INTO `transaksi_detail` (`id`, `uuid`, `transaksiId`, `productId`, `price`, `qty`, `discount`, `subtotal`, `createdAt`, `updatedAt`) VALUES
(1, 'asdasdas', '1', '1', 10000, 1, 0, 10000, '2023-02-18 09:50:25', '2023-02-18 09:50:25'),
(2, 'asdasdasss', '1', '6', 10000, 1, 0, 10000, '2023-02-18 09:50:25', '2023-02-18 09:50:25'),
(3, '0c11f04f-82f1-49ca-a024-99b0cfe1f21f', '20', '6', 11000, 1, 0, 11000, '2023-02-18 15:47:33', '2023-02-18 15:47:33'),
(4, '7bb13b73-27f1-4435-b83b-67d752f16522', '20', '1', 2000, 1, 0, 2000, '2023-02-18 15:47:33', '2023-02-18 15:47:33'),
(5, '2c577920-d951-4e9e-814a-1d34091a2721', '21', '1', 1000, 1, 0, 1000, '2023-02-18 15:47:51', '2023-02-18 15:47:51'),
(6, '092543be-7b4c-48d5-96e1-1ebb41b4baa2', '21', '1', 2000, 1, 0, 2000, '2023-02-18 15:47:51', '2023-02-18 15:47:51'),
(7, '05752287-c55f-42ca-805f-67f6f2e53ce8', '21', '6', 11000, 1, 0, 11000, '2023-02-18 15:47:51', '2023-02-18 15:47:51'),
(8, '0887ce88-1310-47a7-9908-02eebdd2d65e', '22', '1', 1000, 1, 0, 1000, '2023-02-18 15:48:32', '2023-02-18 15:48:32'),
(9, 'ca01c470-3896-422e-b196-be2d89258033', '22', '1', 2000, 1, 0, 2000, '2023-02-18 15:48:32', '2023-02-18 15:48:32'),
(10, '2f94b5ff-e2e4-403f-8ab5-9ca98085b04f', '22', '6', 11000, 1, 0, 11000, '2023-02-18 15:48:32', '2023-02-18 15:48:32');

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
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `transaksi_cabang`
--
ALTER TABLE `transaksi_cabang`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `no_faktur` (`no_faktur`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `transaksi_cabang_detail`
--
ALTER TABLE `transaksi_cabang_detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- Indeks untuk tabel `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`) USING HASH;

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `beli`
--
ALTER TABLE `beli`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `beli_detail`
--
ALTER TABLE `beli_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `broken_product`
--
ALTER TABLE `broken_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `broken_product_2`
--
ALTER TABLE `broken_product_2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `cabang`
--
ALTER TABLE `cabang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `cara_bayar`
--
ALTER TABLE `cara_bayar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `kwitansi`
--
ALTER TABLE `kwitansi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `pengeluaran`
--
ALTER TABLE `pengeluaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT untuk tabel `transaksi_cabang`
--
ALTER TABLE `transaksi_cabang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `transaksi_cabang_detail`
--
ALTER TABLE `transaksi_cabang_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
