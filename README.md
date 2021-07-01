# notion2blog

利用 Cloudflare  的 worker 转发 notion.so 的内容，做成博客。

### 配置

```javascript
// 这里改成你的域名
const MY_DOMAIN = "www.chiro.work"
// 这里改成你的notion的主页
const START_PAGE = "https://www.notion.so/chiro2001/Chiro-s-Blog-a5a50b7b9f3c4515a89816ded0f3445f"
```

### 部署

1. 在 Cloudflare 新建网站
2. 把 DNS 解析转移到 Cloudflare
3. 添加一个 Worker，把`main.js`修改后的代码内容设置为 Worker 的代码
4. 设置路由，设置`${你的域名}/*`由你设置的 Worker 处理
5. 完成，访问你的主页吧