import axios from "axios";

function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  var sliceSize = 1024;
  var byteCharacters = atob(base64Data);
  var bytesLength = byteCharacters.length;
  var slicesCount = Math.ceil(bytesLength / sliceSize);
  var byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    var begin = sliceIndex * sliceSize;
    var end = Math.min(begin + sliceSize, bytesLength);

    var bytes = new Array(end - begin);
    for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

function uploadProfilePicture(acceptedFiles, email, token, addToast, setUser) {
  const formData = new FormData();
  formData.set("file", acceptedFiles[0]);
  formData.set("email", email);

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  axios
    .post("https://whispering-headland-58237.herokuapp.com/image", formData)
    .then(({ data: { base64 } }) => {
      axios
        .patch("https://whispering-headland-58237.herokuapp.com/user/image", {
          email,
          image: base64
        })
        .then(({ data: user }) => {
          setUser(user);
          return addToast("Foto atualizada com sucesso!", {
            appearance: "success"
          });
        });
    })
    .catch(() => {
      return addToast(
        "Não foi possível atualizar a imagem  no momento, tente novamente mais tarde",
        {
          appearance: "error"
        }
      );
    });
}

function uploadProfileBanner(acceptedFiles, email, token, addToast, setUser) {
  const formData = new FormData();
  formData.set("file", acceptedFiles[0]);
  formData.set("email", email);

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  try {
    axios
      .post("https://whispering-headland-58237.herokuapp.com/image", formData)
      .then(({ data: { base64 } }) => {
        axios
          .patch(
            "https://whispering-headland-58237.herokuapp.com/user/banner",
            {
              email,
              banner: base64
            }
          )
          .then(({ data: user }) => {
            setUser(user);
            return addToast("Banner atualizado com sucesso!", {
              appearance: "success"
            });
          });
      })
      .catch(() => {
        return addToast(
          "Não foi possível atualizar o banner no momento, tente novamente mais tarde",
          {
            appearance: "error"
          }
        );
      })
      .catch(() => {
        return addToast(
          "Não foi possível atualizar o banner no momento, imagem muito grande",
          {
            appearance: "error"
          }
        );
      });
  } catch (error) {
    return addToast(
      "Não foi possível atualizar o banner no momento, tente novamente mais tarde",
      {
        appearance: "error"
      }
    );
  }
}

function renderBlopImage(image) {
  return `url(data:image/png;base64,${image})`;
}

export {
  base64toBlob,
  uploadProfilePicture,
  uploadProfileBanner,
  renderBlopImage
};
