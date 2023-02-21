function defineCriteriaRank(criteria) {
  for (let parent in criteria) {
    let maxValue = 0;
    let maxChild = "";
    let minValue = Number.MAX_VALUE;
    let minChild = "";

    for (let child in criteria[parent]) {
      if (criteria[parent][child] > maxValue) {
        maxValue = criteria[parent][child];
        maxChild = child;
      } else if (criteria[parent][child] < minValue) {
        minValue = criteria[parent][child];
        minChild = child;
      }
      criteria[parent][child] = 2 // if the value was not the highest and the lowest, then it's gonna be 2
    }

    criteria[parent][maxChild] = 3 // if the value was the maximum, return 3
    criteria[parent][minChild] = 1 // if the value was the minimum, return 1
  }

  return criteria
}

function convertCafeType(val, criteria) {
  val = val.toLowerCase().split(", ");
  val = val.map((type) => {
    return criteria[type]
  });

  val = val.reduce((a, b) => a + b, 0) / val.length
  return val;
}

function convertLocation(val, criteria) {
    if (val === 'Klojen') return criteria['pusat_kota']
    else if (val === 'Kedungkandang') return criteria['pinggir_kota']
    else return criteria['tengah_kota']
}

function convertPrice(val, criteria) {
    if (val <= 35000) return criteria['tinggi']
    else if (val <= 70000) return criteria['sedang']
    else if (val > 70000) return criteria['rendah']
}

function convertMenu(val, criteria) {
  if (val > 50) return criteria['lengkap']
  else if (val <= 50) return criteria['cukup']
  else if (val <= 25) return criteria['sedikit']
}

function convertOpenTime(val, criteria) {
  if (val > 16) return criteria['lama']
  else if (val > 9) return criteria['cukup']
  else if (val <= 8) return criteria['sedikit']
}

export function smartMethod(data, weight, criteria) {
  const findMax = Math.max(...weight);
  const { view, lokasi, harga, variasi_menu, jam_buka } = defineCriteriaRank(criteria)

  // dihitung presentase tiap kriteria dari jumlah total voters
  for (var i = 0; i < weight.length; i++) {
    weight[i] = Math.round((weight[i] / findMax) * 100);
  }

  // Normalisasi
  const countWeight = weight.reduce((a, b) => a + b, 0);
  for (var i = 0; i < weight.length; i++) {
    weight[i] = weight[i] / countWeight;
  }

  // pemasangan nilai alternatif
  data = data.map((val) => ({
      ...val,
      smartMethod: {
        tipe_cafe: convertCafeType(val.tipe_cafe, view),
        lokasi: convertLocation(val.kecamatan, lokasi),
        harga: convertPrice(val.harga_tertinggi, harga),
        variasi_menu: convertMenu(val.variasi_menu, variasi_menu),
        jam_buka: convertOpenTime(val.total_jam_buka, jam_buka)
      }
  }))

  // penentuan nilai utility
  data = data.map((val) => ({
    ...val,
    smartMethod: {
      tipe_cafe: val.smartMethod.tipe_cafe * weight[0],
      lokasi: val.smartMethod.lokasi * weight[1],
      harga: val.smartMethod.harga * weight[2],
      variasi_menu: val.smartMethod.variasi_menu * weight[3],
      jam_buka: val.smartMethod.jam_buka * weight[4],
    }
  }))

  // menentukan total nilai utility
  data = data.map((val) => ({
    ...val,
    total: Object.values(val.smartMethod).reduce((a, b) => a + b, 0)
  }))

  // perangkingan
  data = data.sort((a, b) => b.total - a.total)
  
  return data
}
