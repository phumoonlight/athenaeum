interface MappedProvinceStats {
  province: string,
  value: number,
}

interface ProvinceStats {
  [key: string]: number
}

export default function (province: ProvinceStats): MappedProvinceStats[]
