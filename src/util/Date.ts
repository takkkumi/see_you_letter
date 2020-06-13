import { utcToZonedTime } from "date-fns-tz"
import { format } from "date-fns"
import { ja } from "date-fns/esm/locale"

// export const japDate = (date: string | number | Date, pattern: string) => {
//   const timeZone = "Asia/Tokyo"
//   const zonedDate = utcToZonedTime(date, timeZone)
//   return format(zonedDate, pattern, {
//     locale: ja,
//   })
// }
export const dateTransFormToJapDate = (date: string) => {
  const dateArray = date.split("_")
  const dateArrayNumber = dateArray.map((element) => Number(element))

  return `${dateArrayNumber[0]}年${dateArrayNumber[1]}月${dateArrayNumber[2]}日`
}
