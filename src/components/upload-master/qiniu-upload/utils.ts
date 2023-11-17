const mapping = {
  '华东-浙江': 'z0',
  '华东-浙江2': 'cn-east-2',
  '华北-河北': 'z1',
  '华南-广东': 'z2',
  '北美-洛杉矶': 'na0',
  '亚太-新加坡': 'as0',
  '亚太-河内': 'ap-southeast-2',
}

export type Label = keyof typeof mapping

/**
 * 获取存储区域上传域名
 * @param label 区域名称
 * @returns 
 */
export function makeUploadDomain(label: Label) {
  return `https://upload-${mapping[label]}.qiniup.com`;
}

/**
 * 获取存储管理域名
 * @param label 区域名称
 * @returns 
 */
export function makeManageDomain(label: Label) {
  return `https://rs-${mapping[label]}.qiniuapi.com`;
}