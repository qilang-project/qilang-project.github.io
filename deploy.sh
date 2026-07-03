#!/usr/bin/env bash
# 一键部署官网到 linode(qilang.org,Caddy 服务 /var/www/qilang)
# 前提:
#   - ssh 别名 linode-jp 已在 ~/.ssh/config 配置且可免密登录
#   - 远端 Caddy 已配置 qilang.org 站点指向 /var/www/qilang
# 用法: ./deploy.sh
set -euo pipefail
cd "$(dirname "$0")"

echo "==> rsync 到 linode-jp:/var/www/qilang/"
rsync -az --delete --exclude .git --exclude deploy.sh ./ linode-jp:/var/www/qilang/

echo "==> 修正属主 caddy:caddy"
ssh linode-jp 'chown -R caddy:caddy /var/www/qilang'

echo "==> 验证 https://qilang.org/"
curl -sI https://qilang.org/ | head -1
