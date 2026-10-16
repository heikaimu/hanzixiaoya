export async function avatarUploadError(error, data) {
  let body=data;
  const response=error?.context;
  if(response&&typeof response.clone==='function'){
    try{body=await response.clone().json();}catch{/* Network and gateway errors may not contain JSON. */}
  }
  if(response?.status===404||body?.code==='NOT_FOUND')return '头像上传服务尚未部署，请先在 Supabase 部署 upload-avatar 函数。';
  if(response?.status===401&&body?.code===401)return '头像上传服务认证配置有误，请关闭 upload-avatar 的 Verify JWT 后重新部署。';
  if(typeof body?.error==='string')return body.error;
  if(response?.status===401||response?.status===403)return '头像上传认证失败，请重新登录后重试。';
  if(error?.name==='FunctionsFetchError'||error?.name==='FunctionsRelayError')return '无法连接头像上传服务，请检查网络，以及 upload-avatar 是否已部署并允许跨域请求。';
  return '头像上传失败，请稍后重试。';
}
