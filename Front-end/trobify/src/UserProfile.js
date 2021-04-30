var UserProfile = (function () {
  var name = "";
  var last_name = "";
  var type = 0
  var data_Image = "";

  var getName = function () {
    return localStorage.getItem('nombre');
  };

  var setName = function (name_P) {
    name = localStorage.setItem('nombre', name_P)
  };

  var getlast_name = function () {
    return localStorage.getItem('apellido');
  };

  var setlast_name = function (lastName) {
    last_name = localStorage.setItem('apellido', lastName)

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

  return {
    getName: getName,
    setName: setName,
    getlast_name: getlast_name,
    setlast_name: setlast_name,
    getType: getType,
    setType: setType,
    getImage: getImage,
    setImage: setImage
  }

})();

export default UserProfile;