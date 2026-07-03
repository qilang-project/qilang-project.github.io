# 奇语言 Qi 官网

奇语言(Qi)官方网站源码仓——纯静态 HTML/CSS/JS,零构建依赖,零外部字体/CDN。

- 正式域名:**https://qilang.org**(canonical,全站 canonical 均指向它)
- 镜像:https://qilang-project.github.io (GitHub Pages 自动服务本仓 main 分支)

## 双端部署架构

本仓是官网的**单一事实源**:

```
改内容 → git push origin main
             ├── GitHub Pages 自动构建 → qilang-project.github.io(镜像)
             └── ./deploy.sh           → rsync 到 linode,Caddy 服务 qilang.org(正式)
```

qilang.org 由 linode 上的 Caddy 服务(自动 Let's Encrypt 证书),内容目录 `/var/www/qilang`,用仓库根的 `deploy.sh` 同步(前提:ssh 别名 `linode-jp` 可用)。

## 目录结构

```
.
├── index.html        # 首页(定位/语言全景/标准库/工具链/性能/文档导航/FAQ/生态)
├── site.css          # 全站共享主题:dark 默认 + light,CSS 变量双主题
├── theme.js          # 主题切换(localStorage 记忆)+ 移动端汉堡导航
├── docs/             # 文档(21 页:入门/语言/标准库/生态/参考)
├── blog/             # 博客(3 篇 + 索引)
├── llms.txt          # GEO:给 LLM 的速成规则
├── llms-full.txt     # GEO:完整语言参考(语法/标准库/并发/工具链/包管理)
├── sitemap.xml       # 全站 sitemap(qilang.org URL)
├── robots.txt
├── og.png            # Open Graph 分享图(1200x630)
├── deploy.sh         # 一键部署 linode
├── 站点源/           # 旧版奇语言写的站点生成器(已弃用,仅历史保留)
└── .nojekyll         # 关闭 GitHub Pages 的 Jekyll 处理
```

## 本地预览

零构建,起个静态服务器即可(端口用 3000 以上随机高位,别用 8080/3000/8000):

```bash
python3 -m http.server 43719
# 打开 http://127.0.0.1:43719/
```

## 主题系统

- dark 为默认;head 内联脚本按 `localStorage('qi-theme')` → `prefers-color-scheme` 初始化,无闪白
- 右上角 🌙/☀️ 按钮切换,`theme.js` 写回 localStorage
- 两套配色都在 `site.css` 的 `:root` / `[data-theme=light]` CSS 变量里,页面内容零改动
