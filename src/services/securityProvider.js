const CryptoJS = require("crypto-js");
require("dotenv").config();
const salt = process.env.SALT;

class Security {
  // ESTO ES PARA ENCRIPTAR 
  //PRIMER PARAMETRO: TEXTO A ENCRIPTAR
  //SEGUNDO PARAMETRO: CLAVE/CONTRASEÑA
  //ESTO NOS DEVUELVE POR LO TANTO, EL TEXTO YA ENCRIPTADO (LA CONTRASEÑA ENCRIPTADA)
  encryptData(dataToEncrypt) {
    return CryptoJS.AES.encrypt(dataToEncrypt, salt).toString();
  }

  //ESTO ES PARA DESENCRIPTAR
  //PRIMER PARAMETRO: TEXTO A DESENCRIPTAR
  //SEGUNDO PARAMETRO: CLAVE/CONTRASEÑA (TIENE QUE SER LA MISMA QUE PARA ENCRIPTAR)
  // EN ESTA FUNCION DE DESENCRIPTAR, SEGUN VIDEO QUE HE VISTO FALTA POR COMPLETAR. DEBERIA SER ASI COMPLETA:
  //FALTA PASARLO A STRING, E INDICARLE QUE NOS TIENE QUE DEVOLVER FORMATO UTF8
  /*
   decryptData(dataToDecrypt) {
    return CryptoJS.AES.decrypt(dataToDecrypt, salt).toString(CryptoJS.enc.Utf8);
  }
  */
  decryptData(dataToDecrypt) {
    return CryptoJS.AES.decrypt(dataToDecrypt, salt);
  }
}
module.exports = Security;
