# 泡泡爪宠物护理网站制作与部署记录

本文概况记录本项目从页面制作、预约功能接入，到部署上线 Netlify 的主要步骤。

## 1. 搭建网站页面

项目使用 Next.js 构建，页面入口位于 `src/app/page.jsx`，全局样式位于 `src/styles.css`。

制作页面时先完成首页主体结构，包括门店品牌展示、服务套餐、护理案例、预约表单和用户评价等内容。页面素材放在 `public/assets/`，由 Next.js 直接作为静态资源引用。

## 2. 完善预约交互

在页面中加入预约表单，让用户填写姓名、手机号、宠物类型、宠物体型、服务套餐、预约日期、预约时间和备注。

前端提交时调用 `/api/appointments`，由 Next.js App Router 的 API route 处理请求。

## 3. 接入数据库保存预约

新增 `src/app/api/appointments/route.js` 作为预约接口，负责：

- 解析并校验预约表单数据
- 拒绝无效手机号、无效宠物类型、无效套餐和无效时间段
- 将合法预约写入 PostgreSQL 数据库
- 返回创建成功的预约 ID

数据库连接封装在 `src/lib/db.js`，通过 `DATABASE_URL` 环境变量读取连接字符串。

数据库表结构放在 `database/appointments.sql`，用于创建 `appointments` 表。

## 4. 准备环境变量

新增 `.env.example`，说明项目需要配置：

```env
DATABASE_URL="postgres://..."
```

本地开发使用 `.env.local` 保存真实数据库连接字符串。该文件不会提交到 GitHub，避免泄露密钥。

## 5. 配置 Netlify 构建

新增 `netlify.toml`，告诉 Netlify 如何构建 Next.js 项目：

```toml
[build]
command = "npm run build"
publish = ".next"
```

这样 Netlify 会执行 `npm run build`，并使用 Next.js Runtime 部署页面和 API route。

## 6. 本地验证构建

部署前先运行：

```powershell
npm run build
```

构建成功后，Next.js 输出显示：

- `/` 为静态页面
- `/api/appointments` 为动态服务端接口

这说明首页和预约 API 都能被 Netlify 正确识别。

## 7. 创建并链接 Netlify 项目

使用 Netlify CLI 登录账号后，创建并链接站点：

- Netlify 项目名：`paopao-paw-pet-care`
- 生产地址：`https://paopao-paw-pet-care.netlify.app`

随后将本地 `.env.local` 中的环境变量导入 Netlify，确保线上 API 也能连接数据库。

## 8. 部署到生产环境

先执行预览部署，确认构建和上传流程可用；预览成功后执行生产部署：

```powershell
npx --yes netlify-cli deploy --prod
```

最终生产地址：

https://paopao-paw-pet-care.netlify.app

本次唯一部署地址：

https://6a04a98cc7340d1ab0c2fb97--paopao-paw-pet-care.netlify.app

## 9. 处理部署问题

第一次部署时，Netlify Next.js Runtime 在 Windows 上移动 `.next` 目录失败，原因是本地 `next dev` / `next start` 进程仍占用构建目录。

解决方式是停止当前项目中占用 `.next` 的 Node 进程，然后重新部署。重新部署后，Netlify 构建、函数打包和上线都成功完成。

## 10. 最终结果

网站已完成：

- 首页展示
- 服务套餐展示
- 护理案例展示
- 预约表单
- 预约数据校验
- PostgreSQL 数据库存储
- Netlify 生产环境部署

线上访问地址：

https://paopao-paw-pet-care.netlify.app
