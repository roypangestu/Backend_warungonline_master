import produkModels from "../models/produkModels.js";
import path from "path";
import bcrypt from "bcryptjs";
import { table } from "console";

export const getAllData = async (req, res) => {
  const data = await produkModels.findAndCountAll();
  res.status(200).json({
    message: "QUERY ALL DATA SUCCESS",
    data,
  });
};

export const getDataById = async (req, res) => {
  const result = await produkModels.findByPk(req.params.id);
  if (result == null) {
    res.status(400).json(`ID not found in database`);
  } else {
    res.json(result);
  }
};

export const insertData = async (req, res) => {
  try {
    //function menampilkan message ketika gagal
    const messageGagal = (status, msg) =>
      res.status(status).json({ status: status, message: msg });

    // inputan client
    const {
      NamaProduk,
      HargaProduk,
      DeskripsiProduk,
      DiskonProduk,
      SubtotalProduk,
      StokProduk,
      KodeProduk,
      JumlahpembeliProduk,
      KategoriProduk,
      PembuatProduk,
    } = req.body;

    // if(diskonProduk > 100) return messageGagal(400, "Diskon harus dibawah 100")
    // if (namaProduk.length < 10 || namaProduk.length > 255)
    //   return messageGagal(
    //     400,
    //     "Nama Produk minimal 10 karakter dan maksimal 255 karakter"
    //   );

    // jika tidak ada file gambar
    if (!req.files) return messageGagal(400, "File gambar tidak ditemukan");

    // format nama gambar gambarThumbnail, gambarSatu, gambarDua
    const gambar_produk = {
      thumbnail: null, //key gambar thumbnail
      gambar: [],
    };

    for (let fileGambar in req.files) {
      // format nama gambar gambarThumbnail, gambarSatu, gambarDua
      let file = req.files[fileGambar];
      console.log(file);
      if (file.length > 1) {
        file = file[0];
      } else {
        file = file;
      }
      // jika tidak ada file gambar
      if (!file) return messageGagal(400, "File Gambar harus ada 3");

      // handle extension file
      const fileExt = path.extname(file.name.toString()).toLowerCase();
      const allowExt = [".png", ".jpg", ".jpeg"];
      if (!allowExt.includes(fileExt))
        return messageGagal(400, "File harus berupa gambar (png, jpg, jpeg).");

      //handle ukuran gambar berupa 5mb
      const ukuran = 5000000;
      if (file.data.length > ukuran)
        return messageGagal(400, "File gambar maximal 5mb");

      //handle hashName
      const fileName = file.name.split(".")[0];
      const hashFileName =
        bcrypt.hashSync(fileName, 6).replace(/[/]/g, "") + fileExt;
      //menyalin file ko folder public/image
      file.mv("./public/image/" + hashFileName);

      // handle lokasi file gambar
      const urlGambar = () =>
        req.protocol +
        "://" +
        req.get("host") +
        "/public/image/" +
        hashFileName;
      if (fileGambar == "GambarThumbnail") {
        gambar_produk["thumbnail"] = urlGambar(); //gambar thumbnail
      } else {
        gambar_produk["gambar"].push(urlGambar()); //gambar
      }
    }

    console.log(gambar_produk);
    const data = {
      namaProduk: NamaProduk,
      hargaProduk: HargaProduk,
      deskripsiProduk: DeskripsiProduk,
      diskonProduk: DiskonProduk,
      subtotalProduk: SubtotalProduk,
      stokProduk: StokProduk,
      gambarProduk: gambar_produk,
      kodeProduk: KodeProduk,
      kategoriProduk: KategoriProduk,
      pembuatProduk: PembuatProduk,
    };

    // memasukkan ke database
    await produkModels.create(data);
    res.status(200).json({
      status: 200,
      message: "INSERT DATA SUCCESS",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Insert Data Gagal",
      message_error: error.message,
    });
  }
};

//EDIT DATA
export const editData = async (req, res) => {
  try {
    //function menampilkan message ketika gagal
    const messageGagal = (status, msg) =>
      res.status(status).json({ status: status, message: msg });

    // inputan client
    const {
      NamaProduk,
      HargaProduk,
      DeskripsiProduk,
      DiskonProduk,
      SubtotalProduk,
      StokProduk,
      KodeProduk,
      JumlahpembeliProduk,
      KategoriProduk,
      PembuatProduk,
    } = req.body;

    // if(diskonProduk > 100) return messageGagal(400, "Diskon harus dibawah 100")
    // if (namaProduk.length < 10 || namaProduk.length > 255)
    //   return messageGagal(
    //     400,
    //     "Nama Produk minimal 10 karakter dan maksimal 255 karakter"
    //   );

    // jika tidak ada file gambar
    if (!req.files) return messageGagal(400, "File gambar tidak ditemukan");

    // format nama gambar gambarThumbnail, gambarSatu, gambarDua
    const gambar_produk = {
      thumbnail: null, //key gambar thumbnail
      gambar: [], //key gb.1 & gb.2
    };

    for (let fileGambar in req.files) {
      // format nama gambar gambarThumbnail, gambarSatu, gambarDua
      let file = req.files[fileGambar];
      console.log(file);
      if (file.length > 1) {
        file = file[0];
      } else {
        file = file;
      }
      // jika tidak ada file gambar
      if (!file) return messageGagal(400, "File Gambar harus ada 3");

      // handle extension file
      const fileExt = path.extname(file.name.toString()).toLowerCase();
      const allowExt = [".png", ".jpg", ".jpeg"];
      if (!allowExt.includes(fileExt))
        return messageGagal(400, "File harus berupa gambar (png, jpg, jpeg).");

      //handle ukuran gambar berupa 5mb
      const ukuran = 5000000;
      if (file.data.length > ukuran)
        return messageGagal(400, "File gambar maximal 5mb");

      //handle hashName
      const fileName = file.name.split(".")[0];
      const hashFileName =
        bcrypt.hashSync(fileName, 6).replace(/[/]/g, "") + fileExt;
      //menyalin file ko folder public/image
      file.mv("./public/image/" + hashFileName);

      // handle lokasi file gambar
      const urlGambar = () =>
        req.protocol +
        "://" +
        req.get("host") +
        "/public/image/" +
        hashFileName;
      if (fileGambar == "GambarThumbnail") {
        gambar_produk["thumbnail"] = urlGambar(); //gambar thumbnail
      } else {
        gambar_produk["gambar"].push(urlGambar()); //gambar
      }
    }

    console.log(gambar_produk);
    const data = {
      namaProduk: NamaProduk,
      hargaProduk: HargaProduk,
      deskripsiProduk: DeskripsiProduk,
      diskonProduk: DiskonProduk,
      subtotalProduk: SubtotalProduk,
      stokProduk: StokProduk,
      gambarProduk: gambar_produk,
      kodeProduk: KodeProduk,
      kategoriProduk: KategoriProduk,
      pembuatProduk: PembuatProduk,
    };

    // memasukkan ke database
    await produkModels.update(data, { where: { id: req.params.id } });
    res.status(200).json({
      status: 200,
      message: "UPDATE DATA SUCCESS",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Insert Data Gagal",
      message_error: error.message,
    });
  }
};

//HAPUS PRODUK
export const deleteData = async (req, res) => {
  try {
    await produkModels.destroy({ where: { id: req.params.id } });
    res.json("produk berhasil dihapus");
  } catch (error) {
    res.status(400).json(error.message);
  }
};
