import dayjs from 'dayjs'
/*
  mysql 取出的时间戳, 经过 drizzleOrm 转换后的 Date 对象出现时区误差问题, 需要该函数进行调整
*/
export function tzTransform(data?: string | number | Date | dayjs.Dayjs | null | undefined) {
  return dayjs.utc(data).tz("Asia/Shanghai", true)
}