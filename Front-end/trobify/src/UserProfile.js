var UserProfile = (function () {
  var name = "";
  var Email = "";
  var type = 0;
  var data_Image = "";
  var numero_cel = 0;
  var lastname = "";

  var getName = function () {
    return localStorage.getItem('nombre');
  };

  var setName = function (name_P) {
    name = localStorage.setItem('nombre', name_P)
  };

  var getLastName = function () {
    return localStorage.getItem('apellido');
  };

  var setLastName = function (last_name) {
    lastname = localStorage.setItem('apellido', last_name)
  };

  var getEmail = function () {
    return localStorage.getItem('Email');
  };

  var setEmail = function (Email) {
    Email = localStorage.setItem('Email', Email)

  };

  var getType = function () {
    return localStorage.getItem('tipo');
  };

  var setType = function (tipo) {
    type = localStorage.setItem('tipo', tipo)

  };

  var getImage = function () {
    return localStorage.getItem('imagen');

  };

  var setImage = function (image) {
    data_Image = localStorage.setItem('imagen', image)
  }

  var getMovil = function () {
    return localStorage.getItem('numero_cel');

  };

  var setMovil = function (numero_cel) {
    data_Image = localStorage.setItem('numero_cel', numero_cel)
  }
  return {
    getName: getName,
    setName: setName,
    getEmail: getEmail,
    setEmail: setEmail,
    getType: getType,
    setType: setType,
    getImage: getImage,
    setImage: setImage,
    getMovil : getMovil,
    setMovil : setMovil,
    getLastName : getLastName,
    setLastName : setLastName
  }

})();

export default UserProfile;