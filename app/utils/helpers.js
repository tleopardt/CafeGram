export const filterHarga = (val, params) => {
  if (params === "sedang") return val <= 70000;
  else if (params === "rendah") return val > 70000;
  else if (params === "tinggi") return val <= 35000;
  else return val > 0
};

export const filterMenu = (val, params) => {
  if (params === "lengkap") return val > 50;
  else if (params === "cukup") return val <= 50;
  else if (params === "sedikit") return val <= 25;
  else return val > 0
};

export const filterOpenHours = (val, params) => {
  if (params === "lama") return val > 16;
  else if (params === "cukup") return val > 9;
  else if (params === "sedikit") return val <= 8;
  else return val > 0
};
