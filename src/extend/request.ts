import qs from 'qs'
import merge from 'lodash.merge'
import isEmpty from 'lodash.isempty'

import config from '@/config'
import local from '../storage/local'

class Request {
	url: string = ''
  
  // 上传参数
  filePath: string = ''
  isUpload: boolean = false
  
  method: request.Methods = 'GET'
  
  timeout: number = 30e3
  
  header: Map<string, string> = new Map()
  
	params: request.Params = {
    // GET 请求参数
  }
  
  data: request.Params = {
    // POST 请求参数
  }
	
  /**
   * 
   */
	get(url: string, params?: request.Params): Request {
		this.url = url;
		this.method = 'GET'
    if(params) {
      this.params = params
    }
    
		return this
	}
	
	put(url: string, data?: request.Params): Request {
		this.url = url;
		this.method = 'POST'
    this.params._method = 'PUT'
    
		if(data) {
      this.data = data
    }
		return this
	}
	
	post(url: string, data?: request.Params): Request {
		this.url = url;
		this.method = 'POST'
    if(data) {
      this.data = data
    }
		return this
	}
	
	delete(url: string, data?: request.Params): Request {
		this.url = url;
		this.method = 'DELETE'
    if(data) {
      this.data = data
    }
		return this
	}
  
  upload(url: string, filePath: string, data?: request.Params): Request {
    this.url = url;
    this.filePath = filePath
    this.isUpload = true
    if(data) {
      this.data = data
    }
    return this
  }
  
  /**
   * 重置请求参数
   */
  private reset() {
    this.url = ''
    this.isUpload = false
    this.filePath = ''
    this.method = 'GET'
    this.data = {}
    this.params = {}
    this.header = new Map()
    this.timeout = 30e3
  }
  
  /**
   * 解析并合并params
   */
  private makeUrl(url: string): string {
    let base: string = config.baseUrl;
    let path: string = config.pathUrl
    
    // 统一在url后加 /
    if(!base.endsWith('/')) {
      base += '/'
    }
    
    // 统一删除path前面的 /
    if(path.startsWith('/')) {
      path = path.substring(1)
    }
    
    // 统一在path后面加 /
    if(!path.endsWith('/')) {
      path += '/'
    }
    
    // 以"/"开头的是自定义path
    if(url.startsWith('/')) {
      // base已拼接 / 这里需要移除
      url = url.substring(1)
    } else {
      // 非 / 开头的拼接默认 path
      url = path + url
    }
    
    // 未设置请求参数
    if(isEmpty(this.params)) {
      return base + url;
    }
    
    // url中未携带参数
    if(url.indexOf('?') === -1) {
      return base + url + '?' + qs.stringify(this.params)
    }
    
    let query: string;
    
    // 'path/to?id=1024' ==> ['path/to', 'id=1024']
    [path, query] = url.split('?')
    
    // 保证截取的参数必须包含a=
    if(query.length > 0 && query.indexOf('=') > 0) {
      query = qs.stringify(
        merge({}, this.params, qs.parse(query))
      )
      return `${base}${path}?${query}`
    }
    return `${base}${path}`
  }
    
  /**
   * 发起请求
   * @params request.SimpleOptions|boolean options
   */
	send(options?: boolean|request.SimpleOptions): Promise<response.SuccessResult> {
    let isUpload = this.isUpload
    
    // 默认参数
    let opts: UniApp.RequestOptions & UniApp.UploadFileOption = {
      url: this.url,
      dataType: 'json',
      method: this.method,
      timeout: this.timeout
    }
    
    // 无网络时
    if(!local.internetConnected) {
      return new Promise((resolve, reject)=> {
        reject('无网络访问')
      })
    }
    
    // 上传文件专用参数
    if(isUpload) {
      opts.timeout = 30000
      opts.method = 'POST'
      opts.name = 'file'
      opts.filePath = this.filePath
      if(!isEmpty(this.data)) {
        opts.formData = this.data;
        this.data = {}
      }
    }
    
    //
    let requestStore = useRequestStore()
    
    // 初始化权限
    let required = true
    // 刷新token
    let isRefresh = false
    let tmp: request.SimpleOptions = {}
		if(typeof options === 'boolean') {
			required = options
		} else if(typeof options !== 'undefined') {
      // 参数
      tmp = options;
      
      // 未设置required默认为必须
      if(typeof tmp.required === 'boolean') {
        required = tmp.required;
        delete tmp.required;
      }
      
      // 是否刷新token
      if(typeof tmp.isRefresh === 'boolean') {
        isRefresh = tmp.isRefresh
        delete tmp.isRefresh
      }
      
      // 合并header
      if(!isEmpty(tmp.header)) {
        for(let h in tmp.header) {
          this.header.set(h, tmp.header[h]);
        }
        delete tmp.header;
      }
      
      // 合并
      opts = merge({}, opts, tmp)
		}
    
    // 设置TenantId
    let tenantId: number
    if(tenantId = local.tenantId) {
      this.header.set('Tenant-Id', `${tenantId}`);
    }
    
    // 设置token
    if(required) {
      if(!local.token) {
        redirect.login()
        return new Promise((resolve)=> {
          resolve({
            code: 401,
            msg: '未登录',
            data: []
          })
        })
      }
      this.header.set('Authorization', `Bearer ${local.token}`);
    }
    
    // 添加header
    if(this.header.size > 0) {
      opts.header = Object.fromEntries(this.header.entries());
    }
    
    // 添加data
    if(!isEmpty(this.data) && opts.method === 'POST') {
      opts.data = this.data;
    }
    
    // 合并后重新赋值
    opts.url = this.makeUrl(opts.url);
    
    // 当前处于刷新token阶段时将请求放到待处理列表
    if(requestStore.refreshing && false === isRefresh) {
      return new Promise((resolve)=> {
        requestStore.abort((token: string)=> {
          // 更新token
          if(opts.header.Authorization) {
            opts.header.Authorization = `Bearer ${token}`
          }
          opts.success = (result)=> {
            if(result.data.code === 0) {
              resolve(result.data as response.SuccessResult)
            } else {
              
            }
          }
          if(isUpload) {
            uni.uploadFile(opts)
          } else {
            uni.request(opts)
          }
        })
      })
    }
    
    // 请求参数重新初始化
    this.reset();
    
    // 初始化
    return new Promise((resolve)=> {
      opts.success = (result)=> {
        if(isUpload) {
          result.data = JSON.parse(result.data)
        }
        let data = result.data as response.SuccessResult
        // 标记为正在刷新token...
        // 尝试刷新token
        if(data.code === 401 && !requestStore.refreshing) {
          requestStore.refresh((token: string)=> {
            // 更新token
            if(opts.header.Authorization) {
              opts.header.Authorization = `Bearer ${token}`
            }
            opts.success = (res)=> {
              resolve(res.data as response.SuccessResult)
            }
            if(isUpload) {
              uni.uploadFile(opts)
            } else {
              uni.request(opts)
            }
          })
        } else {
          resolve(data)
        }
      }
      
      // 失败
      opts.fail = ({ errMsg })=> {
        console.log('request.request', errMsg)
      }
      
      // opts.complete = (e: any)=> {
      //   console.log('request.compete', e)
      // }
      
      if(isUpload) {
        uni.uploadFile(opts)
      } else {
        uni.request(opts)
      }
    })
	}
}

export default new Request
