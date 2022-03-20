var Save_as = require("file-saver");

export const useDownloadHttp = () => {
  async function downloadCall(url, filetype = ".csv") {
    console.log("download http is running");
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "text/csv",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      })
        .then(res => res.blob())
        .then(blob => Save_as(blob, "test" + filetype));
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  return [downloadCall];
};
