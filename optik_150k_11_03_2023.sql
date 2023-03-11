-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Mar 2023 pada 07.44
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
(2, '42359663-98fa-4ea3-8902-dad204ed6bda', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', 'Muharis', '2023-02-20 22:36:09', '2023-02-20 22:36:09'),
(3, '18981180-5d94-4f19-9015-9aedcff94d25', 'kasir1', '4297f44b13955235245b2497399d7a93', 'kasir', 'rahmat', '2023-03-10 20:28:06', '2023-03-10 20:28:35'),
(7, '711e6d73-f15d-449c-9a1a-41b2ca1c5ef4', 'penjualan', '13bf2c8effae21d17a277520aa9b9277', 'penjualan', 'penjualan', '2023-03-10 23:57:03', '2023-03-10 23:57:03'),
(8, '6c41442e-d740-4c57-9ed5-2d14a7fe9bb6', 'pembelian', '025b94c9e65037bb7317c8e25389155d', 'pembelian', 'pembelian', '2023-03-11 00:01:49', '2023-03-11 00:01:49');

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
  `transaksi_status` enum('COMPLETE','CANCEL','DP','KREDIT','CREDIT') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `beli`
--
ALTER TABLE `beli`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `beli_detail`
--
ALTER TABLE `beli_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `broken_product`
--
ALTER TABLE `broken_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `broken_product_2`
--
ALTER TABLE `broken_product_2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `cabang`
--
ALTER TABLE `cabang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `cara_bayar`
--
ALTER TABLE `cara_bayar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kwitansi`
--
ALTER TABLE `kwitansi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pengeluaran`
--
ALTER TABLE `pengeluaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `token`
--
ALTER TABLE `token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `transaksi_cabang`
--
ALTER TABLE `transaksi_cabang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `transaksi_cabang_detail`
--
ALTER TABLE `transaksi_cabang_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
